import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "leaflet/dist/leaflet.css";
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
