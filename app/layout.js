import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./Providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata = {
  title: { default: "Addis Eats | Authentic Ethiopian Food", template: "%s | Addis Eats" },
  description:
    "Order authentic Ethiopian dishes like doro wat, kitfo, tibs and shiro, made with traditional recipes and delivered fresh across Addis Ababa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-gray-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        <Providers>
          <Header />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
