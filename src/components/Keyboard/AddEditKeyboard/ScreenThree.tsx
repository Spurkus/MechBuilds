import { useMemo, useState } from "react";
import { InputNameLinkField } from "./InputFields";
import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ItemType } from "@/src/types/keyboard";

interface SwitchFieldProps {
  switchItem: ItemType;
  index: number;
  oneSwitch: boolean;
  maxSwitches: boolean;
}

const SwitchField = ({ switchItem, index, oneSwitch, maxSwitches }: SwitchFieldProps) => {
  const {
    switchesSelectedLink,
    toggleSwitchesSelectedLink,
    validSwitchesMap,
    updateSwitches,
    removeSwitches,
  } = useAddKeyboardContext();
  const [hover, setHover] = useState(false);

  // Change the name and link of the switch
  const nameChange = (newName: string) =>
    updateSwitches(index, { name: newName, link: switchItem.link });
  const linkChange = (newLink: string) =>
    updateSwitches(index, { name: switchItem.name, link: newLink });

  const handleRemoveSwitch = () => {
    if (oneSwitch) return;
    removeSwitches(index);
  };

  return (
    <div
      className="mt-1.5 w-full min-w-24 grow rounded-xl px-2 pb-3 hover:bg-base-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row items-end justify-between">
        <label className="label justify-normal pb-0 pt-1 text-sm font-bold">
          <span className="mr-1 text-gray-500">{index + 1}</span>Switch{" "}
          {switchesSelectedLink[index] ? "Link" + (maxSwitches ? "" : " (Optional)") : "Name"}
        </label>
        <button
          className={`btn btn-outline btn-error btn-xs mr-0.5 max-h-4 min-h-0 w-7 self-center ${oneSwitch && "btn-disabled"} ${!hover && "hidden"}`}
          onClick={handleRemoveSwitch}
        >
          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
        </button>
      </div>
      <InputNameLinkField
        type={`switches${index}`}
        selectedLink={switchesSelectedLink[index]}
        toggleSelectedLink={() => toggleSwitchesSelectedLink(index)}
        name={switchItem.name}
        setName={nameChange}
        namePlaceholder="Gateron Black Ink V2"
        nameMaxLength={50}
        validName={validSwitchesMap[index].name === true}
        link={switchItem.link ? switchItem.link : ""}
        setLink={linkChange}
        validLink={validSwitchesMap[index].link ? validSwitchesMap[index].link === true : false}
        noInput={false}
        fieldSelect={false}
      />
    </div>
  );
};

const SwitchesField = () => {
  const { switches, addNewSwitch } = useAddKeyboardContext();

  const oneSwitch = useMemo(() => switches.length === 1, [switches]);
  const maxSwitches = useMemo(() => switches.length >= 3, [switches]);
  const handleAdd = () => {
    if (maxSwitches) return;
    addNewSwitch();
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end justify-between">
        <label className="label pb-0 text-xl font-bold">Keyboard Switches</label>
        <button
          className={`btn btn-outline btn-neutral btn-xs pb-6 ${maxSwitches && "btn-disabled"}`}
          disabled={maxSwitches}
          onClick={handleAdd}
        >
          <span className="mt-1.5">add switch</span>
        </button>
      </div>
      <div className="flex w-full grow flex-row justify-between">
        {switches.map((switchItem, index) => {
          return (
            <SwitchField
              key={index}
              switchItem={switchItem}
              index={index}
              oneSwitch={oneSwitch}
              maxSwitches={maxSwitches}
            />
          );
        })}
      </div>
    </div>
  );
};

const ScreenThree = () => {
  return (
    <>
      <SwitchesField />
    </>
  );
};

export default ScreenThree;
