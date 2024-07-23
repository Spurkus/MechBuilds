import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import SubmitImageVideo from "@/src/components/General/SubmitImageVideo";

const KeyboardContent = () => {
  const {
    contentIndex,
    setContentIndex,
    imageVideoList,
    setImageVideoList,
    mediaURL,
    setMediaURL,
    isMediaVideo,
    setIsMediaVideo,
    addIsMediaVideo,
    removeIsMediaVideo,
  } = useAddEditKeyboardContext();
  return (
    <SubmitImageVideo
      index={contentIndex}
      setIndex={setContentIndex}
      imageVideoList={imageVideoList}
      setImageVideoList={setImageVideoList}
      mediaURL={mediaURL}
      setMediaURL={setMediaURL}
      isMediaVideo={isMediaVideo}
      setIsMediaVideo={setIsMediaVideo}
      addIsMediaVideo={addIsMediaVideo}
      removeIsMediaVideo={removeIsMediaVideo}
    />
  );
};

export default KeyboardContent;
