export const metadata = {
  title: "Elszámolás",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ElszamolasLayout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {children}
    </div>
  );
}
