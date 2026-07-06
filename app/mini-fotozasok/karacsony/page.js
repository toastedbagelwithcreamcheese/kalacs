import Szezonalis from "@/components/mini-fotozasok";
import '@/app/globals.css';

export const metadata = {
  title: "Karácsonyi Mini Fotózás | Kovács Bálint Fotó",
  description: "Karácsonyi hangulatú mini családi és gyerekfotózás Zalaegerszegen. Rövid, megfizethető ünnepi fotósorozat.",
  alternates: {
    canonical: "/mini-fotozasok/karacsony",
  },
};

const SzezonalisPage = () => {
  return (
    
    <div>
      <Szezonalis />
    </div>
  );
};

export default SzezonalisPage;