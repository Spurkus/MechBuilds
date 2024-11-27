import { Metadata } from "next";
import { getUser, getKeyboardForKeyboardPage } from "@/src/helper/firestoreFunctions";
import { formatNameForURL } from "@/src/helper/helperFunctions";

interface KeyboardPageProps {
  params: {
    username: string;
    keyboardName: string;
  };
}

export async function generateMetadata({ params }: KeyboardPageProps): Promise<Metadata> {
  const user = await getUser(params.username);
  if (!user)
    return {
      title: `User Not Found | MechBuilds`,
      description: `The user ${params.username} does not exist on MechBuilds!`,
    };

  const keyboard = await getKeyboardForKeyboardPage(user.uid, formatNameForURL(params.keyboardName), false);
  if (!keyboard)
    return {
      title: `Keyboard Not Found | MechBuilds`,
      description: `The keyboard ${params.keyboardName} from user ${user.username} does not exist on MechBuilds! MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts. It was created to help users organize their keyboard builds and share them with the community.`,
    };

  const firstImage = keyboard.isMediaVideo.findIndex((isVideo) => !isVideo);
  if (firstImage === -1) {
    return {
      title: `${keyboard.name} - ${user.displayName} | MechBuilds`,
      description: `Check out the ${keyboard.name} build by ${user.displayName} on MechBuilds! MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts. It was created to help users organize their keyboard builds and share them with the community.`,
      openGraph: {
        title: `${keyboard.name} - ${user.username} | MechBuilds`,
        description: `Check out the ${keyboard.name} build by ${user.displayName} on MechBuilds! MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts. It was created to help users organize their keyboard builds and share them with the community.`,
        url: `https://www.mechbuilds.app/${params.username}/${params.keyboardName}`,
        type: "website",
        siteName: "MechBuilds",
      },
    };
  } else {
    return {
      title: `${keyboard.name} - ${user.displayName} | MechBuilds`,
      description: `Check out the ${keyboard.name} build by ${user.displayName} on MechBuilds!`,
      openGraph: {
        title: `${keyboard.name} - ${user.displayName} | MechBuilds`,
        description: `Check out the ${keyboard.name} build by ${user.displayName} on MechBuilds! MechBuilds is a keyboard management app for custom mechanical keyboard enthusiasts. It was created to help users organize their keyboard builds and share them with the community.`,
        url: `https://www.mechbuilds.app/${params.username}/${params.keyboardName}`,
        type: "website",
        siteName: "MechBuilds",
        images: [
          {
            url: keyboard.media[firstImage],
            width: 1920,
            height: 1080,
            alt: `${keyboard.name} - ${user.displayName} | MechBuilds`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  }
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
