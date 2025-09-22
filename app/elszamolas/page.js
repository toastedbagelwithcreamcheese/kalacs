'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

// Ikonok a kategóriákhoz
const CategoryIcon = ({ category, className }) => {
  const icons = {
    'Élelmiszer': '🛒',
    'Háztartás': '🧼',
    'Szórakozás': '🎉',
    'Közlekedés': '🚗',
    'Egyéb': '📎',
  };
  return <span className={className}>{icons[category] || '📎'}</span>;
};

export default function ElszamolasPage() {
  const [expenses, setExpenses] = useState([]);
  const [currentUser, setCurrentUser] = useState('user1');
  const [newAmount, setNewAmount] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('Élelmiszer');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Élelmiszer', 'Háztartás', 'Szórakozás', 'Közlekedés', 'Egyéb'];
  const userNames = { user1: 'Bálint', user2: 'Martin' };

    const [filterPayer, setFilterPayer] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Szűrt lista előállítása
    const filteredExpenses = expenses.filter((exp) => {
    const matchesPayer = filterPayer ? exp.payer === filterPayer : true;
    const matchesCategory = filterCategory ? exp.category === filterCategory : true;
    const matchesSearch = searchTerm
        ? exp.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
    return matchesPayer && matchesCategory && matchesSearch;
    });


  // 🔹 Kiadások lekérdezése
  const fetchExpenses = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Hiba a kiadások lekérdezésekor:', error);
      setError('Nem sikerült betölteni az adatokat.');
    } else {
      setExpenses(data || []);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  // 🔹 Új kiadás
  const addExpense = async (e) => {
    e.preventDefault();
    if (!newAmount || isNaN(parseFloat(newAmount)) || !newDescription.trim()) {
      alert('Kérlek, add meg az összeget és a leírást is!');
      return;
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          amount: parseFloat(newAmount),
          description: newDescription,
          category: newCategory,
          payer: currentUser,
        },
      ])
      .select();

    if (error) {
      console.error('Hiba a kiadás hozzáadásakor:', error);
      setError('Nem sikerült elmenteni a kiadást.');
    } else if (data && data.length > 0) {
      setExpenses((prev) => [data[0], ...prev]); // 🔹 Azonnali frissítés
      setNewAmount('');
      setNewDescription('');
      setError(null);
    }
  };

  // 🔹 Törlés
  const deleteExpense = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a tételt?')) return;

    const { error } = await supabase.from('expenses').delete().match({ id });
    if (error) {
      console.error('Hiba a törlés során:', error);
      setError('Nem sikerült törölni a kiadást.');
    } else {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  // 🔹 Adatok betöltése és realtime figyelés
  useEffect(() => {
    fetchExpenses();

    const channel = supabase
      .channel('realtime_expenses')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, (payload) => {
        console.log('Realtime változás:', payload);
        fetchExpenses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchExpenses]);

  // 🔹 Számítások
  const calculation = useMemo(() => {
    const totalIncome = 160000;
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remainingBudget = totalIncome - totalSpent;

    const user1Spent = expenses
      .filter((exp) => exp.payer === 'user1')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const user2Spent = expenses
      .filter((exp) => exp.payer === 'user2')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const fairShare = totalSpent / 2;
    const difference = user1Spent - fairShare;

    let balanceMessage = 'Mindenki a saját részét fizette.';
    if (difference > 0) {
      balanceMessage = `${userNames.user2} tartozik ${userNames.user1}-nek ${Math.abs(
        difference
      ).toLocaleString('hu-HU')} Ft-tal.`;
    } else if (difference < 0) {
      balanceMessage = `${userNames.user1} tartozik ${userNames.user2}-nek ${Math.abs(
        difference
      ).toLocaleString('hu-HU')} Ft-tal.`;
    }

    if (totalSpent === 0) {
      balanceMessage = 'Nincsenek még rögzített kiadások.';
    }

    return { totalIncome, totalSpent, remainingBudget, user1Spent, user2Spent, balanceMessage };
  }, [expenses]);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Havi Elszámolás
          </h1>
          <p className="text-gray-400 mt-2">Közös kassza, tiszta sor.</p>
        </header>

        {/* HIBA */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* ÁTTEKINTÉS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Áttekintés</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-400">Költés (Bálint)</p>
              <p className="text-2xl font-bold text-green-400">
                {calculation.user1Spent.toLocaleString('hu-HU')} Ft
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Költés (Martin)</p>
              <p className="text-2xl font-bold text-blue-400">
                {calculation.user2Spent.toLocaleString('hu-HU')} Ft
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Összesen</p>
              <p className="text-2xl font-bold">{calculation.totalSpent.toLocaleString('hu-HU')} Ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Maradt</p>
              <p className="text-2xl font-bold">{calculation.remainingBudget.toLocaleString('hu-HU')} Ft</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <p className="text-lg font-semibold text-pink-400">{calculation.balanceMessage}</p>
          </div>
        </motion.div>

        {/* ÚJ KIADÁS */}
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Új kiadás</h2>

          {/* FELHASZNÁLÓ VÁLASZTÓ */}
          <div className="flex justify-center rounded-lg bg-gray-700/50 p-1 mb-4">
            {['user1', 'user2'].map((u) => (
              <button
                key={u}
                onClick={() => setCurrentUser(u)}
                className={`w-1/2 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-300 ${
                  currentUser === u ? (u === 'user1' ? 'bg-green-500' : 'bg-blue-500') : 'text-gray-300'
                }`}
              >
                {userNames[u]}
              </button>
            ))}
          </div>

          <form onSubmit={addExpense} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Összeg (Ft)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                required
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Leírás"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transition-all"
            >
              Hozzáadás
            </button>
          </form>
        </div>

        {/* KIADÁSOK */}
<div>
  <h2 className="text-xl font-semibold mb-4 text-purple-300">Kiadások</h2>

  {/* Szűrők + kereső */}
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <select
      value={filterPayer}
      onChange={(e) => setFilterPayer(e.target.value)}
      className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2"
    >
      <option value="">Összes fizető</option>
      <option value="user1">{userNames.user1}</option>
      <option value="user2">{userNames.user2}</option>
    </select>

    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2"
    >
      <option value="">Összes kategória</option>
      <option value="Élelmiszer">🛒 Élelmiszer</option>
      <option value="Háztartás">🧼 Háztartás</option>
      <option value="Szórakozás">🎉 Szórakozás</option>
      <option value="Közlekedés">🚗 Közlekedés</option>
        <option value="Egyéb">📎 Egyéb</option>
    </select>

    <input
      type="text"
      placeholder="Keresés leírás alapján..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2"
    />
  </div>

  {/* Lista */}
  {isLoading ? (
    <p className="text-center text-gray-400">Betöltés...</p>
  ) : filteredExpenses.length === 0 ? (
    <p className="text-center text-gray-400 bg-gray-800/50 p-6 rounded-lg">
      Nincs találat a megadott szűrőkkel.
    </p>
  ) : (
    <ul className="space-y-3">
      <AnimatePresence>
        {filteredExpenses.map((exp) => (
          <motion.li
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700/50 transition-all"
          >
            <div className="flex items-center space-x-4">
              <CategoryIcon category={exp.category} className="text-2xl" />
              <div>
                <p className="font-semibold">{exp.description}</p>
                <p
                  className={`text-sm ${
                    exp.payer === "user1" ? "text-green-400" : "text-blue-400"
                  }`}
                >
                  {userNames[exp.payer]} fizette
                </p>
              </div>
            </div>
            <div className="text-right flex items-center space-x-4">
              <p className="font-bold text-lg">
                {exp.amount.toLocaleString("hu-HU")} Ft
              </p>
              <button
                onClick={() => deleteExpense(exp.id)}
                className="text-gray-500 hover:text-red-500 transition-colors text-xl"
              >
                🗑️
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )}
</div>

      </div>
    </div>
  );
}
