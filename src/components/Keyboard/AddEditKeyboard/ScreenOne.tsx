import React, { useState } from "react";
import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
} from "@/src/constants";
import NextImage from "next/image";
import { InputNameField } from "./InputFields";

const NameField = () => {
  const { name, setName, validName } = useAddKeyboardContext();
  const nameChange = (e: any) => setName(e.target.value);
  return (
    <div className="flex flex-col">
      <label className="label pb-0 font-bold">Keyboard Name</label>
      <InputNameField
        type="name"
        name={name}
        namePlaceholder="Rainy 75"
        nameMaxLength={50}
        validName={validName}
        noInput={false}
        nameChange={nameChange}
      />
    </div>
  );
};

const KeyboardContent = () => {
  const [isHovering, setIsHovering] = useState(false);
  const source = DEFAULT_KEYBOARD_IMAGE;

  return (
    <div
      className="avatar mask flex w-full grow self-center py-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <label className="relative w-full grow cursor-pointer">
        <input type="file" accept="image/*" className="hidden" onChange={(e) => {}} />
        <div
          className={`${isHovering ? "flex" : "hidden"} absolute inset-0 items-center justify-center rounded-[1.5rem] bg-black bg-opacity-60`}
        >
          <span className="text font-bold text-white">Add Image</span>
        </div>
        <NextImage
          src={source}
          alt="Profile"
          className="aspect-video rounded-[1.5rem]"
          width={DEFAULT_KEYBOARD_IMAGE_WIDTH}
          height={DEFAULT_KEYBOARD_IMAGE_HEIGHT}
          quality={100}
        />
      </label>
    </div>
  );
};

const ScreenOne = () => {
  return (
    <>
      <NameField />
      <KeyboardContent />
    </>
  );
};

export default ScreenOne;
