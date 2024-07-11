import { useState, useMemo, useRef } from "react";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
  MAXIMUM_KEYBOARD_IMAGE_SIZE,
  MAXIMUM_KEYBOARD_VIDEO_SIZE,
} from "@/src/constants";
import NextImage from "next/image";
import ReactPlayer from "react-player";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPhotoFilm, faTrashAlt, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { isFileImage, isFileVideo } from "@/src/helper/helperFunctions";

interface SubmitImagesVideoProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  imageVideoList: (File | string)[];
  setImageVideoList: React.Dispatch<React.SetStateAction<(File | string)[]>>;
  mediaURL: string;
  setMediaURL: React.Dispatch<React.SetStateAction<string>>;
  isMediaVideo: boolean[];
  setIsMediaVideo: React.Dispatch<React.SetStateAction<boolean[]>>;
  addIsMediaVideo: (value?: boolean) => void;
  removeIsMediaVideo: (index: number) => void;
}

const SubmitImageVideo = ({
  index,
  setIndex,
  imageVideoList,
  setImageVideoList,
  mediaURL,
  setMediaURL,
  isMediaVideo,
  setIsMediaVideo,
  addIsMediaVideo,
  removeIsMediaVideo,
}: SubmitImagesVideoProps) => {
  const { handleModal } = useGlobalModalContext();
  const [isHovering, setIsHovering] = useState(false);
  const isUploaded = useMemo(() => imageVideoList.length !== 0, [imageVideoList]);
  const firstIndex = useMemo(() => index === 0, [index]);
  const lastIndex = useMemo(() => index === imageVideoList.length - 1, [index, imageVideoList]);
  const isCurrentMediaVideo = useMemo(() => isMediaVideo[index], [isMediaVideo, index]);

  const moveLeft = () => {
    if (firstIndex) return;
    setMediaURL("");
    try {
      URL.revokeObjectURL(mediaURL);
    } catch (e) {}
    setMediaURL(
      imageVideoList[index - 1] instanceof File
        ? URL.createObjectURL(imageVideoList[index - 1] as File)
        : (imageVideoList[index - 1] as string),
    );
    setIndex(index - 1);
  };

  const moveRight = () => {
    if (lastIndex) return;
    setMediaURL("");
    try {
      URL.revokeObjectURL(mediaURL);
    } catch (e) {}
    setMediaURL(
      imageVideoList[index + 1] instanceof File
        ? URL.createObjectURL(imageVideoList[index + 1] as File)
        : (imageVideoList[index + 1] as string),
    );
    setIndex(index + 1);
  };

  const removeElement = () => {
    if (imageVideoList.length === 1) {
      URL.revokeObjectURL(mediaURL);
      setImageVideoList([]);
      setMediaURL("");
      setIndex(0);
      setIsMediaVideo([]);
    } else {
      const newList = imageVideoList.filter((_, indexList) => indexList !== index);
      const newIndex = index === 0 ? 0 : index >= newList.length ? newList.length - 1 : index;
      try {
        URL.revokeObjectURL(mediaURL);
      } catch (e) {}
      setImageVideoList(newList);
      setMediaURL(
        newList[newIndex] instanceof File
          ? URL.createObjectURL(newList[newIndex] as File)
          : (newList[newIndex] as string),
      );
      setIndex(newIndex);
      removeIsMediaVideo(index);
    }
  };

  const handleImage = (file: File) => {
    if (file.size > MAXIMUM_KEYBOARD_IMAGE_SIZE)
      return handleModal("Uploading Image", "Image must be smaller than 10MB", "error");

    // Image validation
    const mediaURL = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // Image must be bigger than 250x250px
      if (img.width < 250 || img.height < 250) {
        URL.revokeObjectURL(mediaURL); // Clean up
        return handleModal("Uploading Image", "Image size must be bigger than 250x250px", "error");
      }

      URL.revokeObjectURL(mediaURL); // Clean up
      setImageVideoList((prevList) => [...prevList, file]);
      addIsMediaVideo(false);
      if (!isUploaded) setMediaURL(URL.createObjectURL(file));
    };

    // Check if the image is valid
    img.onerror = () => {
      URL.revokeObjectURL(mediaURL); // Clean up
      return handleModal("Uploading Image", "Could not load the image", "error");
    };

    img.src = mediaURL;
  };

  const handleVideo = (file: File) => {
    if (file.size > MAXIMUM_KEYBOARD_VIDEO_SIZE)
      return handleModal("Uploading Video", "Video must be smaller than 30MB", "error");

    setImageVideoList((prevList) => [...prevList, file]);
    addIsMediaVideo(true);
    if (!isUploaded) setMediaURL(URL.createObjectURL(file));
  };

  const addFile = (file: File | undefined) => {
    if (!file) {
      handleModal("Uploading Image/Video", "No file selected", "error");
      return;
    }

    if (isFileImage(file)) {
      handleImage(file);
    } else if (isFileVideo(file)) {
      handleVideo(file);
    } else {
      handleModal("Uploading Image/Video", "Invalid file type", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFile(e.target.files[0]);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const openFileInput = () => fileInputRef.current!.click();
  const InputImageVideo = () => {
    return (
      <input
        ref={fileInputRef}
        type="file"
        id="submitimagevideo"
        accept="image/*,video/*"
        className="hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
      />
    );
  };

  return (
    <>
      <InputImageVideo />
      <div
        className="avatar mask flex w-full grow self-center py-1"
        onClick={() => !isUploaded && openFileInput()}
        onMouseEnter={() => setIsHovering(true)}
      >
        {isUploaded && isHovering && (
          <>
            <button
              className="btn btn-sm absolute left-3 top-3.5 z-10 flex rounded-2xl border-0 bg-gray-800 bg-opacity-60 hover:bg-gray-800 hover:bg-opacity-75"
              onClick={openFileInput}
            >
              <FontAwesomeIcon icon={faPhotoFilm} className="h-5 w-5 text-white" />
              <span className="mt-0.5 font-bold text-white">Add</span>
            </button>
            <button
              className="btn btn-sm absolute right-3 top-3.5 z-10 flex rounded-2xl border-0 bg-gray-800 bg-opacity-60 hover:bg-gray-800 hover:bg-opacity-75"
              onClick={removeElement}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="h-5 w-5 text-error" />
              <span className="mt-0.5 font-bold text-white">Delete</span>
            </button>
          </>
        )}
        {isUploaded && (
          <>
            {!firstIndex && (
              <button
                className="btn btn-circle btn-sm absolute left-2 top-32 z-20 flex rounded-2xl border-0 bg-gray-800 bg-opacity-60 hover:bg-gray-800 hover:bg-opacity-75"
                onClick={moveLeft}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5 text-white" />
              </button>
            )}
            {!lastIndex && (
              <button
                className="btn btn-circle btn-sm absolute right-2 top-32 z-20 flex rounded-2xl border-0 bg-gray-800 bg-opacity-60 hover:bg-gray-800 hover:bg-opacity-75"
                onClick={moveRight}
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 text-white" />
              </button>
            )}
          </>
        )}
        <label className={`absolute w-full grow ${!isUploaded && "cursor-pointer"}`}>
          <div
            className={`${isHovering && !isUploaded ? "flex" : "hidden"} absolute inset-0 items-center justify-center rounded-[1.5rem] bg-black bg-opacity-60`}
          >
            <span className="text font-bold text-white">Add Image or Video</span>
          </div>
          {isUploaded && imageVideoList.length !== 1 && (
            <div className="badge badge-neutral absolute bottom-0 left-0 right-0 z-20 mx-auto mb-2 space-x-1.5">
              {imageVideoList.map((_, indexList) => (
                <FontAwesomeIcon
                  key={indexList}
                  icon={faCircle}
                  className={`h-1.5 w-1.5 ${indexList !== index && "text-gray-500"}`}
                />
              ))}
            </div>
          )}
          {isUploaded ? (
            isCurrentMediaVideo ? (
              <ReactPlayer
                url={mediaURL}
                controls
                className="aspect-video rounded-[1.5rem] bg-gradient-to-b from-zinc-950 to-zinc-900"
                width="100%"
                height="100%"
                style={{ objectFit: "contain", overflow: "hidden" }}
              />
            ) : (
              <NextImage
                src={mediaURL}
                fill={false}
                alt="Profile"
                className="aspect-video rounded-[1.5rem] bg-gradient-to-b from-zinc-950 to-zinc-900"
                style={{ objectFit: "contain", overflow: "hidden" }}
                width={DEFAULT_KEYBOARD_IMAGE_WIDTH}
                height={DEFAULT_KEYBOARD_IMAGE_HEIGHT}
                quality={100}
              />
            )
          ) : (
            <NextImage
              src={DEFAULT_KEYBOARD_IMAGE}
              fill={false}
              alt="Profile"
              className="aspect-video rounded-[1.5rem] bg-gradient-to-b from-zinc-950 to-zinc-900"
              width={DEFAULT_KEYBOARD_IMAGE_WIDTH}
              height={DEFAULT_KEYBOARD_IMAGE_HEIGHT}
              quality={100}
            />
          )}
        </label>
      </div>
    </>
  );
};

export default SubmitImageVideo;
