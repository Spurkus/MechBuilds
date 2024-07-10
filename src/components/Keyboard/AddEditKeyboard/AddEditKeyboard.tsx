"use client";
import Loading from "@/src/components/Loading";
import { AddEditKeyboardContextProvider, useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { showModal } from "@/src/helper/helperFunctions";
import { useMemo } from "react";
import ScreenOne from "./Screens/ScreenOne";
import ScreenTwo from "./Screens/ScreenTwo";
import ScreenThree from "./Screens/ScreenThree";
import ScreenFour from "./Screens/ScreenFour";
import { KeyboardType } from "@/src/types/keyboard";
import { useAddEditKeyboardSelectContext } from "@/src/context/AddEditKeyboardSelectContext";

interface AddEditKeyboardModalProps {
  open: boolean;
  setAddEditKeyboard: (value: boolean) => void;
  edit?: KeyboardType;
  setEdit: (value: KeyboardType | undefined) => void;
}

interface EditKeyboardButtonProps {
  hover: boolean;
  edit: KeyboardType;
}

export const EditKeyboardButton = ({ hover, edit }: EditKeyboardButtonProps) => {
  const { setAddEditKeyboardModalOpen, setEdit } = useAddEditKeyboardSelectContext();
  const handleClick = () => {
    setEdit(edit);
    showModal("addeditkeyboardmodal");
    setAddEditKeyboardModalOpen(true);
  };
  return (
    <button className={`btn btn-outline btn-info btn-xs self-end pb-6 ${!hover && "hidden"}`} onClick={handleClick}>
      <span className="mt-1.5">Edit Keyboard</span>
    </button>
  );
};

export const AddKeyboardButton = () => {
  const { setAddEditKeyboardModalOpen, setEdit } = useAddEditKeyboardSelectContext();
  const handleClick = () => {
    setEdit(undefined);
    showModal("addeditkeyboardmodal");
    setAddEditKeyboardModalOpen(true);
  };
  return (
    <button
      className="btn btn-outline btn-info btn-sm mr-2 self-center rounded-xl px-5 pb-10 text-base"
      onClick={handleClick}
    >
      <span className="mt-2">Add Keyboard</span>
    </button>
  );
};

const AddEditKeyboardForm = () => {
  const {
    loading,
    screen,
    setScreen,
    validScreenOne,
    validScreenTwo,
    validScreenThree,
    isSavable,
    handleCancel,
    handleSave,
  } = useAddEditKeyboardContext();

  const canIncrement = useMemo(() => {
    return screen === 1 ? validScreenOne : screen === 2 ? validScreenTwo : validScreenThree;
  }, [screen, validScreenOne, validScreenTwo, validScreenThree]);

  // Button click handling
  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCancel();
  };

  const handleSaveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSave();
  };

  const incrementScreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!canIncrement) return;
    setScreen(screen + 1);
  };

  const decrementScreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setScreen(screen - 1);
  };

  if (loading)
    return (
      <div className="mb-2 flex h-48 w-full flex-grow flex-col">
        <h2 className="text-center font-clashgrotesk text-5xl font-medium">Publishing Keyboard</h2>
        <div className="flex h-full w-full justify-center">
          <Loading height={60} width={60} />
        </div>
      </div>
    );

  return (
    <div className="flex grow flex-col items-center pt-2">
      <h2 className="text-center font-clashgrotesk text-2xl font-medium">Add Keyboard</h2>
      <ul className="steps text-sm font-medium">
        <li className="step step-success">Name and Imagery</li>
        <li className={`step ${screen >= 2 && "step-success"}`}>Kit Details</li>
        <li className={`step ${screen >= 3 && "step-success"}`}>Components</li>
        <li className={`step ${screen >= 4 && "step-success"}`}>Mods and Extra</li>
      </ul>
      <div className="form-control h-[23rem] w-full space-y-2 px-6 pb-2">
        {screen === 1 && <ScreenOne />}
        {screen === 2 && <ScreenTwo />}
        {screen === 3 && <ScreenThree />}
        {screen === 4 && <ScreenFour />}
      </div>
      <form method="dialog" className="flex w-full grow flex-row justify-between px-24 py-2">
        {screen === 1 ? (
          <button className="btn btn-neutral btn-sm" onClick={handleCancelButton}>
            cancel
          </button>
        ) : (
          <button className="btn btn-neutral btn-sm" onClick={decrementScreen}>
            prev page
          </button>
        )}
        {screen === 4 ? (
          <button className={`btn btn-success btn-sm ${!isSavable && "btn-disabled"}`} onClick={handleSaveButton}>
            publish keyboard
          </button>
        ) : (
          <button className={`btn btn-success btn-sm ${!canIncrement && "btn-disabled"}`} onClick={incrementScreen}>
            next page
          </button>
        )}
      </form>
    </div>
  );
};

export const AddEditKeyboardModal = ({ open, setAddEditKeyboard, edit, setEdit }: AddEditKeyboardModalProps) => {
  const toggleAddEditKeyboard = () => setAddEditKeyboard(!open);
  return (
    <dialog id="addeditkeyboardmodal" className="modal modal-middle" open={open}>
      <div className="modal-box flex w-[36rem] max-w-none flex-col bg-base-200 pb-4 pt-4">
        <AddEditKeyboardContextProvider
          toggleAddEditKeyboard={toggleAddEditKeyboard}
          open={open}
          edit={edit}
          setEdit={setEdit}
        >
          <AddEditKeyboardForm />
        </AddEditKeyboardContextProvider>
      </div>
    </dialog>
  );
};
