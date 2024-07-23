import { useMemo, useState } from "react";
import { InputNameLinkField } from "./InputFields";
import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ItemType } from "@/src/types/keyboard";

interface StabilizerFieldProps {
  stabilizer: ItemType;
  index: number;
}

const StabilizerField = ({ stabilizer, index }: StabilizerFieldProps) => {
  const {
    kitStabilizers,
    stabilizersSelectedLink,
    toggleStabilizersSelectedLink,
    validStabilizersMap,
    updateStabilizers,
    removeStabilizer,
    oneStabilizer,
  } = useAddEditKeyboardContext();
  const isKit = useMemo(() => kitStabilizers && index === 0, [kitStabilizers, index]);
  const [hover, setHover] = useState(false);

  // Change the name and link of the stab
  const nameChange = (newName: string) => {
    if (isKit) return;
    updateStabilizers(index, { name: newName, link: stabilizer.link });
  };
  const linkChange = (newLink: string) => {
    if (isKit) return;
    updateStabilizers(index, { name: stabilizer.name, link: newLink });
  };

  return (
    <div
      className="mt-1.5 w-full min-w-24 grow rounded-xl px-2 pb-3 hover:bg-base-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row items-end justify-between">
        <label className={`label justify-normal truncate pb-0 pt-1 text-sm font-bold ${isKit && "text-gray-500"}`}>
          <span className="mr-1 text-gray-500">{index + 1}</span>
          {stabilizersSelectedLink[index] ? "Link (optional)" : "Stabilizer Name"}
        </label>
        <button
          className={`btn btn-outline btn-error btn-xs mr-0.5 max-h-4 min-h-0 w-7 self-center ${(oneStabilizer || isKit) && "btn-disabled"} ${!hover && "hidden"}`}
          onClick={() => removeStabilizer(index)}
        >
          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
        </button>
      </div>
      <InputNameLinkField
        type={`stabilizer${index}`}
        selectedLink={stabilizersSelectedLink[index]}
        toggleSelectedLink={() => toggleStabilizersSelectedLink(index)}
        name={stabilizer.name}
        setName={nameChange}
        namePlaceholder="Durock V2 Stabilizers"
        nameMaxLength={50}
        validName={validStabilizersMap[index].name === true}
        link={stabilizer.link ? stabilizer.link : ""}
        setLink={linkChange}
        validLink={validStabilizersMap[index].link ? validStabilizersMap[index].link === true : false}
        noInput={isKit}
        fieldSelect={false}
      />
    </div>
  );
};

const StabilizersField = () => {
  const { stabilizers, maxStabilizers, addNewStabilizer } = useAddEditKeyboardContext();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end justify-between">
        <label className="label py-0 text-xl font-bold">Stabilizers</label>
        <button
          className={`btn btn-outline btn-neutral btn-xs pb-6 ${maxStabilizers && "btn-disabled"}`}
          disabled={maxStabilizers}
          onClick={addNewStabilizer}
        >
          <span className="mt-1.5">add more stabilizers</span>
        </button>
      </div>
      <div className="flex w-full grow flex-row justify-between">
        {stabilizers.map((stabilizer, index) => (
          <StabilizerField key={index} stabilizer={stabilizer} index={index} />
        ))}
      </div>
    </div>
  );
};

export default StabilizersField;
