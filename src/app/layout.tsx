import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import 'animate.css';
import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
  title: "Nanies Cafes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning 
      >
        <Header />
        {children}
        <ToastContainer position="bottom-right"/>
        <Footer />
      </body>
    </html>
  );
}
