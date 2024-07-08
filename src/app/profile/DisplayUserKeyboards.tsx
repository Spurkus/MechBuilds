"use client";
import { useState, useEffect } from "react";
import Loading from "@/src/components/Loading";
import { getAllKeyboardsFromUser } from "@/src/helper/firestoreFunctions";
import { useAuthContext } from "@/src/context/Authentication";
import { KeyboardType } from "@/src/types/keyboard";
import DisplayKeyboard from "@/src/components/Keyboard/DisplayKeyboard/DisplayKeyboard";

const DisplayUserKeyboards = () => {
  const { userProfile } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [keyboards, setKeyboards] = useState<KeyboardType[]>([]);

  useEffect(() => {
    if (userProfile) {
      getAllKeyboardsFromUser(userProfile.uid).then((keyboardList) => {
        setKeyboards(keyboardList);
        setLoading(false);
      });
    }
  }, [userProfile]);

  // Handle loading
  if (!userProfile || loading)
    return (
      <div className="flex h-[80%] w-full items-center justify-center">
        <Loading height={70} width={70} />
      </div>
    );

  return (
    <div className="flex w-full grow flex-col items-center space-y-2">
      {keyboards.map((keyboard, index) => (
        <DisplayKeyboard key={index} keyboard={keyboard} />
      ))}
    </div>
  );
};

export default DisplayUserKeyboards;
