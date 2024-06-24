"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/src/context/Authentication";
import { useEffect } from "react";
import ProfileDetails from "@/src/components/ProfileDetails/ProfileDetails";
import Loading from "@/src/components/Loading";

const Profile = () => {
  const router = useRouter();
  const { authenticated } = useAuthContext();

  // Redirects to home if user is not authenticated
  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    // Loading screen when user is not authenticated
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
        <div className="w-[72%] p-2">
          <div className="mt-3 flex w-full justify-between">
            <h1 className="font-regular font-clashgrotesk text-5xl">Profile</h1>
            <button className="btn btn-outline btn-info btn-sm mr-2 self-center rounded-xl px-5 pb-10 text-base">
              <span className="mt-2">Add Keyboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
