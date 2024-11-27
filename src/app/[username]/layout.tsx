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
      description: `The user ${params.username} does not exist on MechBuilds! MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts. It was created to help users organize their keyboard builds and share them with the community.`,
    };
  return {
    title: `${user.displayName} | MechBuilds`,
    description: `Check out the keyboard builds of ${user.displayName} on MechBuilds! MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts. It was created to help users organize their keyboard builds and share them with the community.`,
    openGraph: {
      title: `${user.displayName} | MechBuilds`,
      description: `Check out the keyboard builds of ${user.displayName} on MechBuilds! MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts.`,
      url: `https://www.mechbuilds.app/${params.username}`,
      username: user.username,
      images: [{ url: user.profilePicture, width: 460, height: 460 }],
      type: "profile",
      siteName: "MechBuilds",
    },
    twitter: {
      card: "summary",
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
