import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import { InputNameField } from "./InputFields";

const ModsField = () => {
  const { mods, setMods, maxMods, validMods, currentMod, setCurrentMod, validCurrentMod } =
    useAddKeyboardContext();

  const noInput = maxMods || !validMods;
  const nameChange = (e: any) => {
    if (noInput) return;
    setCurrentMod(e.target.value);
  };

  const handleSubmit = () => {
    if (noInput || validCurrentMod) return;
    setMods([...mods, currentMod]);
    setCurrentMod("");
  };

  return (
    <div className="flex flex-col">
      <label className="label pb-0 text-xl font-bold">Mods</label>
      <div className="flex flex-row items-end justify-between">
        <InputNameField
          type="mod"
          name={currentMod}
          validName={validCurrentMod}
          namePlaceholder="Tempest Mod"
          nameMaxLength={25}
          nameChange={nameChange}
          noInput={noInput}
        />
        <button
          className={`btn btn-outline btn-neutral btn-xs self-center px-3 pb-[1.8rem] ${noInput && "btn-disabled"}`}
          disabled={noInput}
          onClick={handleSubmit}
        >
          <span className="mt-1 text-sm">Add Mod</span>
        </button>
      </div>
      <div className="flex w-full grow flex-row justify-between">
        {mods.map((mod) => (
          <div key={mod} className="flex w-full flex-row items-center justify-between">
            <span className="text-lg">{mod}</span>
            <button className="btn-danger btn btn-outline btn-xs self-center px-3 pb-[1.8rem]">
              <span className="mt-1 text-sm">Remove</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScreenFour = () => {
  return (
    <>
      <ModsField />
    </>
  );
};

export default ScreenFour;
