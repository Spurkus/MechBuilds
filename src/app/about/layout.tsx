import dynamic from "next/dynamic";

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

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
