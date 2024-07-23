import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { KEYBOARD_PLATES } from "@/src/constants";
import { InputNameLinkField } from "./InputFields";

const PlateField = () => {
  const {
    kitPlate,
    plateName,
    setPlateName,
    validPlateName,
    plateLink,
    setPlateLink,
    validPlateLink,
    plateSelectedLink,
    setPlateSelectedLink,
    kitSelected,
  } = useAddEditKeyboardContext();
  const kitInitial = kitSelected === null;
  return (
    <div className="flex w-3/5 flex-col">
      <label className={`label pb-0 pt-0.5 font-bold ${kitPlate && "text-gray-500"}`}>
        Plate {plateSelectedLink ? "Link (Optional)" : "Name"}
      </label>
      <InputNameLinkField
        type="plate"
        selectedLink={plateSelectedLink}
        setSelectedLink={setPlateSelectedLink}
        name={plateName}
        setName={setPlateName}
        namePlaceholder="POM"
        nameMaxLength={50}
        validName={validPlateName}
        link={plateLink}
        setLink={setPlateLink}
        validLink={validPlateLink}
        noInput={kitInitial || kitPlate}
        dropdown={true}
        list={KEYBOARD_PLATES}
        fieldSelect={kitPlate}
      />
    </div>
  );
};

export default PlateField;
