import { Inter, Noto_Sans } from "next/font/google";
import { Suspense } from "react";

import "@/app/_styles/globals.css";
import { ContextProvider } from "@/app/_utils/Contexts";
import HomeNav from "@/app/_components/HomeNav/HomeNav";
import { Providers } from "@/app/_components/Providers";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Professco",
  description: "Pass your professional exams with ease the first time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${inter.variable}`}>
        <Suspense fallback={null}>
          <Providers>
            <ContextProvider>
              <HomeNav />
              {children}
            </ContextProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
