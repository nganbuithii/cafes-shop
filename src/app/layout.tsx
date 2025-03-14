import type { Metadata } from "next";
import "./globals.css";
import 'animate.css';
import { Playfair_Display, Poppins } from "next/font/google";
import AppProvider from "@/components/app-provider";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const metadata: Metadata = {
  title: "Nanies Cafes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.className} ${poppins.className}`} suppressHydrationWarning>

      <body suppressHydrationWarning
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
