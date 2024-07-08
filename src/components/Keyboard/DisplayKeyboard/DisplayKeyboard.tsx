import { useState } from "react";
import { ItemType, KeyboardType } from "@/src/types/keyboard";
import DisplayImageVideo from "../../DisplayImageVideo";
import { formatDate } from "@/src/helper/helperFunctions";

const DisplayKeyboard = ({ keyboard }: { keyboard: KeyboardType }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex w-[40rem] grow flex-col rounded-[1.2rem] px-4 py-3 hover:bg-base-300">
      <div className="mx-1 flex grow flex-row justify-between">
        <h2 className="font-clashgrotesk text-3xl font-medium">{keyboard.name}</h2>
        <span className="self-end text-lg font-bold text-gray-500">
          {formatDate(keyboard.createdAt)}
        </span>
      </div>
      <DisplayImageVideo
        index={index}
        setIndex={setIndex}
        imageVideoList={keyboard.media}
        isMediaVideo={keyboard.isMediaVideo}
      />
      {keyboard.mods.length > 0 && (
        <div className="flex w-full flex-row space-x-2 overflow-x-auto overflow-y-hidden pt-1.5">
          {keyboard.mods.map((mod: string, index: number) => (
            <div key={index} className="badge badge-neutral badge-lg space-x-1 py-3">
              <span className="mb-[0.1rem] truncate text-sm font-bold">{mod}</span>
            </div>
          ))}
        </div>
      )}
      <div className="mx-1.5 flex grow flex-row justify-between pt-2">
        {keyboard.kit.length === 0 ? (
          <div className="flex flex-col">
            <p className="font-bold leading-3 text-gray-300">Case</p>
            <p className="text-gray-300">{keyboard.case}</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="font-bold leading-3 text-gray-300">Kit</p>
            <p className="text-gray-300">{keyboard.kitName}</p>
          </div>
        )}
        <div className="flex flex-col">
          <p className="font-bold leading-3 text-gray-300">Switches</p>
          {keyboard.switches.map((switches: ItemType, index: number) => (
            <p key={index} className="text-gray-300">
              {switches.name}
            </p>
          ))}
        </div>
        <div className="flex flex-col">
          <p className="font-bold leading-3 text-gray-300">Keycaps</p>
          {keyboard.keycaps.map((keycaps: ItemType, index: number) => {
            if (index === 0 && keyboard.kit.includes("keycaps"))
              return (
                <p key={index} className="text-gray-300">
                  Default
                </p>
              );
            return (
              <p key={index} className="text-gray-300">
                {keycaps.name}
              </p>
            );
          })}
        </div>
        <div className="flex flex-col">
          <p className="self-end font-bold leading-3 text-gray-300">Size</p>
          <p className="text-gray-300">{keyboard.size}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayKeyboard;
