"use client";
import { useState, useEffect } from "react";
import { UserProfileType } from "@/src/types/user";
import { KeyboardType } from "@/src/types/keyboard";
import Loading from "@/src/components/Loading";
import { getUser, getKeyboard } from "@/src/helper/firestoreFunctions";
import { formatNameForURL } from "@/src/helper/helperFunctions";
import NotFound from "@/src/app/not-found";
import { useAuthContext } from "@/src/context/Authentication";
import DisplayImageVideo from "@/src/components/DisplayImageVideo";
import ProfileKeyboardDetails from "@/src/components/ProfileDetails/ProfileKeyboardDetails";

interface KeyboardPageProps {
  params: {
    username: string;
    keyboardName: string;
  };
}

const KeyboardPage = ({ params }: KeyboardPageProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [keyboard, setKeyboard] = useState<KeyboardType | null>(null);
  const [index, setIndex] = useState(0);
  const { username } = useAuthContext();

  useEffect(() => {
    getUser(params.username).then((user) => {
      setUser(user);
      if (!user) return setLoading(false);
      if (!username) return setLoading(false);
      getKeyboard(user.uid, formatNameForURL(params.keyboardName), username !== params.username.toLowerCase()).then(
        (keyboard) => {
          setLoading(false);
          setKeyboard(keyboard);
        },
      );
    });
  }, [params.keyboardName, params.username, username]);

  if (loading)
    return (
      <div className="flex w-full items-center justify-center">
        <Loading />
      </div>
    );

  if (!user || !keyboard) return <NotFound />;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex w-[45rem] flex-row justify-between gap-3">
        <ProfileKeyboardDetails userProfile={user} />
        <div className="flex grow rounded-2xl bg-base-300 p-3">
          <span className="ml-1 self-center text-4xl font-medium">Views and Likes or something</span>
        </div>
      </div>
      <div className="flex w-[45rem] flex-col rounded-[1.5rem] bg-base-300 px-5 py-4">
        <DisplayImageVideo
          index={index}
          setIndex={setIndex}
          imageVideoList={keyboard.media}
          isMediaVideo={keyboard.isMediaVideo}
        />
        <h1 className="font-regular truncate pt-1 font-clashgrotesk text-6xl">{keyboard.name}</h1>
      </div>
    </div>
  );
};

export default KeyboardPage;
