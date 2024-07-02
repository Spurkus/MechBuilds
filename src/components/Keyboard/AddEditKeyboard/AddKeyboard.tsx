"use client";
import Loading from "@/src/components/Loading";
import {
  AddKeyboardContextProvider,
  useAddKeyboardContext,
} from "@/src/context/AddKeyboardContext";
import { closeModal, showModal, closeDropdown } from "@/src/helper/helperFunctions";
import { useMemo, useState } from "react";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";

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

const AddKeyboardForm = ({ closeKeyboardModal }: AddKeyboardFormProps) => {
  const { screen, setScreen, validScreenOne, validScreenTwo, validScreenThree } =
    useAddKeyboardContext();

  const canIncrement = useMemo(() => {
    return screen === 1 ? validScreenOne : screen === 2 ? validScreenTwo : validScreenThree;
  }, [screen, validScreenOne, validScreenTwo, validScreenThree]);

  const incrementScreen = (e: any) => {
    e.preventDefault();
    if (!canIncrement) return;
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
      <div className="form-control h-[23rem] w-full space-y-2 px-6 pb-2">
        {screen === 1 && <ScreenOne />}
        {screen === 2 && <ScreenTwo />}
      </div>
      <form method="dialog" className="flex w-full grow flex-row justify-between px-24 py-2">
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
          <button className={`btn btn-success btn-sm`} onClick={() => {}}>
            save changes
          </button>
        ) : (
          <button
            className={`btn btn-success btn-sm ${!canIncrement && "btn-disabled"}`}
            onClick={incrementScreen}
          >
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
        <h2 className="text-center font-clashgrotesk text-2xl font-medium">Add Keyboard</h2>
        <AddKeyboardContextProvider>
          <AddKeyboardForm closeKeyboardModal={closeKeyboardModal} />
        </AddKeyboardContextProvider>
      </div>
    </dialog>
  );
};

export default AddKeyboardButton;
