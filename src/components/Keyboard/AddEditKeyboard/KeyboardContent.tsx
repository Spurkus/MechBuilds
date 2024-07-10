import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import SubmitImageVideo from "@/src/components/SubmitImageVideo";

const KeyboardContent = () => {
  const { contentIndex, setContentIndex, imageVideoList, setImageVideoList, mediaURL, setMediaURL } =
    useAddEditKeyboardContext();
  return (
    <SubmitImageVideo
      index={contentIndex}
      setIndex={setContentIndex}
      imageVideoList={imageVideoList}
      setImageVideoList={setImageVideoList}
      mediaURL={mediaURL}
      setMediaURL={setMediaURL}
    />
  );
};

export default KeyboardContent;
