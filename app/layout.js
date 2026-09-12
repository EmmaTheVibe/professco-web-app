import { Inter, Noto_Sans } from "next/font/google";
import { Suspense } from "react";
import { cookies } from "next/headers";

import "@/app/_styles/globals.css";
import { ContextProvider } from "@/app/_utils/Contexts";
import AuthSeeder from "@/app/_components/auth/AuthSeeder";
import PersonalizationGuard from "@/app/_components/auth/PersonalizationGuard";
import HomeNav from "@/app/_components/navigation/HomeNav/HomeNav";
import { Providers } from "@/app/_components/layout/Providers";

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

async function getInitialAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return { isAuthenticated: !!token, user: null };
}

export default async function RootLayout({ children }) {
  const initialAuth = await getInitialAuth();

  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${inter.variable}`}>
        <Suspense fallback={null}>
          <Providers>
            <ContextProvider>
              <AuthSeeder initialAuth={initialAuth} />
              <PersonalizationGuard />
              <HomeNav />
              {children}
            </ContextProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
