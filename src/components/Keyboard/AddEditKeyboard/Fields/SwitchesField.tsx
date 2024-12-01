import { InputNameLinkField } from "./InputFields";
import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ItemType } from "@/src/types/keyboard";

interface SwitchFieldProps {
  switchItem: ItemType;
  index: number;
}

const SwitchField = ({ switchItem, index }: SwitchFieldProps) => {
  const {
    switchesSelectedLink,
    toggleSwitchesSelectedLink,
    validSwitchesMap,
    updateSwitches,
    removeSwitch,
    oneSwitch,
  } = useAddEditKeyboardContext();
  // Change the name and link of the switch
  const nameChange = (newName: string) => updateSwitches(index, { name: newName, link: switchItem.link });
  const linkChange = (newLink: string) => updateSwitches(index, { name: switchItem.name, link: newLink });

  return (
    <div className="w-full min-w-24 grow rounded-xl px-2 pb-1 hover:bg-base-300">
      <div className="flex flex-row items-end justify-between">
        <label className="label justify-normal pb-0 pt-1 text-sm font-bold">
          <span className="mr-1 text-gray-500">{index + 1}</span>
          {switchesSelectedLink[index] ? "Link (optional)" : "Switch Name"}
        </label>
        <button
          className={`btn btn-outline btn-error btn-xs mr-0.5 max-h-4 min-h-0 w-7 self-center ${oneSwitch && "btn-disabled"}`}
          onClick={() => removeSwitch(index)}
        >
          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
        </button>
      </div>
      <InputNameLinkField
        type={`switch${index}`}
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
  const { switches, maxSwitches, addNewSwitch } = useAddEditKeyboardContext();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end justify-between">
        <label className="label pb-0 text-xl font-bold">Switches</label>
        <button
          className={`btn btn-outline btn-neutral btn-xs pb-6 ${maxSwitches && "btn-disabled"}`}
          disabled={maxSwitches}
          onClick={addNewSwitch}
        >
          <span className="mt-1.5">add more switch</span>
        </button>
      </div>
      <div className="my-1.5 flex w-full grow flex-col sm:flex-row sm:justify-between">
        {switches.map((switchItem, index) => (
          <SwitchField key={index} switchItem={switchItem} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SwitchesField;
