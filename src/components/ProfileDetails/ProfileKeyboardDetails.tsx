import { UserProfileType } from "@/src/types/user";
import { adjustImageURL } from "@/src/helper/helperFunctions";
import Image from "next/image";
import { DEFAULT_IMAGE_SIZE } from "@/src/constants";
import Link from "next/link";

interface ProfileProps {
  userProfile: UserProfileType;
}

const ProfileKeyboardDetails = ({ userProfile }: ProfileProps) => {
  return (
    <div className="btn h-[6.5rem] w-fit rounded-2xl border-0 bg-base-300 p-3 hover:bg-base-200">
      <Link href={`/${userProfile.username}`} className="flex flex-row">
        <Image
          src={adjustImageURL(userProfile.profilePicture, 300)}
          alt="profile picture"
          width={DEFAULT_IMAGE_SIZE}
          height={DEFAULT_IMAGE_SIZE}
          quality={100}
          className="ml-0.5 aspect-square h-20 w-20 self-center rounded-xl"
        />
        <div className="mx-3 flex flex-col self-center">
          <h2 className="text-[2rem] font-bold leading-8">{userProfile.displayName}</h2>
          <h3 className="self-start text-[1.5rem] leading-6 text-gray-500">{userProfile.username}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ProfileKeyboardDetails;
