import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { closeDropdown } from "@/src/helper/helperFunctions";
import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { CheckBoxField, InputNameLinkField } from "./InputFields";

const KitCheckBoxField = () => {
  const {
    kitCase,
    setKitCase,
    kitPcb,
    setKitPcb,
    kitPlate,
    setKitPlate,
    kitStabilizers,
    setKitStabilizers,
    kitKeycaps,
    setKitKeycaps,
  } = useAddEditKeyboardContext();
  return (
    <div>
      <label className="label py-0">Click to select what is included in kit</label>
      <div className="flex flex-wrap justify-center gap-x-2 py-0.5 sm:justify-between">
        <CheckBoxField name="Case" checked={kitCase} setChecked={setKitCase} />
        <CheckBoxField name="PCB" checked={kitPcb} setChecked={setKitPcb} />
        <CheckBoxField name="Plate" checked={kitPlate} setChecked={setKitPlate} />
        <CheckBoxField name="Stabilizers" checked={kitStabilizers} setChecked={setKitStabilizers} />
        <CheckBoxField name="Keycaps" checked={kitKeycaps} setChecked={setKitKeycaps} />
      </div>
    </div>
  );
};

const KitDropdownField = () => {
  const { kitSelected, setKitSelected } = useAddEditKeyboardContext();
  const kitInitial = kitSelected === null;
  const kitMenuMessage = kitInitial
    ? "Do you have a Keyboard Kit?"
    : kitSelected
      ? "Keyboard Kit Selected"
      : "No Keyboard Kit";

  // Dropdown functions
  const kitSelectYes = () => {
    setKitSelected(true);
    closeDropdown();
  };
  const kitSelectNo = () => {
    setKitSelected(false);
    closeDropdown();
  };

  return (
    <div id="dropdown-kit" className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm flex w-full grow flex-col items-center rounded-lg border border-gray-400 pl-2.5 text-sm hover:border-white focus:border-white"
      >
        <p className="self-start">{kitMenuMessage}</p>
        <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4 self-end" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[3] mt-2 w-full rounded-xl border border-white bg-base-100 p-[0.3rem] shadow"
      >
        <li onClick={kitSelectYes}>
          <a className="w-full justify-center font-bold">yes</a>
        </li>
        <li onClick={kitSelectNo}>
          <a className="w-full justify-center font-bold">no</a>
        </li>
      </ul>
    </div>
  );
};

const KitField = () => {
  const {
    kitName,
    setKitName,
    validKitName,
    kitLink,
    setKitLink,
    validKitLink,
    kitSelectedLink,
    setKitSelectedLink,
    kitSelected,
  } = useAddEditKeyboardContext();
  const kitInitial = kitSelected === null;
  const kitNoInput = !kitSelected || kitInitial;
  return (
    <>
      <div className="flex flex-col gap-x-2 sm:flex-row">
        <div className={`flex flex-col ${kitSelected && "sm:w-[47.5%]"} w-full`}>
          <label className="label pb-0 font-bold">Keyboard Kit</label>
          <KitDropdownField />
        </div>
        {kitSelected && (
          <div className="flex grow flex-col">
            <label className="label pb-0 font-bold">Kit {kitSelectedLink ? "Link (Optional)" : "Name"}</label>
            <InputNameLinkField
              type="kit"
              selectedLink={kitSelectedLink}
              setSelectedLink={setKitSelectedLink}
              name={kitName}
              setName={setKitName}
              namePlaceholder="Chosfox CF81"
              nameMaxLength={50}
              validName={validKitName}
              link={kitLink}
              setLink={setKitLink}
              validLink={validKitLink}
              noInput={kitNoInput}
              fieldSelect={false}
            />
          </div>
        )}
      </div>
      {kitSelected && <KitCheckBoxField />}
    </>
  );
};

export default KitField;
