import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-grow">
      <div className="mx-4 flex w-full flex-col lg:mx-12 lg:flex-row xl:mx-28">{children}</div>;
    </main>
  );
};

export default Layout;
