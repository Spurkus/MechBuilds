import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";

import { GlobalThemeContextProvider } from "../context/GlobalTheme";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MechBuilds",
  description:
    "A keyboard management app for custom mechanical keyboard enthusiasts :3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalThemeContextProvider>
          <div className="flex min-h-screen flex-col">
            <NavigationBar />
            <main className="flex flex-grow">{children}</main>
            <Footer />
          </div>
        </GlobalThemeContextProvider>
      </body>
    </html>
  );
}
