"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const HONAPOK = [
  "Január", "Február", "Március", "Április", "Május", "Június",
  "Július", "Augusztus", "Szeptember", "Október", "November", "December",
];
const NAPOK = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];

function toDateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parseValue(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function formatValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(date) {
  return `${date.getFullYear()}. ${HONAPOK[date.getMonth()].toLowerCase()} ${date.getDate()}.`;
}

// Naptár-rács: hétfőn kezdődő héttel, az adott hónap napjaival + kitöltő napokkal
function buildGrid(viewYear, viewMonth) {
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // hétfő = 0
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function DatePicker({ id, name, value, onChange, minDate }) {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const wrapperRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const selected = parseValue(value);
  const today = toDateOnly(new Date());
  const floor = minDate ? toDateOnly(minDate) : today;

  const [viewDate, setViewDate] = useState(() => selected || today);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeMonth = (delta) => {
    setDirection(delta);
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const selectDay = (day) => {
    if (!day || day < floor) return;
    onChange({ target: { name, value: formatValue(day) } });
    setOpen(false);
  };

  const grid = buildGrid(viewDate.getFullYear(), viewDate.getMonth());

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-transparent transition-all duration-200 text-left"
      >
        <span className={selected ? "text-gray-700" : "text-gray-400"}>
          {selected ? formatDisplay(selected) : "Válassz dátumot"}
        </span>
      </button>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <CalendarDays size={18} className="text-gray-400" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -8 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-30 mt-2 w-[300px] bg-white rounded-2xl shadow-2xl border border-[#5A4A42]/10 p-4 origin-top"
          >
            {/* Hónapváltó fejléc */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Előző hónap"
                className="p-2 rounded-full hover:bg-[#F9F5F1] text-[#5A4A42] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="relative h-6 overflow-hidden flex-1 text-center">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.span
                    key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 16 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 font-bold text-[#5A4A42] font-akaya text-lg"
                  >
                    {HONAPOK[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </motion.span>
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Következő hónap"
                className="p-2 rounded-full hover:bg-[#F9F5F1] text-[#5A4A42] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Hét napjai */}
            <div className="grid grid-cols-7 mb-1">
              {NAPOK.map((n) => (
                <div key={n} className="text-center text-[10px] font-bold uppercase tracking-wider text-[#5A4A42]/40 py-1">
                  {n}
                </div>
              ))}
            </div>

            {/* Nap-rács */}
            <div className="grid grid-cols-7 gap-1">
              {grid.map((day, idx) => {
                if (!day) return <div key={idx} />;
                const isPast = day < floor;
                const isToday = day.getTime() === today.getTime();
                const isSelected = selected && day.getTime() === selected.getTime();

                return (
                  <motion.button
                    key={idx}
                    type="button"
                    disabled={isPast}
                    onClick={() => selectDay(day)}
                    whileHover={!isPast ? { scale: 1.1 } : undefined}
                    whileTap={!isPast ? { scale: 0.92 } : undefined}
                    className={`relative aspect-square rounded-lg text-sm flex items-center justify-center transition-colors
                      ${isPast ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-[#F9F5F1] cursor-pointer"}
                      ${isToday && !isSelected ? "font-bold text-[#C79C8D]" : ""}
                    `}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="datepicker-selected"
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute inset-0 bg-[#C79C8D] rounded-lg shadow-md"
                      />
                    )}
                    <span className={`relative z-10 ${isSelected ? "text-white font-bold" : ""}`}>
                      {day.getDate()}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
