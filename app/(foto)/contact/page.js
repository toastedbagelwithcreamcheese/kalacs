// pages/contact.js
import Contact from "@/components/Contact";
import '@/app/globals.css';

export const metadata = {
  title: "Kapcsolat | Kovács Bálint Fotó",
  description: "Kérj árajánlatot vagy egyeztess időpontot Kovács Bálint fotográfussal. Esküvői, portré, családi, kismama, autós és kutyás fotózás Zalaegerszegen és Budapesten.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Kapcsolat | Kovács Bálint Fotó",
    description: "Kérj árajánlatot vagy egyeztess időpontot Kovács Bálint fotográfussal.",
  },
};

const ContactPage = () => {
  return (
    
    <div>
      <Contact />
    </div>
  );
};

export default ContactPage;