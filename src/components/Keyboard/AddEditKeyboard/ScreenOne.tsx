import React, { useState } from "react";
import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
} from "@/src/constants";
import NextImage from "next/image";
import { InputNameField } from "./InputFields";
import SubmitImagesVideo from "../../SubmitImagesVideo";

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
  return <SubmitImagesVideo />;
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
