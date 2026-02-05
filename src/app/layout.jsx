// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../providers/providers";
import RootProvider from "@/providers/RootProvider";
import { CartProvider } from "@/providers/CartProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Asia LMS - Empowering E-Learning Excellence",
  description: "A comprehensive learning management system for Asian educational institutions and businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script src="/assets/lang-config.js" strategy="beforeInteractive" />
      <script src="/assets/translation.js" strategy="beforeInteractive" />
      <script src="//translate.google.com/translate_a/element.js?cb=TranslateInit" strategy="afterInteractive" />
      {/* <style dangerouslySetInnerHTML={{
        __html: `
          body.antialiased {
    top: 0px !important;
}
        `}} /> */}
      <body className={`antialiased`}>
        <CartProvider>
          <Providers>
            <RootProvider>
              {children}
            </RootProvider>
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}