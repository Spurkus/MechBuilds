import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import {
  getAuthenticated,
  getProfilePicture,
  getTheme,
  getUsername,
  getDisplayName,
  getPronouns,
} from "@/src/helper/cookiesFunctions";
import { GlobalThemeContextProvider } from "@/src/context/GlobalTheme";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer";
import { GlobalModalContextProvider } from "@/src/context/GlobalModal";
import { AuthContextProvider } from "@/src/context/Authentication";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MechBuilds",
  description: "A keyboard management app for custom mechanical keyboard enthusiasts :3",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = await getTheme();
  const authenticated = await getAuthenticated();
  const username = await getUsername();
  const displayName = await getDisplayName();
  const pronouns = await getPronouns();
  const profilePicture = await getProfilePicture();
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalThemeContextProvider initialTheme={theme}>
          <GlobalModalContextProvider>
            <AuthContextProvider
              initialAuthenticated={authenticated}
              initialUsername={username}
              initialDisplayName={displayName}
              initialPronouns={pronouns}
              initialProfilePicture={profilePicture}
            >
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex flex-grow">
                  <div className="flex w-[6%] xl:w-1/6"></div>
                  <div className="flex flex-grow">{children}</div>
                  <div className="flex w-[6%] xl:w-1/6"></div>
                </main>
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
