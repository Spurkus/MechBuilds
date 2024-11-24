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
import dynamic from "next/dynamic";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: "MechBuilds",
  description: "A keyboard management app for custom mechanical keyboard enthusiasts :3",
};

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

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
          <main className="flex flex-grow">
            <div className="flex w-[6%] xl:w-1/6">
              <AdBanner
                data-ad-slot="slotnumber"
                data-full-width-responsive="true"
                data-ad-layout="in-article"
                data-ad-format="fluid"
              />
            </div>
            <div className="flex flex-grow">{children}</div>
            <div className="flex w-[6%] xl:w-1/6">
              <AdBanner
                data-ad-slot="slotnumber"
                data-full-width-responsive="true"
                data-ad-layout="in-article"
                data-ad-format="fluid"
              />
            </div>
          </main>
          <Footer />
        </AuthContextProvider>
      </GlobalModalContextProvider>
    </GlobalThemeContextProvider>
  );
};

export default RootLayout;
