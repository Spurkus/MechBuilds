"use client";
import { useState, useEffect } from "react";
import { UserProfileType } from "@/src/types/user";
import Loading from "@/src/components/General/Loading";
import { getUser } from "@/src/helper/firestoreFunctions";
import NotFound from "@/src/app/not-found";
import ProfileDetails from "@/src/components/ProfileDetails/ProfileDetails";
import DisplayUserKeyboards from "@/src/components/Keyboard/DisplayKeyboard/DisplayUserKeyboards";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = ({ params }: UserPageProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfileType | null>(null);

  useEffect(() => {
    getUser(params.username).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [params.username]);

  if (loading)
    return (
      <div className="flex w-full items-center justify-center">
        <Loading />
      </div>
    );

  if (!user) return <NotFound />;

  return (
    <>
      <div className="p-2 sm:w-[20rem]">
        <ProfileDetails userDetails={user} />
      </div>
      <div className="space-y-2 sm:w-[40rem]">
        <div className="mt-2 flex justify-between">
          <h1 className="font-regular font-clashgrotesk text-5xl">Profile of {user.displayName}</h1>
        </div>
        <hr className="border-t border-gray-700" />
        <DisplayUserKeyboards userProfile={user} visibility="ViewUserProfile" />
      </div>
    </>
  );
};

export default UserPage;
