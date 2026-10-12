import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata = {
  title: "বাজার দর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0F5F0]">
        <Header />
        <Marquee />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
