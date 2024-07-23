import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";

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

export default DescriptionField;
