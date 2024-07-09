import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { InputNameDropdownField } from "./InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { KEYBOARD_MODS } from "@/src/constants";
import { KeyboardStatusType } from "@/src/types/keyboard";

interface ModFieldProps {
  mod: string;
  index: number;
}

const DescriptionField = () => {
  const { description, setDescription, validDescription } = useAddEditKeyboardContext();
  return (
    <div className="flex grow flex-col py-1">
      <label className="label py-0 text-xl font-bold">Description</label>
      <textarea
        placeholder="A nice simple description of your keyboard :)"
        maxLength={1000}
        className={`grow resize-none rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
          validDescription || !description ? "bg-base-200" : "bg-input-error"
        }`}
        id="description"
        autoComplete="off"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
    </div>
  );
};

const ModField = ({ mod, index }: ModFieldProps) => {
  const { mods, setMods, modValidation } = useAddEditKeyboardContext();
  const validMod = modValidation(mod);
  const handleRemove = () => {
    setMods(mods.filter((_, i) => i !== index));
  };
  return (
    <div
      className={`badge badge-lg space-x-1 py-3 pr-1 ${validMod ? "badge-neutral" : "badge-error"}`}
    >
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
  const { mods, setMods, maxMods, validMods, currentMod, setCurrentMod, validCurrentMod } =
    useAddEditKeyboardContext();

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
          <span className="mt-1 text-sm">AddEdit Mod</span>
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

const StatusField = () => {
  const { status, setStatus } = useAddEditKeyboardContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as KeyboardStatusType);
  };

  return (
    <div className="flex flex-row space-x-3">
      <label className="label py-0 text-xl font-semibold">Status:</label>
      <div className="join flex w-full grow self-center">
        <input
          className="btn join-item btn-neutral btn-sm grow"
          type="radio"
          name="options"
          value="public"
          checked={status === ("public" as KeyboardStatusType)}
          onChange={handleChange}
          aria-label="Public"
        />
        <input
          className="btn join-item btn-neutral btn-sm grow"
          type="radio"
          name="options"
          value="private"
          checked={status === ("private" as KeyboardStatusType)}
          onChange={handleChange}
          aria-label="Private"
        />
        <input
          className="btn join-item btn-neutral btn-sm grow"
          type="radio"
          name="options"
          value="unlisted"
          checked={status === ("unlisted" as KeyboardStatusType)}
          onChange={handleChange}
          aria-label="Unlisted"
        />
      </div>
    </div>
  );
};

const ScreenFour = () => {
  return (
    <>
      <ModsField />
      <hr className="border-t border-gray-700" />
      <DescriptionField />
      <StatusField />
    </>
  );
};

export default ScreenFour;
