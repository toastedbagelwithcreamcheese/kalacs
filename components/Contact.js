"use client"

import { useState } from "react";
import emailjs from "emailjs-com";

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
  const [messageStatus, setMessageStatus] = useState("");

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
  
    const templateParams = {
      name: formData.name,
      email: formData.email, // Felhasználó email címe
      phone: formData.phone,
      serviceType: formData.serviceType,
      date: formData.date,
      foundVia: formData.foundVia,
      message: formData.message,
    };
  
    // 📩 1️⃣ Visszaigazoló e-mail a felhasználónak
    emailjs
      .send(
        "service_slkhy49", // EmailJS Service ID
        "template_hwigljg", // Visszaigazoló sablon ID (amit a felhasználó kap)
        templateParams,
        "GV9oSuGnV7NGpGLGu" // EmailJS Public Key
      )
      .then(() => {
        // 📩 2️⃣ Értesítő e-mail NEKED az összes részlettel
        return emailjs.send(
          "service_slkhy49", // EmailJS Service ID
          "template_h9vh4s7", // Admin értesítő sablon ID (amit te kapsz)
          {
            ...templateParams,
            admin_email: "teemailcimed@example.com", // IDE a saját e-mailed kell
          },
          "GV9oSuGnV7NGpGLGu" // EmailJS Public Key
        );
      })
      .then(() => {
        setIsSubmitting(false);
        setMessageStatus("Üzenet sikeresen elküldve!");
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
        setMessageStatus("Hiba történt, próbáld újra!");
      });
  };
  
    

  return (
    <div className="container mx-auto px-6 py-10">
      
      <h2 className="text-4xl font-extrabold text-[#646C5E] mb-6 text-left">
        Kapcsolat
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto">
        {/* Név */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-[#646C5E] text-lg font-semibold">
            Név
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="px-6 py-3 border border-[#646C5E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C79C8D] transition-all duration-300"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-[#646C5E] text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-6 py-3 border border-[#646C5E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C79C8D] transition-all duration-300"
            required
          />
        </div>

        {/* Telefonszám */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-[#646C5E] text-lg font-semibold">
            Telefonszám
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="px-6 py-3 border border-[#646C5E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C79C8D] transition-all duration-300"
            required
          />
        </div>

        {/* Szolgáltatás típusa (legördülő menü) */}
        <div className="flex flex-col">
          <label htmlFor="serviceType" className="text-[#646C5E] text-lg font-semibold">
            Milyen szolgáltatásra van szükséged?
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="px-6 py-3 border border-[#646C5E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C79C8D] transition-all duration-300"
            required
          >
            <option value="" disabled>Válassz egy opciót</option>
            <option value="portré">Portré fotózás</option>
            <option value="esemény">Esemény fotózás</option>
            <option value="termék">Termék fotózás</option>
            <option value="egyéb">Egyéb</option>
          </select>
        </div>

        {/* Időpont választás */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-[#646C5E] text-lg font-semibold">
            Preferált időpont
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-6 py-3 border border-[#646C5E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C79C8D] transition-all duration-300"
            required
          />
        </div>

        {/* Hol találtál rám? */}
        <div className="flex flex-col">
          <label htmlFor="foundVia" className="text-[#646C5E] text-lg font-semibold">
            Hol találtál rám?
          </label>
          <select
            id="foundVia"
            name="foundVia"
            value={formData.foundVia}
            onChange={handleChange}
            className="px-6 py-3 border border-[#646C5E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C79C8D] transition-all duration-300"
            required
          >
            <option value="" disabled>Válassz egy opciót</option>
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="ajánlás">Ajánlás</option>
            <option value="egyéb">Egyéb</option>
          </select>
        </div>

        {/* Üzenet */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-[#646C5E] text-lg font-semibold">
            Üzenet
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className="px-6 py-3 border border-[#646C5E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C79C8D] transition-all duration-300"
            required
          />
        </div>

        {/* Üzenet állapota */}
        {messageStatus && (
          <p className="text-center text-lg text-[#C79C8D]">{messageStatus}</p>
        )}

        {/* Küldés gomb */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-4 bg-[#646C5E] text-white rounded-lg font-semibold hover:bg-[#C79C8D] hover:scale-105 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Küldés..." : "Üzenet küldése"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;