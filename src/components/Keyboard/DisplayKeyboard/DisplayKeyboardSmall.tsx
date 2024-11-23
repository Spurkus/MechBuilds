"use client";
import { useState } from "react";
import { ItemType, KeyboardType } from "@/src/types/keyboard";
import { formatDate, truncateString } from "@/src/helper/helperFunctions";
import { deleteKeyboard } from "@/src/helper/firestoreFunctions";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { EditKeyboardButton } from "@/src/components/Keyboard/AddEditKeyboard/AddEditKeyboard";
import DisplayImageVideo from "@/src/components/General/DisplayImageVideo";
import { DisplayKeyboardType } from "@/src/types/keyboard";
import Link from "next/link";

interface DisplayKeyboardProps {
  username: string;
  keyboard: KeyboardType;
  type?: DisplayKeyboardType;
}

const DisplayKeyboardSmall = ({ username, keyboard, type = "UserProfile" }: DisplayKeyboardProps) => {
  const { handleModal, toggleModal } = useGlobalModalContext();
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  const handleDelete = (id: string, mediaNumber: number) => {
    deleteKeyboard(id, mediaNumber);
    toggleModal();
  };

  const handleDeleteKeyboard = async (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string,
    id: string,
    mediaNumber: number,
  ) => {
    event.preventDefault();
    handleModal("Deleting Keyboard", `Are you sure you want to delete "${name}?"`, "error", [
      { text: "Delete", type: "error", onClick: () => handleDelete(id, mediaNumber) },
      { text: "Cancel", type: "neutral", onClick: toggleModal },
    ]);
  };

  return (
    <Link href={`/${username}/${keyboard.name}`} target="_blank" rel="noopener noreferrer">
      <div
        className="flex w-[15rem] grow flex-col rounded-[1.2rem] px-4 pb-2 hover:bg-base-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="mx-1 flex grow flex-row justify-between">
          <h2
            className={`z-40 self-end truncate font-clashgrotesk text-3xl font-medium leading-6 ${type === "UserProfile" ? "pt-7" : "pt-2"}`}
          >
            {keyboard.name}
          </h2>
          <div className="flex flex-col justify-end">
            {type === "UserProfile" && (
              <div className="flex grow justify-end space-x-1.5">
                <EditKeyboardButton text="Edit" hover={hover} edit={keyboard} onClick={(e) => e.preventDefault()} />
                <button
                  className={`btn btn-outline btn-error btn-xs self-end ${!hover && "hidden"}`}
                  onClick={(event) => handleDeleteKeyboard(event, keyboard.name, keyboard.id, keyboard.media.length)}
                >
                  <span>Delete</span>
                </button>
              </div>
            )}
            <span className="self-end text-base font-bold leading-5 text-gray-500">
              {formatDate(keyboard.createdAt)}
            </span>
          </div>
        </div>
        <DisplayImageVideo
          index={index}
          setIndex={setIndex}
          imageVideoList={keyboard.media}
          isMediaVideo={keyboard.isMediaVideo}
        />
        {keyboard.mods.length > 0 && (
          <div className="flex w-full flex-row truncate pb-[0.075rem] pt-1">
            <div className="flex grow flex-row space-x-2 overflow-x-auto overflow-y-hidden">
              {keyboard.mods.map((mod: string, index: number) => (
                <div key={index} className="badge badge-neutral badge-md space-x-1 py-2.5">
                  <span className="truncate font-bold">{mod}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default DisplayKeyboardSmall;
