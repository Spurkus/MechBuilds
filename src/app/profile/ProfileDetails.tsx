"use client";
import { useAuthContext } from "@/src/context/Authentication";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { adjustImageUrl } from "@/src/helper/helperFunctions";
import Image from "next/image";

const DEFAULT_IMAGE_SIZE = 350;

const ProfileLoading = () => {
  return (
    <div className="rounded-xl text-base">
      <div className="flex">
        <span className="loading loading-spinner h-12 w-12"></span>
      </div>
    </div>
  );
};

const ProfileDetails = () => {
  const { username, profilePicture, user } = useAuthContext();
  const { handleModalError } = useGlobalModalContext();

  const profile = profilePicture || user?.photoURL;
  const name = username || user?.displayName;

  if (!profile) {
    handleModalError("User is invalid");
    return <ProfileLoading />;
  }

  return (
    <div className="flex flex-grow flex-col space-y-3 rounded-[3rem] bg-base-300 p-6">
      <div className="avatar mask self-center">
        <Image
          src={adjustImageUrl(profile, 350)}
          alt="Profile"
          className="rounded-[3rem]"
          width={350}
          height={350}
          quality={100}
        />
      </div>
      <div>
        <h2 className="username text-left font-satoshi text-3xl font-bold">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default ProfileDetails;
