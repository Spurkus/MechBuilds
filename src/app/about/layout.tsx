import { Metadata } from "next";
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
  return (
    <main className="flex flex-grow flex-col md:flex-row">
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
