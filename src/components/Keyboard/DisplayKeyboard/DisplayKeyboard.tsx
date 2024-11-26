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

const DisplayKeyboard = ({ username, keyboard, type = "UserProfile" }: DisplayKeyboardProps) => {
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
        className="flex max-w-[40rem] grow flex-col rounded-[1.2rem] px-4 pb-1.5 hover:bg-base-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="mx-1 flex grow flex-row justify-between">
          <h2 className="z-40 self-end truncate pt-5 font-clashgrotesk text-4xl font-medium leading-8">
            {keyboard.name}
          </h2>
          <div className="flex flex-col justify-end">
            {type === "UserProfile" && (
              <div className="flex grow justify-end space-x-1.5">
                <EditKeyboardButton
                  className="pb-6"
                  textClassName="mt-1.5"
                  hover={hover}
                  edit={keyboard}
                  onClick={(e) => e.preventDefault()}
                />
                <button
                  className={`btn btn-outline btn-error btn-xs self-end pb-6 ${!hover && "hidden"}`}
                  onClick={(event) => handleDeleteKeyboard(event, keyboard.name, keyboard.id, keyboard.media.length)}
                >
                  <span className="mt-1.5">Delete</span>
                </button>
              </div>
            )}
            <span className="self-end text-lg font-bold leading-5 text-gray-500">{formatDate(keyboard.createdAt)}</span>
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
            <div className="flex w-0 grow flex-row space-x-2 overflow-x-auto overflow-y-hidden">
              {keyboard.mods.map((mod: string, index: number) => (
                <div key={index} className="badge badge-neutral badge-lg space-x-1 py-3">
                  <span className="mb-[0.1rem] truncate text-sm font-bold">{mod}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mx-1.5 flex grow flex-wrap justify-between gap-1 pt-2">
          {keyboard.kit.length === 0 ? (
            <div className="flex flex-col">
              <p className="font-bold leading-3">Case</p>
              <p>{truncateString(keyboard.case, 16)}</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="font-bold leading-3">Kit</p>
              <p>{truncateString(keyboard.kitName, 16)}</p>
            </div>
          )}
          <div className="flex flex-col">
            <p className="font-bold leading-3">Switches</p>
            <div className={`flex ${keyboard.switches.length > 2 ? "flex-col" : "flex-row gap-3"}`}>
              {keyboard.switches.map((switches: ItemType, index: number) => (
                <p key={index}>{truncateString(switches.name, 16)}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold leading-3">Keycaps</p>
            <div className={`flex ${keyboard.keycaps.length > 2 ? "flex-col" : "flex-row gap-3"}`}>
              {keyboard.keycaps.map((keycaps: ItemType, index: number) => {
                if (index === 0 && keyboard.kit.includes("keycaps")) return <p key={index}>Default</p>;
                return <p key={index}>{truncateString(keycaps.name, 16)}</p>;
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="self-end font-bold leading-3">Size</p>
            <p>{truncateString(keyboard.size, 16)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DisplayKeyboard;
