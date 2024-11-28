import { Metadata } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Profile",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: "https://www.mechbuilds.app/profile",
    name: "Profile | MechBuilds",
    description: "View your profile on MechBuilds. Update your settings, view your builds, and more.",
    isPartOf: {
      "@type": "WebSite",
      name: "MechBuilds",
      url: "https://www.mechbuilds.app",
    },
  };

  return (
    <main className="flex flex-grow flex-col xl:flex-row">
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <div className="flex max-xl:h-24 xl:w-1/6">
        <AdBanner
          data-ad-slot="slotnumber"
          data-full-width-responsive="true"
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
      <div className="mx-2 flex flex-grow flex-col justify-center gap-6 sm:flex-row xl:mx-6">{children}</div>
      <div className="flex max-xl:h-24 xl:w-1/6">
        <AdBanner
          data-ad-slot="slotnumber"
          data-full-width-responsive="true"
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
    </main>
  );
};

export default Layout;
