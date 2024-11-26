import type { Metadata } from "next";
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
import Footer from "@/src/components/General/Footer";
import { GlobalModalContextProvider } from "@/src/context/GlobalModal";
import { AuthContextProvider } from "@/src/context/Authentication";
import { Analytics } from "@vercel/analytics/next";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: "MechBuilds - Share & Organize Your Custom Keyboard Builds",
  description:
    "Discover and share custom mechanical keyboard builds with MechBuilds! A platform for enthusiasts to organize, showcase, and get inspired by amazing keyboards, switches, keycaps, and more.",
  keywords: [
    "custom keyboards",
    "custom keyboard builds",
    "mechanical keyboards",
    "keyboard builds",
    "switches",
    "keycaps",
    "keyboard enthusiasts",
    "keyboard modding",
    "keyboard organization",
    "keyboard showcase",
    "custom mechanical keyboards",
  ],
  authors: [{ name: "Spurkus", url: "https://github.com/Spurkus" }],
  applicationName: "MechBuilds",
  creator: "Spurkus",
  publisher: "Spurkus",
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
    <GlobalThemeContextProvider initialTheme={theme}>
      <GlobalModalContextProvider>
        <AuthContextProvider
          initialAuthenticated={authenticated}
          initialUsername={username}
          initialDisplayName={displayName}
          initialPronouns={pronouns}
          initialProfilePicture={profilePicture}
        >
          <Navbar />
          {children}
          <Footer />
        </AuthContextProvider>
      </GlobalModalContextProvider>
      <Analytics />
    </GlobalThemeContextProvider>
  );
};

export default RootLayout;
