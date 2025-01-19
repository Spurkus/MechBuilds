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
import icon from "@/src/public/images/mechbuilds-logo.svg";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: {
    default: "MechBuilds - Share & Organize Your Custom Keyboard Builds",
    template: "%s | MechBuilds",
  },
  description:
    "MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts. It was created to help users organize their keyboard builds and share them with the community. Discover and share custom mechanical keyboard builds with MechBuilds! A platform for enthusiasts to organize, showcase, and get inspired by amazing keyboards, switches, keycaps, and more. Join the community today!",
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
  icons: [
    {
      url: icon.src,
      type: "image/svg+xml",
    },
  ],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.mechbuilds.app",
    name: "MechBuilds",
  };

  return (
    <GlobalThemeContextProvider initialTheme={theme}>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          data-nscript="lazyOnload"
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-screen flex-col">
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
      </body>
    </GlobalThemeContextProvider>
  );
};

export default RootLayout;
