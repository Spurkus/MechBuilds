import { Metadata } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about MechBuilds and its creators. Contact us for any questions or feedback. Support us by donating or becoming a supporter!",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: "https://www.mechbuilds.app/about",
    name: "About | MechBuilds",
    description:
      "Learn more about MechBuilds and its creators. Contact us for any questions or feedback. Support us by donating or becoming a supporter!",
    isPartOf: {
      "@type": "WebSite",
      name: "MechBuilds",
      url: "https://www.mechbuilds.app",
    },
  };

  return (
    <main className="flex flex-grow flex-col md:flex-row">
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="canonical" href="https://www.mechbuilds.com/explore" />
      </Head>
      <div className="flex max-md:h-24 md:w-1/2">
        <AdBanner
          data-ad-slot="slotnumber"
          data-full-width-responsive="true"
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
      <div className="mx-8 flex flex-grow">{children}</div>
      <div className="flex max-md:h-24 md:w-1/2">
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
