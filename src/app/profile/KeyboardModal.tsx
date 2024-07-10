import { AddEditKeyboardModal } from "@/src/components/Keyboard/AddEditKeyboard/AddEditKeyboard";
import { useAddEditKeyboardSelectContext } from "@/src/context/AddEditKeyboardSelectContext";

const KeyboardModal = () => {
  const { addEditKeyboardModalOpen, setAddEditKeyboardModalOpen, edit, setEdit } = useAddEditKeyboardSelectContext();
  return (
    <AddEditKeyboardModal
      open={addEditKeyboardModalOpen}
      setAddEditKeyboard={setAddEditKeyboardModalOpen}
      edit={edit}
      setEdit={setEdit}
    />
  );
};

export default KeyboardModal;
