import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"] 
});
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"] 
});

export const metadata: Metadata = {
  title: "ICONIC ADVERTISING | Premium Creative Partner",
  description: "Helping businesses create powerful visual identities through premium printing, publishing, branding, advertising, and marketing solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={`${inter.variable} ${jakarta.variable} ${playfair.variable} font-sans transition-colors duration-500 antialiased`}>
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          
          <Header />
          <WhatsAppButton />
          
          {children}

          <footer className="bg-light-surface dark:bg-dark-surface border-t border-black/10 dark:border-white/10 pt-32 pb-12 transition-colors duration-500">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                <div className="md:col-span-1">
                  <div className="text-3xl font-syne font-extrabold tracking-widest uppercase mb-6">
                    <Link href="/">ICONIC</Link>
                  </div>
                  <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed font-light">
                    A premium creative partner, modern branding agency, and professional advertising company.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-syne font-bold tracking-widest uppercase mb-8">Company</h4>
                  <div className="flex flex-col gap-4 text-black/60 dark:text-white/60 font-light">
                    <Link href="/about" className="hover:text-royal transition-colors">About Us</Link>
                    <Link href="/work" className="hover:text-royal transition-colors">Our Work</Link>
                    <Link href="/testimonials" className="hover:text-royal transition-colors">Testimonials</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-syne font-bold tracking-widest uppercase mb-8">Contact</h4>
                  <div className="flex flex-col gap-4 text-black/60 dark:text-white/60 font-light">
                    <a href="tel:+966508570135" className="hover:text-royal transition-colors">+966 50 857 0135</a>
                    <a href="tel:+966504434890" className="hover:text-royal transition-colors">+966 50 443 4890</a>
                    <a href="mailto:print@iconic-advertising.com" className="hover:text-royal transition-colors">print@iconic-advertising.com</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-syne font-bold tracking-widest uppercase mb-8">Location</h4>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed font-light">
                    Jeddah,<br />Saudi Arabia
                  </p>
                </div>
              </div>
              <div className="text-center pt-8 border-t border-black/10 dark:border-white/10 text-sm text-black/40 dark:text-white/40">
                <p>&copy; {new Date().getFullYear()} ICONIC ADVERTISING. All rights reserved.</p>
                <p className="mt-1 text-xs text-black/30 dark:text-white/30">Productions of SYED HUNAIN</p>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}
