const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-grow">
      <div className="mx-4 flex flex-grow lg:mx-12 xl:mx-28">{children}</div>;
    </main>
  );
};

export default Layout;
