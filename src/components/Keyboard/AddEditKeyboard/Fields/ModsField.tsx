import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { InputNameDropdownField } from "./InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { KEYBOARD_MODS } from "@/src/constants";

interface ModFieldProps {
  mod: string;
  index: number;
}

const ModField = ({ mod, index }: ModFieldProps) => {
  const { mods, setMods, modValidation } = useAddEditKeyboardContext();
  const validMod = modValidation(mod);
  const handleRemove = () => {
    setMods(mods.filter((_, i) => i !== index));
  };
  return (
    <div className={`badge badge-lg space-x-1 py-3 pr-1 ${validMod ? "badge-neutral" : "badge-error"}`}>
      <span className="mb-[0.1rem] truncate text-sm font-bold">{mod}</span>
      <button
        className="btn btn-circle btn-ghost btn-xs max-h-[1.125rem] min-h-0 w-[1.125rem] self-center"
        onClick={handleRemove}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

const ModsField = () => {
  const { mods, setMods, maxMods, validMods, currentMod, setCurrentMod, validCurrentMod } = useAddEditKeyboardContext();

  const noInput = maxMods || !validMods;
  const nameChange = (e: any) => {
    if (noInput) return;
    setCurrentMod(e.target.value);
  };

  const noSubmit = noInput || !validCurrentMod || !currentMod;
  const handleSubmit = () => {
    if (noSubmit) return;
    setMods([...mods, currentMod]);
    setCurrentMod("");
  };

  return (
    <div className="flex flex-col">
      <label className="label pb-0 text-xl font-bold">Mods</label>
      <div className="flex flex-row items-end justify-between space-x-2.5">
        <InputNameDropdownField
          type="mod"
          name={currentMod}
          setName={setCurrentMod}
          validName={validCurrentMod}
          namePlaceholder="Tempest Mod"
          nameMaxLength={25}
          nameChange={nameChange}
          noInput={noInput}
          list={KEYBOARD_MODS}
        />
        <button
          className={`btn btn-outline btn-neutral btn-xs self-center px-3 pb-[1.8rem] ${noSubmit && "btn-disabled"}`}
          disabled={noSubmit}
          onClick={handleSubmit}
        >
          <span className="mt-1 text-sm">Add Mod</span>
        </button>
      </div>
      <div className="flex w-full flex-row space-x-2 overflow-x-auto overflow-y-hidden py-2">
        {mods.map((mod, index) => (
          <ModField key={index} mod={mod} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ModsField;
