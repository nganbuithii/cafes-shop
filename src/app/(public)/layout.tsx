import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "next-themes";
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
}
