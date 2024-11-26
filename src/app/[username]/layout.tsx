import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getUser } from "@/src/helper/firestoreFunctions";

const AdBanner = dynamic(() => import("@/src/components/General/AdBanner"), {
  ssr: false,
});

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const user = await getUser(params.username);
  if (!user)
    return {
      title: `User Not Found | MechBuilds`,
      description: `The user ${params.username} does not exist on MechBuilds!`,
    };
  return {
    title: `${user.displayName} | MechBuilds`,
    description: `Check out the keyboard builds of ${user.displayName} on MechBuilds!`,
    openGraph: {
      title: `${user.displayName} | MechBuilds`,
      description: `Check out the keyboard builds of ${user.displayName} on MechBuilds!`,
      url: `https://mechbuilds.app/${params.username}`,
      images: [{ url: user.profilePicture }],
      type: "profile",
      siteName: "MechBuilds",
    },
  };
}

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
