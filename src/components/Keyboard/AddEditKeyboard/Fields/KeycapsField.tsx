import { useMemo, useState } from "react";
import { InputNameLinkField } from "./InputFields";
import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ItemType } from "@/src/types/keyboard";

interface KeycapFieldProps {
  keycap: ItemType;
  index: number;
}

const KeycapField = ({ keycap, index }: KeycapFieldProps) => {
  const {
    kitKeycaps,
    keycapsSelectedLink,
    toggleKeycapsSelectedLink,
    validKeycapsMap,
    updateKeycaps,
    removeKeycap,
    oneKeycap,
  } = useAddEditKeyboardContext();
  const isKit = useMemo(() => kitKeycaps && index === 0, [kitKeycaps, index]);
  const [hover, setHover] = useState(false);

  // Change the name and link of the keycap
  const nameChange = (newName: string) => {
    if (isKit) return;
    updateKeycaps(index, { name: newName, link: keycap.link });
  };
  const linkChange = (newLink: string) => {
    if (isKit) return;
    updateKeycaps(index, { name: keycap.name, link: newLink });
  };

  return (
    <div
      className="mt-1.5 w-full min-w-24 grow rounded-xl px-2 pb-3 hover:bg-base-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row items-end justify-between">
        <label className={`label justify-normal pb-0 pt-1 text-sm font-bold ${isKit && "text-gray-500"}`}>
          <span className="mr-1 text-gray-500">{index + 1}</span>
          {keycapsSelectedLink[index] ? "Link (optional)" : "Keycap Name"}
        </label>
        <button
          className={`btn btn-outline btn-error btn-xs mr-0.5 max-h-4 min-h-0 w-7 self-center ${(oneKeycap || isKit) && "btn-disabled"} ${!hover && "hidden"}`}
          onClick={() => removeKeycap(index)}
        >
          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
        </button>
      </div>
      <InputNameLinkField
        type={`keycap${index}`}
        selectedLink={keycapsSelectedLink[index]}
        toggleSelectedLink={() => toggleKeycapsSelectedLink(index)}
        name={keycap.name}
        setName={nameChange}
        namePlaceholder="GMK Olivia"
        nameMaxLength={50}
        validName={validKeycapsMap[index].name === true}
        link={keycap.link ? keycap.link : ""}
        setLink={linkChange}
        validLink={validKeycapsMap[index].link ? validKeycapsMap[index].link === true : false}
        noInput={isKit}
        fieldSelect={false}
      />
    </div>
  );
};

const KeycapsField = () => {
  const { keycaps, maxKeycaps, addNewKeycap } = useAddEditKeyboardContext();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end justify-between">
        <label className="label py-0 text-xl font-bold">Keycaps</label>
        <button
          className={`btn btn-outline btn-neutral btn-xs pb-6 ${maxKeycaps && "btn-disabled"}`}
          disabled={maxKeycaps}
          onClick={addNewKeycap}
        >
          <span className="mt-1.5">add more keycaps</span>
        </button>
      </div>
      <div className="flex w-full grow flex-row justify-between">
        {keycaps.map((keycap, index) => (
          <KeycapField key={index} keycap={keycap} index={index} />
        ))}
      </div>
    </div>
  );
};

export default KeycapsField;
