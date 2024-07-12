"use client";
import { useState, useEffect } from "react";
import { UserProfileType } from "@/src/types/user";
import { KeyboardType } from "@/src/types/keyboard";
import Loading from "@/src/components/Loading";
import { getUser, getKeyboard } from "@/src/helper/firestoreFunctions";
import { formatNameForURL } from "@/src/helper/helperFunctions";
import NotFound from "@/src/app/not-found";
import { useAuthContext } from "@/src/context/Authentication";

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
    <div className="flex w-full justify-center">
      <div className="flex w-[45rem] flex-col">
        <h1 className="font-regular font-clashgrotesk text-6xl">{keyboard.name}</h1>
      </div>
    </div>
  );
};

export default KeyboardPage;
