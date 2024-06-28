"use client";
import {
  AddKeyboardContextProvider,
  useAddKeyboardContext,
} from "@/src/context/AddKeyboardContext";
import { closeModal, showModal } from "@/src/helper/helperFunctions";
import { useState } from "react";

interface AddKeyboardModal {
  open: boolean;
  setAddKeyboard: (value: boolean) => void;
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

const AddKeyboardForm = () => {
  const { name, setName, validName } = useAddKeyboardContext();
  return (
    <div className="form-control px-6">
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
    </div>
  );
};

const AddKeyboardModal = ({ open, setAddKeyboard }: AddKeyboardModal) => {
  return (
    <dialog id="addkeyboardmodal" className="modal modal-middle" open={open}>
      <div className="modal-box flex w-[36rem] max-w-none flex-col bg-base-200 pb-4 pt-4">
        <div className="flex w-full grow flex-col">
          <h2 className="text-center font-clashgrotesk text-2xl font-medium">Add Keyboard</h2>
          <div className="w-full flex-grow flex-col">
            <AddKeyboardContextProvider>
              <AddKeyboardForm />
            </AddKeyboardContextProvider>
          </div>
          <form method="dialog" className="flex grow flex-row justify-center space-x-8">
            <button
              className="btn btn-neutral btn-sm"
              onClick={() => closeModal("addkeyboardmodal", () => setAddKeyboard(false))}
            >
              cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddKeyboardButton;
