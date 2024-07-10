import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { InputNameLoadingField } from "./InputFields";

const NameField = () => {
  const { name, setName, validName, nameLoading } = useAddEditKeyboardContext();
  const nameChange = (e: any) => setName(e.target.value);
  return (
    <div className="flex flex-col">
      <label className="label pb-0 font-bold">Keyboard Name</label>
      <InputNameLoadingField
        type="keyboard"
        name={name}
        nameLoading={nameLoading}
        namePlaceholder="Rainy 75"
        nameMaxLength={50}
        nameChange={nameChange}
        validName={validName}
        noInput={false}
      />
    </div>
  );
};

export default NameField;
