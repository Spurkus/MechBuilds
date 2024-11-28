import { Metadata } from "next";
import dynamic from "next/dynamic";

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Explore custom keyboard builds shared by the community. Discover new keyboards, switches, keycaps, and more. Get inspired by the amazing builds shared on MechBuilds!",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-grow flex-col md:flex-row">
      <div className="flex max-md:h-24 md:w-[15%]">
        <AdBanner
          data-ad-slot="slotnumber"
          data-full-width-responsive="true"
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
      <div className="flex flex-grow">{children}</div>
      <div className="flex max-md:h-24 md:w-[15%]">
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
