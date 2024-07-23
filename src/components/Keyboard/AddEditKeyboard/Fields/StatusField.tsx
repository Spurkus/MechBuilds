import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { KeyboardStatusType } from "@/src/types/keyboard";

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

export default StatusField;
