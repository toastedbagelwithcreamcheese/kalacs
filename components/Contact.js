"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, User, MessageSquare, CalendarDays, Info, Send, AlertCircle, CheckCircle2, MapPin, Instagram, Facebook} from "lucide-react";

// Szolgáltatás típusok (frissítsd a saját szolgáltatásaid alapján)
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

const ContactPage = () => {
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
  const [messageStatus, setMessageStatus] = useState({ type: "", text: "" }); // type: "success" or "error"

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
    setMessageStatus({ type: "", text: "" }); // Reset status

    // **FONTOS: Cseréld le a saját EmailJS Service ID, Template ID és Public Key adataidra!**
    const SERVICE_ID = "service_slkhy49"; // ÁTÍRANDÓ: Saját EmailJS Service ID
    const USER_TEMPLATE_ID = "template_hwigljg"; // ÁTÍRANDÓ: Felhasználói visszaigazoló sablon ID
    const ADMIN_TEMPLATE_ID = "template_h9vh4s7"; // ÁTÍRANDÓ: Admin értesítő sablon ID
    const PUBLIC_KEY = "GV9oSuGnV7NGpGLGu";   // ÁTÍRANDÓ: Saját EmailJS Public Key

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Nincs megadva",
      serviceType: serviceOptions.find(opt => opt.value === formData.serviceType)?.label || formData.serviceType || "Nincs megadva",
      date: formData.date || "Nincs megadva",
      foundVia: foundViaOptions.find(opt => opt.value === formData.foundVia)?.label || formData.foundVia || "Nincs megadva",
      message: formData.message || "Nincs üzenet.",
    };

    // 1. Visszaigazoló e-mail a felhasználónak
    emailjs
      .send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        // 2. Értesítő e-mail NEKED
        return emailjs.send(
          SERVICE_ID,
          ADMIN_TEMPLATE_ID,
          {
            ...templateParams,
            // **FONTOS: Add meg itt a saját email címedet, ahova az értesítéseket kapni szeretnéd!**
            admin_email: "fotós_emailje@example.com", // ÁTÍRANDÓ: A te email címed
            form_subject: `Új kapcsolatfelvétel: ${formData.name}`,
          },
          PUBLIC_KEY
        );
      })
      .then(() => {
        setIsSubmitting(false);
        setMessageStatus({ type: "success", text: "Üzenet sikeresen elküldve! Hamarosan felveszem veled a kapcsolatot." });
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
        setMessageStatus({ type: "error", text: "Hiba történt az üzenetküldés során. Kérlek, próbáld újra később, vagy keress más elérhetőségen." });
        console.error("EmailJS hiba:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-[#f0e9e4] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#5c6355] tracking-tight">
            Lépjünk kapcsolatba!
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Kérdésed van, vagy szeretnél egyedi ajánlatot kérni a fotózásra? Töltsd ki az alábbi űrlapot, és én a lehető leghamarabb válaszolok!
          </p>
        </header>

        <div className="max-w-6xl mx-auto md:grid md:grid-cols-12 md:gap-12 lg:gap-16 items-start">
          {/* Bal oldali információs sáv */}
          <aside className="md:col-span-5 lg:col-span-4 mb-10 md:mb-0 p-6 sm:p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-[#646C5E] mb-6">Elérhetőségeim</h2>
            <div className="space-y-5">
              <div className="flex items-center">
                <MapPin size={28} className="text-[#C79C8D] mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">Helyszín</h3>
                  <p className="text-gray-600 text-sm">Zalaegerszeg és környéke (rugalmas vagyok)</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail size={28} className="text-[#C79C8D] mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">Email</h3>
                  <a href="mailto:fotós_emailje@example.com" className="text-gray-600 text-sm hover:text-[#C79C8D] transition-colors">kovacsbalintfoto@gmail.com</a> 
                  {/* ÁTÍRANDÓ: A te email címed */}
                </div>
              </div>
              <div className="flex items-center">
                <Phone size={28} className="text-[#C79C8D] mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">Telefon</h3>
                  <p className="text-gray-600 text-sm">+36 (30) 872 3777</p>
                  {/* ÁTÍRANDÓ: A te telefonszámod, ha szeretnéd megjeleníteni */}
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <h3 className="text-lg font-semibold text-[#646C5E] mb-3">Kövess a közösségi médiában!</h3>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C79C8D] transition-colors"><Instagram size={28}/></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C79C8D] transition-colors"><Facebook size={28}/></a>
              {/* ÁTÍRANDÓ: Közösségi média linkjeid */}
            </div>
             <p className="mt-6 text-sm text-gray-500">
                Általában 24-48 órán belül válaszolok a megkeresésekre. Hétvégén és ünnepnapokon ez az idő hosszabb lehet. Köszönöm türelmed!
            </p>
          </aside>

          {/* Jobb oldali űrlap */}
          <main className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Név */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Név <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] transition-all duration-200 placeholder-gray-400"
                    placeholder="Teljes neved" required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email cím <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] transition-all duration-200 placeholder-gray-400"
                    placeholder="nev@example.com" required
                  />
                </div>
              </div>

              {/* Telefonszám (opcionális) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefonszám (opcionális)</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] transition-all duration-200 placeholder-gray-400"
                        placeholder="+36  XX XXX XXXX"
                    />
                </div>
              </div>

              {/* Szolgáltatás típusa */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Milyen fotózás érdekel?</label>
                <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange}
                  className="block w-full py-3 px-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] transition-all duration-200"
                >
                  {serviceOptions.map(option => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Időpont választás (opcionális) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferált időpont (opcionális)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarDays size={18} className="text-gray-400" />
                        </div>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] transition-all duration-200"
                        />
                    </div>
                </div>
                {/* Hol találtál rám? (opcionális) */}
                <div>
                    <label htmlFor="foundVia" className="block text-sm font-medium text-gray-700 mb-1">Hol hallottál rólam? (opcionális)</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Info size={18} className="text-gray-400" />
                        </div>
                        <select id="foundVia" name="foundVia" value={formData.foundVia} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] transition-all duration-200"
                        >
                        {foundViaOptions.map(option => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                        ))}
                        </select>
                    </div>
                </div>
              </div>

              {/* Üzenet (opcionális) */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Üzenet (opcionális)</label>
                <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-3 flex items-start pointer-events-none">
                        <MessageSquare size={18} className="text-gray-400" />
                    </div>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5"
                        className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] transition-all duration-200 placeholder-gray-400"
                        placeholder="Írd le itt kérdéseidet, elképzeléseidet..."
                    />
                </div>
              </div>

              {/* Üzenet állapota */}
              {messageStatus.text && (
                <div className={`p-4 rounded-md text-sm flex items-center ${messageStatus.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {messageStatus.type === "success" ? <CheckCircle2 className="mr-2 flex-shrink-0" /> : <AlertCircle className="mr-2 flex-shrink-0" />}
                  {messageStatus.text}
                </div>
              )}

              {/* Küldés gomb */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[#646C5E] hover:bg-[#52584e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C79C8D] transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
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
                      <Send size={18} className="mr-2" /> Üzenet küldése
                    </>
                  )}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;