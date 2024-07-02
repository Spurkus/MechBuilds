import React, { use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import { CheckBoxField, InputNameDropdownField, InputNameLinkField } from "./InputFields";
import { closeDropdown } from "@/src/helper/helperFunctions";
import { KEYBOARD_SIZES, KEYBOARD_PLATES } from "@/src/constants";

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
  } = useAddKeyboardContext();
  return (
    <div className="flex flex-row justify-between space-x-1.5 py-0.5">
      <CheckBoxField name="Case" checked={kitCase} setChecked={setKitCase} />
      <CheckBoxField name="PCB" checked={kitPcb} setChecked={setKitPcb} />
      <CheckBoxField name="Plate" checked={kitPlate} setChecked={setKitPlate} />
      <CheckBoxField name="Stabilizers" checked={kitStabilizers} setChecked={setKitStabilizers} />
      <CheckBoxField name="Keycaps" checked={kitKeycaps} setChecked={setKitKeycaps} />
    </div>
  );
};

const KitDropdownField = () => {
  const { kitSelected, setKitSelected } = useAddKeyboardContext();
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
    <div className="dropdown dropdown-end">
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
  } = useAddKeyboardContext();
  const kitInitial = kitSelected === null;
  const kitNoInput = !kitSelected || kitInitial;
  return (
    <>
      <div className="flex flex-row">
        <div className="flex w-[47.5%] flex-col">
          <label className="label pb-0 font-bold">Keyboard Kit</label>
          <KitDropdownField />
        </div>
        <div className="flex grow flex-col">
          <label className="label ml-3 pb-0 font-bold">
            Kit {kitSelectedLink ? "Link (Optional)" : "Name"}
          </label>
          <div className="ml-3">
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
        </div>
      </div>
      <KitCheckBoxField />
    </>
  );
};

const SizeField = () => {
  const { size, setSize, validSize, kitSelected } = useAddKeyboardContext();
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
        dropdown={true}
        list={KEYBOARD_SIZES}
      />
    </div>
  );
};

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
  } = useAddKeyboardContext();
  const kitInitial = kitSelected === null;
  return (
    <div className="flex w-3/5 flex-col">
      <label className="label pb-0 pt-0.5 font-bold">
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

const CaseField = () => {
  const {
    kitCase,
    caseName,
    setCaseName,
    validCaseName,
    caseLink,
    setCaseLink,
    validCaseLink,
    caseSelectedLink,
    setCaseSelectedLink,
    kitSelected,
  } = useAddKeyboardContext();
  const kitInitial = kitSelected === null;
  return (
    <div className="flex flex-col">
      <label className="label pb-0 pt-0 font-bold">
        Case {caseSelectedLink ? "Link (Optional)" : "Name"}
      </label>
      <InputNameLinkField
        type="case"
        selectedLink={caseSelectedLink}
        setSelectedLink={setCaseSelectedLink}
        name={caseName}
        setName={setCaseName}
        namePlaceholder="KBDfans Tofu65"
        nameMaxLength={50}
        validName={validCaseName}
        link={caseLink}
        setLink={setCaseLink}
        validLink={validCaseLink}
        noInput={kitInitial || kitCase}
        fieldSelect={kitCase}
      />
    </div>
  );
};

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
  } = useAddKeyboardContext();
  const kitInitial = kitSelected === null;

  return (
    <div className="flex flex-col">
      <label className="label pb-0 pt-0.5 font-bold">
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

const ScreenTwo = () => {
  return (
    <>
      <KitField />
      <hr className="border-t border-gray-700" />
      <div className="flex flex-row justify-between">
        <SizeField />
        <PlateField />
      </div>
      <CaseField />
      <PcbField />
    </>
  );
};

export default ScreenTwo;
