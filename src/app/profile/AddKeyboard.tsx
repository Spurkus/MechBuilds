"use client";
import Loading from "@/src/components/Loading";
import NextImage from "next/image";
import {
  AddKeyboardContextProvider,
  useAddKeyboardContext,
} from "@/src/context/AddKeyboardContext";
import {
  closeModal,
  showModal,
  closeDropdown,
  formatSocialLink,
} from "@/src/helper/helperFunctions";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
  KEYBOARD_PLATES,
  KEYBOARD_SIZES,
} from "@/src/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLink } from "@fortawesome/free-solid-svg-icons";
import { useGlobalThemeContext } from "@/src/context/GlobalTheme";

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

const CheckBoxField = ({
  name,
  checked,
  setChecked,
}: {
  name: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { kitSelected } = useAddKeyboardContext();
  const { theme } = useGlobalThemeContext();
  const isLight = theme === "light";
  const kitNoInput = !kitSelected || kitSelected === null;
  const toggleChecked = () => {
    if (kitNoInput) return;
    setChecked(!checked);
  };

  useEffect(() => {
    setChecked(false);
  }, [kitSelected, setChecked]);

  return (
    <div className="flex flex-row justify-between space-x-1.5 pb-1">
      <button
        className={`btn ${isLight ? "btn-active" : "btn-neutral"} ${kitNoInput && "btn-disabled"} btn-sm gap-1.5 px-2.5`}
        onClick={toggleChecked}
        disabled={kitNoInput}
      >
        <span>{name}</span>
        <input
          type="checkbox"
          checked={checked}
          onClick={toggleChecked}
          className="checkbox checkbox-sm"
        />
      </button>
    </div>
  );
};

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
  console.log(kitCase);
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

const InputNameField = ({
  type,
  name,
  validName,
  namePlaceholder,
  nameMaxLength,
  noInput,
  nameChange,
}: {
  type: string;
  name: string;
  validName: boolean;
  namePlaceholder: string;
  nameMaxLength: number;
  noInput: boolean;
  nameChange: (e: any) => void;
}) => {
  return (
    <input
      type="text"
      placeholder={namePlaceholder}
      maxLength={nameMaxLength}
      className={`mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
        noInput && "input-disabled"
      } ${name && "font-medium"} ${validName || !name ? "bg-base-200" : "bg-input-error"}`}
      disabled={noInput}
      id={`${type}name`}
      autoComplete="off"
      onChange={nameChange}
      value={name}
    />
  );
};

const InputNameDropdownField = ({
  type,
  name,
  setName,
  validName,
  namePlaceholder,
  nameMaxLength,
  noInput,
  nameChange,
  dropdown = false,
  list = [],
}: {
  type: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  validName: boolean;
  namePlaceholder: string;
  nameMaxLength: number;
  noInput: boolean;
  nameChange: (e: any) => void;
  dropdown?: boolean;
  list?: string[];
}) => {
  const nameListChange = (nameList: string) => {
    if (noInput) return;
    setName(nameList);
    closeDropdown();
  };
  return (
    <div className="dropdown dropdown-end h-full w-full">
      <div tabIndex={0} role="button" className="flex h-full w-full grow flex-col">
        <InputNameField
          type={type}
          name={name}
          validName={validName}
          namePlaceholder={namePlaceholder}
          nameMaxLength={nameMaxLength}
          noInput={noInput}
          nameChange={nameChange}
        />
      </div>
      {dropdown && (
        <ul
          tabIndex={0}
          className={`${noInput && "hidden"} menu dropdown-content menu-sm z-[3] mr-1.5 mt-2 w-[98%] rounded-xl border border-white bg-base-100 p-[0.3rem] shadow`}
        >
          {list.map((nameList, index) => (
            <li key={index} onClick={() => nameListChange(nameList)}>
              <a className="w-full font-bold">{nameList}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const InputNameLinkField = ({
  type,
  selectedLink,
  setSelectedLink,
  name,
  setName,
  namePlaceholder,
  nameMaxLength,
  validName,
  link,
  setLink,
  validLink,
  noInput,
  fieldSelect,
  dropdown = false,
  list = [],
}: {
  type: string;
  selectedLink: boolean;
  setSelectedLink: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  namePlaceholder: string;
  nameMaxLength: number;
  validName: boolean;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  validLink: boolean;
  noInput: boolean;
  fieldSelect: boolean | null;
  dropdown?: boolean;
  list?: string[];
}) => {
  const { kitSelected, kitName } = useAddKeyboardContext();
  const [linkFocused, setLinkFocused] = useState(false);
  const buttonError = (selectedLink && !validName && name) || (!selectedLink && !validLink && link);

  // Preventing input when kit is not selected
  const selectLink = () => {
    if (noInput) return;
    setSelectedLink(!selectedLink);
  };
  const nameChange = (e: any) => {
    if (noInput) return;
    setName(e.target.value);
  };
  const linkChange = (e: any) => {
    if (noInput) return;
    setLink(e.target.value);
  };

  useEffect(() => {
    setSelectedLink(false);
  }, [fieldSelect, setSelectedLink]);

  useEffect(() => {
    if (kitSelected && fieldSelect) {
      setLink("");
      setName(kitName);
    } else if (!kitSelected) {
      setLink("");
      setName("");
    }
  }, [kitSelected, fieldSelect, setName, setLink, kitName]);

  return (
    <div className="flex flex-row">
      {selectedLink ? (
        <input
          type="text"
          placeholder="www.example.com"
          id={`${type}link`}
          maxLength={100}
          className={`mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
            noInput && "input-disabled"
          } ${validLink || !link ? "bg-base-200" : "bg-input-error"}`}
          disabled={noInput}
          autoComplete="off"
          onFocus={() => setLinkFocused(true)}
          onBlur={() => setLinkFocused(false)}
          onChange={linkChange}
          value={linkFocused ? link : formatSocialLink(link)}
        />
      ) : dropdown ? (
        <InputNameDropdownField
          type={type}
          name={name}
          setName={setName}
          validName={validName}
          namePlaceholder={namePlaceholder}
          nameMaxLength={nameMaxLength}
          noInput={noInput}
          nameChange={nameChange}
          dropdown={dropdown}
          list={list}
        />
      ) : (
        <InputNameField
          type={type}
          name={name}
          validName={validName}
          namePlaceholder={namePlaceholder}
          nameMaxLength={nameMaxLength}
          noInput={noInput}
          nameChange={nameChange}
        />
      )}
      <button
        className={`btn btn-square btn-outline btn-sm self-center rounded-lg ${buttonError && "text-error"} ${noInput && "input-disabled"} ${selectedLink ? "btn-active" : ""}`}
        disabled={noInput}
        onClick={selectLink}
      >
        <FontAwesomeIcon
          icon={faLink}
          className={`ml-[0.1rem] mt-[0.1rem] ${buttonError && "text-error"}`}
        />
      </button>
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
    setKitSelected,
  } = useAddKeyboardContext();
  const kitInitial = kitSelected === null;
  const kitMenuMessage = kitInitial
    ? "Do you have a Keyboard Kit?"
    : kitSelected
      ? "Keyboard Kit Selected"
      : "No Keyboard Kit";
  const kitNoInput = !kitSelected || kitInitial;

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
    <>
      <div className="flex flex-row">
        <div className="flex w-[47.5%] flex-col">
          <label className="label pb-0 font-bold">Keyboard Kit</label>
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

const ScreenTwo = () => {
  const {
    kitSelected,
    kitCase,
    caseName,
    setCaseName,
    validCaseName,
    caseLink,
    setCaseLink,
    validCaseLink,
    caseSelectedLink,
    setCaseSelectedLink,
    kitPcb,
    pcbName,
    setPcbName,
    validPcbName,
    pcbLink,
    setPcbLink,
    validPcbLink,
    pcbSelectedLink,
    setPcbSelectedLink,
    kitPlate,
    plateName,
    setPlateName,
    validPlateName,
    plateLink,
    setPlateLink,
    validPlateLink,
    plateSelectedLink,
    setPlateSelectedLink,
    size,
    setSize,
    validSize,
  } = useAddKeyboardContext();
  const kitInitial = kitSelected === null;

  return (
    <>
      <KitField />
      <hr className="border-t border-gray-700" />
      <div className="flex flex-row justify-between">
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
      </div>
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
    </>
  );
};

const ScreenOne = () => {
  const { name, setName, validName } = useAddKeyboardContext();
  const [isHovering, setIsHovering] = useState(false);
  const source = DEFAULT_KEYBOARD_IMAGE;
  return (
    <>
      <div className="flex flex-col">
        <label className="label pb-0 font-bold">Keyboard Name</label>
        <input
          type="text"
          placeholder="Rainy 75"
          maxLength={50}
          className={`rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
            validName || !name ? "bg-base-200" : "bg-input-error"
          }`}
          id="keyboardname"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div
        className="avatar mask flex w-full grow self-center py-1"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <label className="relative w-full grow cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {}} />
          <div
            className={`${isHovering ? "flex" : "hidden"} absolute inset-0 items-center justify-center rounded-[1.5rem] bg-black bg-opacity-60`}
          >
            <span className="text font-bold text-white">Add Image</span>
          </div>
          <NextImage
            src={source}
            alt="Profile"
            className="aspect-video rounded-[1.5rem]"
            width={DEFAULT_KEYBOARD_IMAGE_WIDTH}
            height={DEFAULT_KEYBOARD_IMAGE_HEIGHT}
            quality={100}
          />
        </label>
      </div>
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
        <div className="flex w-full grow flex-col">
          <h2 className="text-center font-clashgrotesk text-2xl font-medium">Add Keyboard</h2>
          <div className="w-full flex-grow flex-col">
            <AddKeyboardContextProvider>
              <AddKeyboardForm closeKeyboardModal={closeKeyboardModal} />
            </AddKeyboardContextProvider>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AddKeyboardButton;
