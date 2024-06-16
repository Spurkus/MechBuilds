import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";

import { getTheme } from "../helper/CookiesFunctions";
import { GlobalThemeContextProvider } from "../context/GlobalTheme";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GlobalModalContextProvider } from "../context/GlobalModal";
import { AuthContextProvider } from "../context/Authentication";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MechBuilds",
  description:
    "A keyboard management app for custom mechanical keyboard enthusiasts :3",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = await getTheme();
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalThemeContextProvider initialTheme={theme}>
          <GlobalModalContextProvider>
            <AuthContextProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex flex-grow">{children}</main>
                <Footer />
              </div>
            </AuthContextProvider>
          </GlobalModalContextProvider>
        </GlobalThemeContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
