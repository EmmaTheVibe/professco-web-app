import { Inter, Noto_Sans } from "next/font/google";
import { Suspense } from "react";
import { cookies } from "next/headers";

import "@/app/_styles/globals.css";
import { ContextProvider } from "@/app/_utils/Contexts";
import AuthSeeder from "@/app/_components/auth/AuthSeeder";
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getInitialAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { isAuthenticated: false, user: null };
    }

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { isAuthenticated: false, user: null };
    }

    const profile = await response.json();
    return { isAuthenticated: true, user: profile };
  } catch (error) {
    console.error("Failed to resolve initial auth state:", error);
    return { isAuthenticated: false, user: null };
  }
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
              <HomeNav />
              {children}
            </ContextProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
