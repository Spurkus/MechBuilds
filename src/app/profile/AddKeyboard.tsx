"use client";
import Loading from "@/src/components/Loading";
import NextImage from "next/image";
import {
  AddKeyboardContextProvider,
  useAddKeyboardContext,
} from "@/src/context/AddKeyboardContext";
import { closeModal, showModal } from "@/src/helper/helperFunctions";
import { useState } from "react";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
} from "@/src/constants";

interface AddKeyboardModalProps {
  open: boolean;
  setAddKeyboard: (value: boolean) => void;
}

interface AddKeyboardFormProps {
  closeKeyboardModal: () => void;
}

const AddKeyboardButton = () => {
  const [addKeyboard, setAddKeyboard] = useState(false);
  return (
    <>
      <button
        className="btn btn-outline btn-info btn-sm mr-2 self-center rounded-xl px-5 pb-10 text-base"
        onClick={() => showModal("addkeyboardmodal", () => setAddKeyboard(true))}
      >
        <span className="mt-2">Add Keyboard</span>
      </button>
      <AddKeyboardModal open={addKeyboard} setAddKeyboard={setAddKeyboard} />
    </>
  );
};

const ScreenTwo = () => {
  const {
    kitName,
    setKitName,
    validKitName,
    kit,
    setKit,
    validKit,
    kitLink,
    setKitLink,
    validKitLink,
  } = useAddKeyboardContext();

  return (
    <>
      <label className="label pb-0 font-bold">Keyboard Kit</label>
      <input
        type="text"
        placeholder="Chosfox CF81"
        maxLength={50}
        className={`grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
          validKitName || !kitName ? "bg-base-200" : "bg-input-error"
        }`}
        id="kitname"
        autoComplete="off"
        onChange={(e) => setKitName(e.target.value)}
        value={kitName}
      />
    </>
  );
};

const ScreenOne = () => {
  const { name, setName, validName } = useAddKeyboardContext();
  const [isHovering, setIsHovering] = useState(false);
  const source = DEFAULT_KEYBOARD_IMAGE;
  return (
    <>
      <label className="label pb-0 font-bold">Keyboard Name</label>
      <input
        type="text"
        placeholder="Rainy 75"
        maxLength={50}
        className={`grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
          validName || !name ? "bg-base-200" : "bg-input-error"
        }`}
        id="keyboardname"
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <div
        className="avatar mask flex w-full grow self-center py-3"
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
    </>
  );
};

const AddKeyboardForm = ({ closeKeyboardModal }: AddKeyboardFormProps) => {
  const { screen, setScreen } = useAddKeyboardContext();

  const incrementScreen = (e: any) => {
    e.preventDefault();
    setScreen(screen + 1);
  };

  const decrementScreen = (e: any) => {
    e.preventDefault();
    setScreen(screen - 1);
  };

  return (
    <div className="flex grow flex-col items-center pt-2">
      <ul className="steps text-sm">
        <li className="step step-success">Name and Imagery</li>
        <li className={`step ${screen >= 2 && "step-success"}`}>Information</li>
        <li className={`step ${screen >= 3 && "step-success"}`}>Mods and Extra</li>
      </ul>
      <div className="form-control h-[23rem] w-full px-6 pb-2">
        {screen === 1 && <ScreenOne />}
        {screen === 2 && <ScreenTwo />}
      </div>
      <form method="dialog" className="flex w-full grow flex-row justify-between px-24 pb-2">
        {screen === 1 ? (
          <button className="btn btn-neutral btn-sm" onClick={closeKeyboardModal}>
            cancel
          </button>
        ) : (
          <button className="btn btn-neutral btn-sm" onClick={decrementScreen}>
            prev page
          </button>
        )}
        {screen === 3 ? (
          <button className={`btn btn-success btn-sm`} onClick={incrementScreen}>
            save changes
          </button>
        ) : (
          <button className={`btn btn-success btn-sm`} onClick={incrementScreen}>
            next page
          </button>
        )}
      </form>
    </div>
  );
};

const AddKeyboardModal = ({ open, setAddKeyboard }: AddKeyboardModalProps) => {
  const closeKeyboardModal = () => closeModal("addkeyboardmodal", () => setAddKeyboard(false));
  return (
    <dialog id="addkeyboardmodal" className="modal modal-middle" open={open}>
      <div className="modal-box flex w-[36rem] max-w-none flex-col bg-base-200 pb-4 pt-4">
        <div className="flex w-full grow flex-col">
          <h2 className="text-center font-clashgrotesk text-2xl font-medium">Add Keyboard</h2>
          <div className="w-full flex-grow flex-col">
            <AddKeyboardContextProvider>
              <AddKeyboardForm closeKeyboardModal={closeKeyboardModal} />
            </AddKeyboardContextProvider>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AddKeyboardButton;
