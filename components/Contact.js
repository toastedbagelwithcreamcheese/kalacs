"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import {
  Mail, Phone, User, MessageSquare, Info, Send,
  AlertCircle, CheckCircle2, MapPin, Instagram, Facebook, Sparkles
} from "lucide-react";
import DatePicker from "@/components/DatePicker";

// Szolgáltatás típusok
const serviceOptions = [
  { value: "", label: "Kérlek válassz típust...", disabled: true },
  { value: "kutya", label: "🐾 Kutyafotózás" },
  { value: "kismama", label: "🤰 Kismama fotózás" },
  { value: "csaladi", label: "👨‍👩‍👧‍👦 Családi fotózás" },
  { value: "portre_egyeni", label: "👤 Portré fotózás (egyéni)" },
  { value: "paros", label: "👩‍❤️‍👨 Páros fotózás" },
  { value: "rendezveny", label: "🎉 Rendezvényfotózás (kisebb)" },
  { value: "egyeb", label: "💡 Egyéb (részletezd az üzenetben)" },
];

// "Hol találtál rám?" opciók
const foundViaOptions = [
  { value: "", label: "Kérlek válassz...", disabled: true },
  { value: "google", label: "Google kereső" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "ajanlas", label: "Ismerős ajánlása" },
  { value: "weboldal", label: "Másik weboldalról" },
  { value: "egyeb", label: "Egyéb" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    foundVia: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessageStatus({ type: "", text: "" });

    // **FONTOS: Cseréld le a saját adataidra!**
    const SERVICE_ID = "service_lf3fk4z"; 
    const USER_TEMPLATE_ID = "template_y0lknp9"; 
    const ADMIN_TEMPLATE_ID = "template_5ydhnlg"; 
    const PUBLIC_KEY = "XRnx70SnxBuIIX5NQ";   

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Nincs megadva",
      serviceType: serviceOptions.find(opt => opt.value === formData.serviceType)?.label || formData.serviceType || "Nincs megadva",
      date: formData.date || "Nincs megadva",
      foundVia: foundViaOptions.find(opt => opt.value === formData.foundVia)?.label || formData.foundVia || "Nincs megadva",
      message: formData.message || "Nincs üzenet.",
    };

    emailjs
      .send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        return emailjs.send(
          SERVICE_ID,
          ADMIN_TEMPLATE_ID,
          {
            ...templateParams,
            admin_email: "kapcsolat@kovacsbalintfoto.hu", 
            form_subject: `Új kapcsolatfelvétel: ${formData.name}`,
          },
          PUBLIC_KEY
        );
      })
      .then(() => {
        setIsSubmitting(false);
        setMessageStatus({ type: "success", text: "Üzenet sikeresen elküldve! Hamarosan kereslek." });
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          date: "",
          foundVia: "",
          message: "",
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        setMessageStatus({ type: "error", text: "Hiba történt küldés közben. Kérlek, próbáld újra később." });
        console.error("EmailJS hiba:", error);
      });
  };

  return (
    <div className="min-h-screen bg-[#F9F5F1] py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* FEJLÉC */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#5A4A42] font-akaya mb-4">
            Lépjünk <span className="text-shimmer italic">kapcsolatba</span>!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Kérdésed van, vagy szeretnél egyedi ajánlatot kérni? <br className="hidden md:block"/>
            Töltsd ki az űrlapot, és kezdjük el a közös tervezést!
          </p>
        </motion.header>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* BAL OLDAL: ELÉRHETŐSÉGEK (Sötétbarna kártya) */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-5 lg:col-span-4 bg-[#5A4A42] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Dekoratív háttér elem */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#C79C8D] rounded-full opacity-20 blur-3xl"></div>
            
            <h2 className="text-3xl font-bold font-akaya text-[#C79C8D] mb-8">Elérhetőségek</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start group">
                <div className="bg-white/10 p-3 rounded-full mr-4 group-hover:bg-[#C79C8D] transition-colors duration-300">
                    <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#C79C8D] mb-1">Helyszín</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Budapest, Zalaegerszeg és környéke <br/>
                    <span className="text-xs opacity-70">(Egész országos kiszállás is lehetséges)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-white/10 p-3 rounded-full mr-4 group-hover:bg-[#C79C8D] transition-colors duration-300">
                    <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#C79C8D] mb-1">Email</h3>
                  <a href="mailto:kapcsolat@kovacsbalintfoto.hu" className="text-gray-300 text-sm hover:text-white transition-colors">
                    kapcsolat@kovacsbalintfoto.hu
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-white/10 p-3 rounded-full mr-4 group-hover:bg-[#C79C8D] transition-colors duration-300">
                    <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#C79C8D] mb-1">Telefon</h3>
                  <a href="tel:+36308723777" className="text-gray-300 text-sm hover:text-white transition-colors">
                    +36 (30) 872 3777
                  </a>
                </div>
              </div>
            </div>

            <hr className="my-8 border-white/10" />

            <div className="relative z-10">
                <h3 className="text-lg font-bold font-akaya text-[#C79C8D] mb-4">Kövess be!</h3>
                <div className="flex space-x-4">
                <a href="https://www.instagram.com/k_balintfoto/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#C79C8D] hover:scale-110 transition-all">
                    <Instagram size={24} className="text-white"/>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61577861518379" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#C79C8D] hover:scale-110 transition-all">
                    <Facebook size={24} className="text-white"/>
                </a>
                </div>
            </div>
             
             <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-400 leading-relaxed relative z-10">
                <Info size={16} className="inline mr-1 mb-1 text-[#C79C8D]"/>
                Általában 24-48 órán belül válaszolok. Hétvégén a fotózások miatt ez kicsit több lehet.
            </div>
          </motion.aside>

          {/* JOBB OLDAL: ŰRLAP (Fehér kártya) */}
          <motion.main
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-7 lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-[#5A4A42] font-akaya mb-6 flex items-center gap-2">
                <Sparkles className="text-[#C79C8D]" /> Írj nekem üzenetet
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Név */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#5A4A42] mb-2">Név <span className="text-[#C79C8D]">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                    placeholder="Teljes neved" required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#5A4A42] mb-2">Email cím <span className="text-[#C79C8D]">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                    placeholder="pelda@email.hu" required
                  />
                </div>
              </div>

              {/* Telefonszám */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[#5A4A42] mb-2">Telefonszám (opcionális)</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                        placeholder="+36 30 123 4567"
                    />
                </div>
              </div>

              {/* Kétoszlopos rész: Szolgáltatás és Dátum */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-bold text-[#5A4A42] mb-2">Milyen fotózás érdekel?</label>
                    <div className="relative">
                        <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange}
                        className="block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-transparent transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                        >
                        {serviceOptions.map(option => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                        ))}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                  </div>

                  <div>
                        <label htmlFor="date" className="block text-sm font-bold text-[#5A4A42] mb-2">Tervezett dátum (opcionális)</label>
                        <DatePicker id="date" name="date" value={formData.date} onChange={handleChange} />
                   </div>
              </div>

              {/* Hol találtál rám */}
              <div>
                    <label htmlFor="foundVia" className="block text-sm font-bold text-[#5A4A42] mb-2">Hol hallottál rólam?</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Info size={18} className="text-gray-400" />
                        </div>
                        <select id="foundVia" name="foundVia" value={formData.foundVia} onChange={handleChange}
                            className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-transparent transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                        >
                        {foundViaOptions.map(option => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                        ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
              </div>

              {/* Üzenet */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#5A4A42] mb-2">Üzenet (opcionális)</label>
                <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                        <MessageSquare size={18} className="text-gray-400" />
                    </div>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5"
                        className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                        placeholder="Írd le az elképzeléseidet, vagy ha van kérdésed..."
                    />
                </div>
              </div>

              {/* Státusz üzenet */}
              {messageStatus.text && (
                <div className={`p-4 rounded-xl text-sm flex items-center font-medium ${messageStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                  {messageStatus.type === "success" ? <CheckCircle2 className="mr-2 flex-shrink-0" /> : <AlertCircle className="mr-2 flex-shrink-0" />}
                  {messageStatus.text}
                </div>
              )}

              {/* Küldés gomb */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-[#C79C8D] hover:bg-[#5A4A42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C79C8D] transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Küldés...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" /> Üzenet küldése
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Contact;