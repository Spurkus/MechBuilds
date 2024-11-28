import { Metadata } from "next";
import dynamic from "next/dynamic";

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Profile",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-grow flex-col xl:flex-row">
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
