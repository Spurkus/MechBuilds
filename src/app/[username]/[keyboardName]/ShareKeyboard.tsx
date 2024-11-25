"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faShare, faImage, faStar } from "@fortawesome/free-solid-svg-icons";
import { ItemType, KeyboardType } from "@/src/types/keyboard";
import { capitalizeFirstLetter, formatDate } from "@/src/helper/helperFunctions";

type ToastType = "link" | "image" | "text";

interface ShareKeyboardProps {
  username: string;
  keyboard: KeyboardType;
}

const ShareKeyboard = ({ username, keyboard }: ShareKeyboardProps) => {
  const [toastMessages, setToastMessages] = useState<ToastType[]>([]);

  const handleToast = (message: ToastType) => {
    setToastMessages((prevMessages) => [...prevMessages, message]);
    setTimeout(() => {
      setToastMessages((prevMessages) => prevMessages.slice(1));
    }, 3000);
  };

  const handleLink = () => {
    handleToast("link");
    navigator.clipboard.writeText(window.location.href);
  };

  const handleText = () => {
    handleToast("text");
    const textLines = [
      `**${username} - ${keyboard.name}**`,
      keyboard.description ? keyboard.description : "",
      `Kit Name: ${keyboard.kitName}`,
      keyboard.kit ? `Kit: [${keyboard.kit.map((kitItem: string) => capitalizeFirstLetter(kitItem)).join(", ")}]` : "",
      keyboard.case && !keyboard.kit.includes("case") ? `Case: ${keyboard.case}` : "",
      keyboard.pcb && !keyboard.kit.includes("pcb") ? `PCB: ${keyboard.pcb}` : "",
      keyboard.plate && !keyboard.kit.includes("plate") ? `Plate: ${keyboard.plate}` : "",
      keyboard.size ? `Size: ${keyboard.size}` : "",
      keyboard.switches && keyboard.switches.length > 0
        ? `Switches: [${keyboard.switches.map((switches: ItemType) => switches.name).join(", ")}]`
        : "",
      keyboard.stabilizers && keyboard.stabilizers.length > 0
        ? `Stabilizers: [${keyboard.stabilizers.map((stabilizers: ItemType) => stabilizers.name).join(", ")}]`
        : "",
      keyboard.keycaps && keyboard.keycaps.length > 0
        ? `Keycaps: [${keyboard.keycaps.map((keycaps: ItemType) => keycaps.name).join(", ")}]`
        : "",
      keyboard.mods && keyboard.mods.length > 0 ? `Mods: [${keyboard.mods.join(", ")}]` : "",
      `Created At: ${formatDate(keyboard.createdAt)}`,
    ].filter((line) => line);
    textLines.push(`\nMechBuilds Link: ${window.location.href}`);

    const longestLineLength = Math.max(...textLines.map((line) => line.length));
    const dashedLine = "-".repeat(longestLineLength + 5);
    const text = [dashedLine, ...textLines, dashedLine].join("\n");

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex grow flex-col justify-between rounded-2xl bg-base-300 p-3">
      <div className="toast toast-end">
        {toastMessages.map((message, index) => (
          <div key={index} className="alert alert-info font-bold transition-opacity ease-in-out">
            {message === "link" && (
              <>
                Link copied to clipboard
                <FontAwesomeIcon icon={faLink} />
              </>
            )}
            {message === "text" && (
              <>
                Text copied to clipboard
                <FontAwesomeIcon icon={faStar} />
              </>
            )}
          </div>
        ))}
      </div>
      <label className="ml-2 flex flex-row items-center gap-x-3">
        <h3 className="text-3xl font-bold">Share keyboard</h3>
        <FontAwesomeIcon icon={faShare} size="xl" />
      </label>
      <div className="flex w-full flex-row justify-between gap-x-2">
        <button className="btn btn-outline btn-sm grow text-lg font-medium" onClick={handleLink}>
          Link <FontAwesomeIcon icon={faLink} />
        </button>
        <button className="btn btn-outline btn-sm grow text-lg font-medium">
          Image
          <FontAwesomeIcon icon={faImage} />
        </button>
        <button className="btn btn-outline btn-sm grow text-lg font-medium" onClick={handleText}>
          Text <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </div>
  );
};

export default ShareKeyboard;
