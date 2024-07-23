import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { InputNameLinkField } from "./InputFields";

const PcbField = () => {
  const {
    kitPcb,
    pcbName,
    setPcbName,
    validPcbName,
    pcbLink,
    setPcbLink,
    validPcbLink,
    pcbSelectedLink,
    setPcbSelectedLink,
    kitSelected,
  } = useAddEditKeyboardContext();
  const kitInitial = kitSelected === null;

  return (
    <div className="flex flex-col">
      <label className={`label pb-0 pt-0.5 font-bold ${kitPcb && "text-gray-500"}`}>
        PCB {pcbSelectedLink ? "Link (Optional)" : "Name"}
      </label>
      <InputNameLinkField
        type="pcb"
        selectedLink={pcbSelectedLink}
        setSelectedLink={setPcbSelectedLink}
        name={pcbName}
        setName={setPcbName}
        namePlaceholder="GH60"
        nameMaxLength={50}
        validName={validPcbName}
        link={pcbLink}
        setLink={setPcbLink}
        validLink={validPcbLink}
        noInput={kitInitial || kitPcb}
        fieldSelect={kitPcb}
      />
    </div>
  );
};

export default PcbField;
