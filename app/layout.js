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

const siteTitle = "Professco";
const siteDescription = "Pass your professional exams with ease the first time";
const socialImage = {
  url: "/images/socials.jpg",
  width: 1200,
  height: 630,
  alt: "Professco",
};

export const metadata = {
  metadataBase: new URL("https://app.professco.ng"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage.url],
  },
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
              <HomeNav initialIsAuthenticated={initialAuth.isAuthenticated} />
              {children}
            </ContextProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
