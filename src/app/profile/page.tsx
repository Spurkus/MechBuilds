"use client";
import { useRouter } from "next/navigation"; // Corrected import
import { useAuthContext } from "@/src/context/Authentication";
import ProfileDetails from "./ProfileDetails";
import Loading from "@/src/components/Loading";
import { useGlobalModalContext } from "@/src/context/GlobalModal";

const Profile = () => {
  const router = useRouter();
  const { authenticated } = useAuthContext();
  const { handleModal } = useGlobalModalContext();

  // Handles when user is not authenticated
  if (!authenticated) {
    router.push("/");
    handleModal("Authentication", "You need to be authenticated to view your profile", "error");
    return (
      <div className="flex w-full items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="flex w-full space-x-6">
        <div className="w-[28%] p-2">
          <ProfileDetails />
        </div>
        <div className="flex w-[72%] items-center justify-center text-center">
          <div className="flex h-full flex-grow flex-col space-y-3 rounded-[3rem] bg-base-300 p-6">
            <h1 className="font-regular text-center font-clashgrotesk text-6xl">Profile</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
