import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Settings",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: "https://www.mechbuilds.app/settings",
    name: "Settings | MechBuilds",
    description: "Update your settings on MechBuilds. Change your username, email, password, and more.",
    isPartOf: {
      "@type": "WebSite",
      name: "MechBuilds",
      url: "https://www.mechbuilds.app",
    },
  };

  return (
    <main className="flex flex-grow">
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <div className="mx-4 flex w-full flex-col lg:mx-12 lg:flex-row xl:mx-28">{children}</div>;
    </main>
  );
};

export default Layout;
