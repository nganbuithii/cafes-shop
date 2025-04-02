import type { Metadata } from "next";
import "./globals.css";
import 'animate.css';
import { Playfair_Display, Poppins } from "next/font/google";
import AppProvider from "@/components/app-provider";
import AIChatbotPopup from "@/components/AIChatbot";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import {routing} from '@/i18n/routing';

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const metadata: Metadata = {
  title: "Nanies Cafes",
};

export default  async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;

}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className={`${playfair.className} ${poppins.className}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-white dark:bg-black">
        <AppProvider >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
          <AIChatbotPopup />
        </AppProvider>
      </body>
    </html>
  );
}
