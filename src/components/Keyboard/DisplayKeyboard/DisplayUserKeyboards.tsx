"use client";
import { useState, useEffect, Fragment } from "react";
import Loading from "@/src/components/Loading";
import { getAllKeyboardsFromUser } from "@/src/helper/firestoreFunctions";
import { useAuthContext } from "@/src/context/Authentication";
import { KeyboardType, DisplayKeyboardType } from "@/src/types/keyboard";
import DisplayKeyboard from "@/src/components/Keyboard/DisplayKeyboard/DisplayKeyboard";
import { UserProfileType } from "@/src/types/user";

interface DisplayUserKeyboardsProps {
  userProfile?: UserProfileType;
  visibility?: DisplayKeyboardType;
}

const DisplayUserKeyboards = ({
  userProfile: propUserProfile,
  visibility = "UserProfile",
}: DisplayUserKeyboardsProps) => {
  const { userProfile: contextUserProfile } = useAuthContext();
  const userProfile = propUserProfile || contextUserProfile;

  const [loading, setLoading] = useState(true);
  const [keyboards, setKeyboards] = useState<KeyboardType[]>([]);

  useEffect(() => {
    if (userProfile) {
      getAllKeyboardsFromUser(userProfile.uid, visibility === "ViewUserProfile").then((keyboardList) => {
        setKeyboards(keyboardList);
        setLoading(false);
      });
    }
  }, [userProfile, visibility]);

  if (!userProfile || loading)
    return (
      <div className="flex h-[80%] w-full items-center justify-center">
        <Loading height={70} width={70} />
      </div>
    );

  return (
    <div className="flex w-full grow flex-col items-center space-y-1">
      {keyboards.map((keyboard, index) => (
        <Fragment key={index}>
          <DisplayKeyboard keyboard={keyboard} type={visibility} />
          {index < keyboards.length - 1 && <hr className="w-[90%] border-t border-gray-700" />}
        </Fragment>
      ))}
    </div>
  );
};

export default DisplayUserKeyboards;
