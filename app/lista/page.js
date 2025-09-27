"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

// Az AnimatedCheckmark komponens változatlan maradt
const AnimatedCheckmark = ({ checked }) => {
  return (
    <motion.svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      animate={checked ? "checked" : "unchecked"}
      initial={false}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        fill="transparent"
        strokeWidth="3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          unchecked: { pathLength: 0, opacity: 0 },
          checked: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};


export default function ListaPage() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- ÚJ RÉSZEK KEZDETE ---
  const [newName, setNewName] = useState(''); // State az új név input mezőjéhez
  const [isSubmitting, setIsSubmitting] = useState(false); // State a küldés folyamatának jelzésére
  // --- ÚJ RÉSZEK VÉGE ---

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('nevlista')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setPeople(data);
      } catch (error) {
        console.error('Hiba az adatok lekérése közben:', error);
        setError('Nem sikerült betölteni a listát.');
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  const handleCheckboxChange = async (id, currentStatus) => {
    // Ez a függvény változatlan
    const newStatus = !currentStatus;
    const originalPeople = [...people];
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === id ? { ...person, is_seen: newStatus } : person
      )
    );
    const { error } = await supabase
      .from('nevlista')
      .update({ is_seen: newStatus })
      .eq('id', id);
    if (error) {
      console.error('Hiba a frissítés során:', error);
      alert('Nem sikerült menteni a változást.');
      setPeople(originalPeople);
    }
  };

  // --- ÚJ FÜGGVÉNY ---
  const handleAddPerson = async (e) => {
    e.preventDefault(); // Megakadályozza az oldal újratöltődését
    if (newName.trim() === '') return; // Ne engedjünk üres nevet hozzáadni

    setIsSubmitting(true);
    try {
      // Beszúrjuk az új nevet az adatbázisba, és visszakérjük a generált sort
      const { data, error } = await supabase
        .from('nevlista')
        .insert([{ name: newName.trim() }])
        .select()
        .single(); // .single() kell, mert egyetlen sort várunk vissza

      if (error) throw error;

      // Hozzáadjuk az új személyt a meglévő listához a kliens oldalon
      setPeople(prevPeople => [...prevPeople, data]);
      setNewName(''); // Kiürítjük az input mezőt
    } catch (error) {
      console.error('Hiba a hozzáadás során:', error);
      alert('Nem sikerült hozzáadni az új nevet.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animációs variánsok a listának és az elemeknek
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Az elemek egymás után jelennek meg ennyi késleltetéssel
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
            <div className="text-xl font-medium text-gray-600">📝 Lista betöltése...</div>
        </div>
    );
  }
  
  if (error) {
      return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-8 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="p-8 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Találkozási Lista ✨
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Jelöld be, kit láttál már élőben!
          </motion.p>
        </div>
{/* --- ÚJ ŰRLAP --- */}
        <motion.div
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <form onSubmit={handleAddPerson} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Új név hozzáadása..."
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:scale-105 disabled:hover:scale-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? 'Mentés...' : 'Hozzáadás'}
            </button>
          </form>
        </motion.div>
        <div className="overflow-x-auto">
          <motion.ul
            className="divide-y divide-gray-200/80"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {people.map((person) => (
              <motion.li
                key={person.id}
                variants={itemVariants}
                className={clsx(
                  "flex items-center justify-between p-5 cursor-pointer transition-all duration-300",
                  person.is_seen ? 'bg-green-100/70' : 'hover:bg-gray-100/50'
                )}
                onClick={() => handleCheckboxChange(person.id, person.is_seen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={clsx(
                  "font-medium text-gray-800 transition-all duration-300",
                  person.is_seen && 'line-through text-gray-400'
                )}>
                  {person.name}
                </span>

                <div className={clsx(
                  "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  person.is_seen
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 bg-white'
                )}>
                  <AnimatePresence>
                    {person.is_seen && <AnimatedCheckmark checked={person.is_seen} />}
                  </AnimatePresence>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </main>
  );
}