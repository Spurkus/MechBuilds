import dynamic from "next/dynamic";

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex w-0 xl:w-1/6">
        <AdBanner
          data-ad-slot="slotnumber"
          data-full-width-responsive="true"
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
      <div className="flex flex-grow xl:mx-6">{children}</div>
      <div className="flex w-0 xl:w-1/6">
        <AdBanner
          data-ad-slot="slotnumber"
          data-full-width-responsive="true"
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
    </>
  );
};

export default Layout;
