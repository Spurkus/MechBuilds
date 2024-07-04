import { useMemo, useState } from "react";
import { InputNameLinkField } from "./InputFields";
import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ItemType } from "@/src/types/keyboard";

interface SwitchFieldProps {
  switchItem: ItemType;
  index: number;
}

interface StabilizerFieldProps {
  stabilizer: ItemType;
  index: number;
}

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
  } = useAddKeyboardContext();
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
        <label className="label justify-normal pb-0 pt-1 text-sm font-bold">
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
  const { keycaps, maxKeycaps, addNewKeycap } = useAddKeyboardContext();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end justify-between">
        <label className="label py-0 text-xl font-bold">Keycaps</label>
        <button
          className={`btn btn-outline btn-neutral btn-xs pb-6 ${maxKeycaps && "btn-disabled"}`}
          disabled={maxKeycaps}
          onClick={addNewKeycap}
        >
          <span className="mt-1.5">add keycap</span>
        </button>
      </div>
      <div className="flex w-full grow flex-row justify-between">
        {keycaps.map((keycap, index) => {
          return <KeycapField key={index} keycap={keycap} index={index} />;
        })}
      </div>
    </div>
  );
};

const StabilizerField = ({ stabilizer, index }: StabilizerFieldProps) => {
  const {
    kitStabilizers,
    stabilizersSelectedLink,
    toggleStabilizersSelectedLink,
    validStabilizersMap,
    updateStabilizers,
    removeStabilizer,
    oneStabilizer,
  } = useAddKeyboardContext();
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
        <label
          className={`label justify-normal truncate pb-0 pt-1 text-sm font-bold ${isKit && "text-gray-500"}`}
        >
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
        namePlaceholder="Durock V2 Stabilizer"
        nameMaxLength={50}
        validName={validStabilizersMap[index].name === true}
        link={stabilizer.link ? stabilizer.link : ""}
        setLink={linkChange}
        validLink={
          validStabilizersMap[index].link ? validStabilizersMap[index].link === true : false
        }
        noInput={isKit}
        fieldSelect={false}
      />
    </div>
  );
};

const StabilizersField = () => {
  const { stabilizers, maxStabilizers, addNewStabilizer } = useAddKeyboardContext();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end justify-between">
        <label className="label py-0 text-xl font-bold">Stabilizers</label>
        <button
          className={`btn btn-outline btn-neutral btn-xs pb-6 ${maxStabilizers && "btn-disabled"}`}
          disabled={maxStabilizers}
          onClick={addNewStabilizer}
        >
          <span className="mt-1.5">add stabilizer</span>
        </button>
      </div>
      <div className="flex w-full grow flex-row justify-between">
        {stabilizers.map((stabilizer, index) => {
          return <StabilizerField key={index} stabilizer={stabilizer} index={index} />;
        })}
      </div>
    </div>
  );
};

const SwitchField = ({ switchItem, index }: SwitchFieldProps) => {
  const {
    switchesSelectedLink,
    toggleSwitchesSelectedLink,
    validSwitchesMap,
    updateSwitches,
    removeSwitch,
    oneSwitch,
  } = useAddKeyboardContext();
  const [hover, setHover] = useState(false);

  // Change the name and link of the switch
  const nameChange = (newName: string) =>
    updateSwitches(index, { name: newName, link: switchItem.link });
  const linkChange = (newLink: string) =>
    updateSwitches(index, { name: switchItem.name, link: newLink });

  return (
    <div
      className="mt-1.5 w-full min-w-24 grow rounded-xl px-2 pb-3 hover:bg-base-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row items-end justify-between">
        <label className="label justify-normal pb-0 pt-1 text-sm font-bold">
          <span className="mr-1 text-gray-500">{index + 1}</span>
          {switchesSelectedLink[index] ? "Link (optional)" : "Switch Name"}
        </label>
        <button
          className={`btn btn-outline btn-error btn-xs mr-0.5 max-h-4 min-h-0 w-7 self-center ${oneSwitch && "btn-disabled"} ${!hover && "hidden"}`}
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
  const { switches, maxSwitches, addNewSwitch } = useAddKeyboardContext();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end justify-between">
        <label className="label pb-0 text-xl font-bold">Switches</label>
        <button
          className={`btn btn-outline btn-neutral btn-xs pb-6 ${maxSwitches && "btn-disabled"}`}
          disabled={maxSwitches}
          onClick={addNewSwitch}
        >
          <span className="mt-1.5">add switch</span>
        </button>
      </div>
      <div className="flex w-full grow flex-row justify-between">
        {switches.map((switchItem, index) => {
          return <SwitchField key={index} switchItem={switchItem} index={index} />;
        })}
      </div>
    </div>
  );
};

const ScreenThree = () => {
  return (
    <>
      <SwitchesField />
      <hr className="border-t border-gray-700" />
      <StabilizersField />
      <hr className="border-t border-gray-700" />
      <KeycapsField />
    </>
  );
};

export default ScreenThree;
