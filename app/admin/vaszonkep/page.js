"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from "uuid";

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULTS = {
  shippingCustomer: 2000, // amit az ügyfél felé számlázol
  shippingCost: 1890,     // a tényleges költséged
};

function groupByCustomer(orders) {
  const map = new Map();
  for (const o of orders) {
    const key = o.customer_name;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(o);
  }
  return map;
}

function currency(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "–";
  return new Intl.NumberFormat("hu-HU").format(Math.round(n)) + " Ft";
}

export default function VaszonkepAdminPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Beállítások: már csak a szállítás maradt itt
  const [shipCust, setShipCust] = useState(DEFAULTS.shippingCustomer);
  const [shipCost, setShipCost] = useState(DEFAULTS.shippingCost);

  // Új rendelés űrlap állapot
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]); // {id, size, qty, duplakeret}

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Lekérdezzük az új duplakeret oszlopokat is
        const selectQuery = "id,size,customer_price,purchase_price,duplakeret_customer_price,duplakeret_purchase_price";
        const [prodRes, orderRes] = await Promise.all([
          supabase.from("canvas_products").select(selectQuery).order("size", { ascending: true }),
          supabase.from("canvas_orders").select("id,customer_name,ordered_items,customer_paid,printshop_paid,created_at,shipping_customer,shipping_cost").order("created_at", { ascending: true }),
        ]);
        if (prodRes.error) throw prodRes.error;
        if (orderRes.error) throw orderRes.error;
        setProducts(prodRes.data || []);
        setOrders(orderRes.data || []);
      } catch (e) {
        console.error(e);
        setError(e.message || "Ismeretlen hiba");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addItem = (productId) => {
    if (!productId) return;
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    setItems((prev) => [
      ...prev,
      { key: uuidv4(), product_id: prod.id, size: prod.size, qty: 1, duplakeret: false },
    ]);
  };

  const updateItem = (key, patch) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, ...patch } : i)));
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const formTotals = useMemo(() => {
    let revenue = 0;
    let cost = 0;

    for (const it of items) {
      const prod = products.find((p) => p.id === it.product_id);
      if (!prod) continue;
      const qty = Number(it.qty) || 0;
      // A felárat már a termékből vesszük, nem a globális beállításból
      const duplakeretCustPrice = it.duplakeret ? Number(prod.duplakeret_customer_price) || 0 : 0;
      const duplakeretPurchPrice = it.duplakeret ? Number(prod.duplakeret_purchase_price) || 0 : 0;

      const lineCust = qty * (Number(prod.customer_price) + duplakeretCustPrice);
      const linePurch = qty * (Number(prod.purchase_price) + duplakeretPurchPrice);
      revenue += lineCust;
      cost += linePurch;
    }

    revenue += Number(shipCust) || 0;
    cost += Number(shipCost) || 0;

    return { revenue, cost, profit: revenue - cost };
  }, [items, products, shipCust, shipCost]);

  const saveOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!customerName.trim()) throw new Error("Add meg az ügyfél nevét!");
      if (items.length === 0) throw new Error("Adj hozzá legalább egy tételt!");

      const ordered_items = items.map((it) => {
        const prod = products.find((p) => p.id === it.product_id);
        const customer_price = prod ? Number(prod.customer_price) : 0;
        const purchase_price = prod ? Number(prod.purchase_price) : 0;
        // A felárat is elmentjük a rendelésbe a termék akkori ára alapján
        const duplakeret_customer = prod ? Number(prod.duplakeret_customer_price) : 0;
        const duplakeret_purchase = prod ? Number(prod.duplakeret_purchase_price) : 0;
        return {
          product_id: it.product_id,
          size: it.size,
          qty: Number(it.qty) || 1,
          duplakeret: !!it.duplakeret,
          customer_price,
          purchase_price,
          duplakeret_customer,
          duplakeret_purchase,
        };
      });

      const insert = {
        customer_name: customerName.trim(),
        ordered_items,
        customer_paid: false,
        printshop_paid: false,
        shipping_customer: Number(shipCust) || 0,
        shipping_cost: Number(shipCost) || 0,
      };

      const { error: insErr } = await supabase.from("canvas_orders").insert(insert);
      if (insErr) throw insErr;

      const { data, error: refErr } = await supabase
        .from("canvas_orders")
        .select("id,customer_name,ordered_items,customer_paid,printshop_paid,created_at,shipping_customer,shipping_cost")
        .order("created_at", { ascending: true });
      if (refErr) throw refErr;
      setOrders(data || []);

      setCustomerName("");
      setItems([]);
    } catch (e) {
      console.error(e);
      setError(e.message || "Hiba rendelés mentése közben");
    } finally {
      setLoading(false);
    }
  };

  const setPaid = async (orderId, field, value) => {
    try {
      const { error: upErr } = await supabase
        .from("canvas_orders")
        .update({ [field]: value })
        .eq("id", orderId);
      if (upErr) throw upErr;
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o)));
    } catch (e) {
      console.error(e);
      setError(e.message || "Hiba státusz frissítés közben");
    }
  };

  const byCustomer = useMemo(() => groupByCustomer(orders), [orders]);

  const customerSummaries = useMemo(() => {
    const out = [];
    for (const [name, list] of byCustomer) {
      let revenue = 0;
      let cost = 0;
      for (const o of list) {
        revenue += Number(o.shipping_customer) || 0;
        cost += Number(o.shipping_cost) || 0;
        const items = Array.isArray(o.ordered_items) ? o.ordered_items : [];
        for (const it of items) {
          const qty = Number(it.qty) || 0;
          const unitCust = Number(it.customer_price) || 0;
          const unitPurch = Number(it.purchase_price) || 0;
          const dkCust = it.duplakeret ? Number(it.duplakeret_customer || 0) : 0;
          const dkPurch = it.duplakeret ? Number(it.duplakeret_purchase || 0) : 0;
          revenue += qty * (unitCust + dkCust);
          cost += qty * (unitPurch + dkPurch);
        }
      }
      out.push({ name, revenue, cost, profit: revenue - cost });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }, [byCustomer]);

  const grandTotals = useMemo(() => {
    return customerSummaries.reduce(
      (acc, c) => {
        acc.revenue += c.revenue;
        acc.cost += c.cost;
        acc.profit += c.profit;
        return acc;
      },
      { revenue: 0, cost: 0, profit: 0 }
    );
  }, [customerSummaries]);

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vászonkép rendeléskezelő</h1>
        <div className="text-sm opacity-80">admin/vaszonkep</div>
      </header>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">{String(error)}</div>
      )}

      {/* Beállítások kártya - kivettük a duplakeret beállításokat */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Alapbeállítások</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm">Szállítás (ügyfélnek számlázott)</span>
              <input type="number" className="input input-bordered border rounded-xl p-2"
                     value={shipCust} onChange={(e)=>setShipCust(Number(e.target.value)||0)} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Szállítás (valódi költség)</span>
              <input type="number" className="input input-bordered border rounded-xl p-2"
                     value={shipCost} onChange={(e)=>setShipCost(Number(e.target.value)||0)} />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Összesítés (minden rendelés)</h2>
          <div className="grid grid-cols-3 text-sm">
            <div className="opacity-70">Bevétel</div>
            <div className="opacity-70">Költség</div>
            <div className="opacity-70">Profit</div>
            <div className="font-semibold">{currency(grandTotals.revenue)}</div>
            <div className="font-semibold">{currency(grandTotals.cost)}</div>
            <div className="font-semibold">{currency(grandTotals.profit)}</div>
          </div>
        </div>
      </section>

      {/* Új rendelés felvétel */}
      <section className="rounded-2xl border p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Új rendelés felvétele</h2>
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="flex flex-col gap-1">
            <span className="text-sm">Ügyfél neve</span>
            <input className="border rounded-xl p-2" placeholder="pl. Betti" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Méret hozzáadása</span>
            <select className="border rounded-xl p-2" onChange={(e)=>{ addItem(e.target.value); e.target.value=""; }} value="">
              <option value="" disabled>Válassz méretet…</option>
              {products.map((p)=> (
                <option key={p.id} value={p.id}>{p.size} — {currency(p.customer_price)}</option>
              ))}
            </select>
          </label>

          <div className="flex gap-2">
            <button onClick={saveOrder} disabled={loading}
                    className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50">Rendelés mentése</button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Méret</th>
                  <th className="py-2 pr-4">Mennyiség</th>
                  <th className="py-2 pr-4">Duplakeret</th>
                  <th className="py-2 pr-4">Ügyfél/db (felárral)</th>
                  <th className="py-2 pr-4">Nyomda/db (felárral)</th>
                  <th className="py-2 pr-4">Összesen (ügyfél)</th>
                  <th className="py-2 pr-4">Összesen (nyomda)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => {
                  const prod = products.find((p) => p.id === it.product_id);
                  const qty = Number(it.qty) || 0;
                  const dkCust = it.duplakeret ? (prod?.duplakeret_customer_price || 0) : 0;
                  const dkPurch = it.duplakeret ? (prod?.duplakeret_purchase_price || 0) : 0;
                  const unitCust = (prod?.customer_price || 0) + dkCust;
                  const unitPurch = (prod?.purchase_price || 0) + dkPurch;
                  const sumCust = qty * unitCust;
                  const sumPurch = qty * unitPurch;
                  return (
                    <tr key={it.key} className="border-b">
                      <td className="py-2 pr-4 font-medium">{it.size}</td>
                      <td className="py-2 pr-4">
                        <input type="number" min={1} className="w-20 border rounded-lg p-1"
                               value={it.qty}
                               onChange={(e)=>updateItem(it.key, { qty: Number(e.target.value)||1 })} />
                      </td>
                      <td className="py-2 pr-4">
                        <input type="checkbox" checked={it.duplakeret} onChange={(e)=>updateItem(it.key, { duplakeret: e.target.checked })} />
                      </td>
                      <td className="py-2 pr-4">{currency(unitCust)}</td>
                      <td className="py-2 pr-4">{currency(unitPurch)}</td>
                      <td className="py-2 pr-4">{currency(sumCust)}</td>
                      <td className="py-2 pr-4">{currency(sumPurch)}</td>
                      <td className="py-2 pr-0 text-right">
                        <button className="px-3 py-1 rounded-lg border hover:bg-gray-50" onClick={()=>removeItem(it.key)}>Eltávolít</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-2 pr-4" colSpan={5}>Szállítás (ügyfélnek / neked)</td>
                  <td className="py-2 pr-4">{currency(shipCust)}</td>
                  <td className="py-2 pr-4">{currency(shipCost)}</td>
                  <td></td>
                </tr>
                <tr className="font-semibold">
                  <td className="py-2 pr-4" colSpan={5}>Végösszeg</td>
                  <td className="py-2 pr-4">{currency(formTotals.revenue)}</td>
                  <td className="py-2 pr-4">{currency(formTotals.cost)}</td>
                  <td className="py-2 pr-0 text-right">Profit: {currency(formTotals.profit)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>

      {/* Rendelések listája és csoportosított nézet */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Rendelések ügyfelenként</h2>
        {[...byCustomer.entries()].map(([name, list]) => {
          const sum = customerSummaries.find((c) => c.name === name);
          return (
            <div key={name} className="rounded-2xl border p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xl font-semibold">{name}</div>
                <div className="text-sm flex gap-4">
                  <div>Bevétel: <span className="font-semibold">{currency(sum?.revenue)}</span></div>
                  <div>Költség: <span className="font-semibold">{currency(sum?.cost)}</span></div>
                  <div>Profit: <span className="font-semibold">{currency(sum?.profit)}</span></div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 pr-4">Dátum</th>
                      <th className="py-2 pr-4">Tételek</th>
                      <th className="py-2 pr-4">Szállítás (ügyfél / neked)</th>
                      <th className="py-2 pr-4">Fizetve (ügyfél)</th>
                      <th className="py-2 pr-4">Kifizetve (nyomda)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((o) => (
                      <tr key={o.id} className="border-b align-top">
                        <td className="py-2 pr-4 whitespace-nowrap">{new Date(o.created_at).toLocaleString("hu-HU")}</td>
                        <td className="py-2 pr-4">
                          {Array.isArray(o.ordered_items) && o.ordered_items.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {o.ordered_items.map((it, idx) => (
                                <li key={idx}>
                                  {it.qty}× {it.size}
                                  {it.duplakeret ? " (duplakeret)" : ""}
                                  {" "}— ügyfél/db: {currency(it.customer_price + (it.duplakeret ? (it.duplakeret_customer||0) : 0))}
                                  {", nyomda/db: "}
                                  {currency(it.purchase_price + (it.duplakeret ? (it.duplakeret_purchase||0) : 0))}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <em>nincs tétel</em>
                          )}
                        </td>
                        <td className="py-2 pr-4">{currency(o.shipping_customer)} / {currency(o.shipping_cost)}</td>
                        <td className="py-2 pr-4">
                          <label className="inline-flex items-center gap-2">
                            <input type="checkbox" checked={!!o.customer_paid} onChange={(e)=>setPaid(o.id, "customer_paid", e.target.checked)} />
                            <span className="text-xs">Ügyfél fizetett</span>
                          </label>
                        </td>
                        <td className="py-2 pr-4">
                          <label className="inline-flex items-center gap-2">
                            <input type="checkbox" checked={!!o.printshop_paid} onChange={(e)=>setPaid(o.id, "printshop_paid", e.target.checked)} />
                            <span className="text-xs">Nyomda kifizetve</span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </section>

      {loading && <div className="text-sm opacity-70">Betöltés…</div>}
    </div>
  );
}