"use client";
import { useState, useEffect, Fragment } from "react";
import { getAllKeyboardsFromUser } from "@/src/helper/firestoreFunctions";
import { useAuthContext } from "@/src/context/Authentication";
import { KeyboardType, DisplayKeyboardType } from "@/src/types/keyboard";
import { UserProfileType } from "@/src/types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import SealSpinning from "@/src/public/images/Seal Spinning.gif";
import Loading from "@/src/components/Loading";
import DisplayKeyboard from "@/src/components/Keyboard/DisplayKeyboard/DisplayKeyboard";

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

  if (!keyboards.length)
    return (
      <div className="flex w-full flex-col space-y-3">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="flex flex-wrap text-3xl">
              {propUserProfile ? (
                <>
                  <span className="mr-2 max-w-[40rem] truncate">{userProfile.displayName}</span>
                  has no keyboards to be shown!
                </>
              ) : (
                "You have no keyboards!"
              )}
            </h1>
            {!propUserProfile && (
              <h1 className="text-lg">
                Start by publishing a keyboard using the <span className="font-bold">Add Keyboard</span> button
              </h1>
            )}
          </div>
          {!propUserProfile && (
            <motion.div
              animate={{ y: ["-9%", "15%", "-9%"] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <FontAwesomeIcon icon={faChevronUp} size="5x" className="pr-4" />
            </motion.div>
          )}
        </div>
        <Image src={SealSpinning} alt="Seal Spinning" className="w-[90%] self-center rounded-[1.75rem]" />
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
