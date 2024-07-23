import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { KEYBOARD_SIZES } from "@/src/constants";
import { InputNameDropdownField } from "./InputFields";

const SizeField = () => {
  const { size, setSize, validSize, kitSelected } = useAddEditKeyboardContext();
  const kitInitial = kitSelected === null;
  return (
    <div className="flex w-2/5 flex-col">
      <label className="label pb-0 pt-0.5 font-bold">Size</label>
      <InputNameDropdownField
        type="size"
        name={size}
        setName={setSize}
        validName={validSize}
        namePlaceholder="80% (TKL)"
        nameMaxLength={20}
        noInput={kitInitial}
        nameChange={(e: any) => {
          if (kitInitial) return;
          setSize(e.target.value);
        }}
        list={KEYBOARD_SIZES}
      />
    </div>
  );
};

export default SizeField;
