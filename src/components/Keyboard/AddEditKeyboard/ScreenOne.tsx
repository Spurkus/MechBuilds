import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import SubmitImagesVideo from "../../SubmitImagesVideo";
import { InputNameLoadingField } from "./InputFields";

const NameField = () => {
  const { name, setName, validName, nameLoading } = useAddKeyboardContext();
  const nameChange = (e: any) => setName(e.target.value);
  return (
    <div className="flex flex-col">
      <label className="label pb-0 font-bold">Keyboard Name</label>
      <InputNameLoadingField
        type="keyboard"
        name={name}
        nameLoading={nameLoading}
        namePlaceholder="Rainy 75"
        nameMaxLength={50}
        nameChange={nameChange}
        validName={validName}
        noInput={false}
      />
    </div>
  );
};

const KeyboardContent = () => {
  const {
    contentIndex,
    setContentIndex,
    imageVideoList,
    setImageVideoList,
    mediaURL,
    setMediaURL,
  } = useAddKeyboardContext();
  return (
    <SubmitImagesVideo
      index={contentIndex}
      setIndex={setContentIndex}
      imageVideoList={imageVideoList}
      setImageVideoList={setImageVideoList}
      mediaURL={mediaURL}
      setMediaURL={setMediaURL}
    />
  );
};

const ScreenOne = () => {
  return (
    <>
      <NameField />
      <KeyboardContent />
    </>
  );
};

export default ScreenOne;
