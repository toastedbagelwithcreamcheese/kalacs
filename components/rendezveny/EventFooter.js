import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { EVENT_CATEGORY_LIST } from "@/constants/rendezveny/categories";
import { EVENT_SITE, EVENT_NAV, EVENT_CTA } from "@/constants/rendezveny/site";

export default function EventFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--ev-sunk)" }}>
      <div className="mx-auto max-w-ev px-5 pb-10 pt-20 md:px-10 lg:px-16 lg:pt-28">
        {/* Záró CTA */}
        <div
          className="flex flex-col gap-8 border-b pb-14 md:flex-row md:items-end md:justify-between"
          style={{ borderColor: "var(--ev-line)" }}
        >
          <h2 className="ev-display ev-d-l max-w-[16ch]">
            Beszéljünk a rendezvényedről.
          </h2>
          <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary shrink-0">
            {EVENT_CTA.label}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Linkoszlopok */}
        <div className="grid grid-cols-2 gap-10 py-14 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <p className="ev-display text-xl">{EVENT_SITE.brand.name}</p>
            <p className="ev-mono mt-1" style={{ letterSpacing: "0.3em" }}>
              {EVENT_SITE.brand.suffix}
            </p>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-[var(--ev-ink-2)]">
              {EVENT_SITE.brand.tagline} — konferenciától a sárig, országosan.
            </p>
          </div>

          <div>
            <p className="ev-mono mb-4">Kategóriák</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {EVENT_CATEGORY_LIST.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/rendezveny/${cat.slug}`}
                    className="flex items-center gap-2 text-[var(--ev-ink-2)] transition-colors hover:text-[var(--ev-ink)]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: cat.soft }}
                    />
                    {cat.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ev-mono mb-4">Oldalak</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {EVENT_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--ev-ink-2)] transition-colors hover:text-[var(--ev-ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={EVENT_SITE.photoSite.href}
                  className="flex items-center gap-1 font-medium text-[var(--ev-brand)]"
                >
                  {EVENT_SITE.photoSite.label}
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="ev-mono mb-4">Elérhetőség</p>
            <ul className="flex flex-col gap-3 text-sm text-[var(--ev-ink-2)]">
              <li>
                <a
                  href={`mailto:${EVENT_SITE.contact.email}`}
                  className="flex items-start gap-2 transition-colors hover:text-[var(--ev-ink)]"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  {EVENT_SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={EVENT_SITE.contact.phoneHref}
                  className="flex items-start gap-2 transition-colors hover:text-[var(--ev-ink)]"
                >
                  <Phone size={16} className="mt-0.5 shrink-0" />
                  {EVENT_SITE.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {EVENT_SITE.contact.area}
              </li>
            </ul>
          </div>
        </div>

        {/* Jogi sáv */}
        <div
          className="flex flex-col gap-3 border-t pt-6 text-xs text-[var(--ev-ink-3)] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--ev-line)" }}
        >
          <p>© {year} {EVENT_SITE.brand.name}. Minden jog fenntartva.</p>
          <div className="flex gap-5">
            <Link href="/adatvedelem" className="transition-colors hover:text-[var(--ev-ink)]">
              Adatvédelem
            </Link>
            <Link href="/aszf" className="transition-colors hover:text-[var(--ev-ink)]">
              ÁSZF
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
