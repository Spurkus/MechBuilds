import { useState, useMemo } from "react";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
  MAXIMUM_KEYBOARD_IMAGE_SIZE,
  MAXIMUM_KEYBOARD_VIDEO_SIZE,
} from "@/src/constants";
import NextImage from "next/image";
import ReactPlayer from "react-player";
import { useGlobalModalContext } from "../context/GlobalModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faPhotoFilm,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface SubmitImagesVideoProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  imageVideoList: File[];
  setImageVideoList: React.Dispatch<React.SetStateAction<File[]>>;
  mediaURL: string;
  setMediaURL: React.Dispatch<React.SetStateAction<string>>;
}

const SubmitImageVideo = ({
  index,
  setIndex,
  imageVideoList,
  setImageVideoList,
  mediaURL,
  setMediaURL,
}: SubmitImagesVideoProps) => {
  const { handleModal } = useGlobalModalContext();
  const [isHovering, setIsHovering] = useState(false);
  const isUploaded = useMemo(() => imageVideoList.length !== 0, [imageVideoList]);
  const firstIndex = useMemo(() => index === 0, [index]);
  const lastIndex = useMemo(() => index === imageVideoList.length - 1, [index, imageVideoList]);
  const isCurrentMediaVideo = useMemo(
    () => imageVideoList[index]?.type.startsWith("video/"),
    [imageVideoList, index],
  );

  const moveLeft = () => {
    if (firstIndex) return;
    setMediaURL("");
    URL.revokeObjectURL(mediaURL);
    setMediaURL(URL.createObjectURL(imageVideoList[index - 1]));
    setIndex(index - 1);
  };

  const moveRight = () => {
    if (lastIndex) return;
    setMediaURL("");
    URL.revokeObjectURL(mediaURL);
    setMediaURL(URL.createObjectURL(imageVideoList[index + 1]));
    setIndex(index + 1);
  };

  const removeElement = () => {
    if (imageVideoList.length === 1) {
      URL.revokeObjectURL(mediaURL);
      setImageVideoList([]);
      setMediaURL("");
      setIndex(0);
    } else {
      const newList = imageVideoList.filter((_, indexList) => indexList !== index);
      const newIndex = index === 0 ? 0 : index >= newList.length ? newList.length - 1 : index;
      URL.revokeObjectURL(mediaURL);
      setImageVideoList(newList);
      setMediaURL(URL.createObjectURL(newList[newIndex]));
      setIndex(newIndex);
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
    if (!isUploaded) setMediaURL(URL.createObjectURL(file));
  };

  const addFile = (file: File | undefined) => {
    if (!file) {
      handleModal("Uploading Image/Video", "No file selected", "error");
      return;
    }

    if (file.type.startsWith("image/")) {
      handleImage(file);
    } else if (file.type.startsWith("video/")) {
      handleVideo(file);
    } else {
      handleModal("Uploading Image/Video", "Invalid file type", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFile(e.target.files[0]);
  };

  const InputImageVideo = () => {
    return (
      <input
        type="file"
        accept="image/*,video/*"
        className="inset-0 hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
      />
    );
  };

  return (
    <div
      className="avatar mask flex w-full grow self-center py-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isUploaded && isHovering && (
        <>
          <label className="btn btn-sm absolute left-3 top-3.5 z-10 flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15">
            <InputImageVideo />
            <FontAwesomeIcon icon={faPhotoFilm} className="h-5 w-5 text-white" />
            <span className="mt-0.5 font-bold text-white">Add</span>
          </label>
          <button
            className="btn btn-sm absolute right-3 top-3.5 z-10 flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15"
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
              className="btn btn-circle btn-sm absolute left-2 top-32 z-20 flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15"
              onClick={moveLeft}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5 text-white" />
            </button>
          )}
          {!lastIndex && (
            <button
              className="btn btn-circle btn-sm absolute right-2 top-32 z-20 flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15"
              onClick={moveRight}
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 text-white" />
            </button>
          )}
        </>
      )}
      <label className={`relative w-full grow ${!isUploaded && "cursor-pointer"}`}>
        {!isUploaded && <InputImageVideo />}
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
              style={{ objectFit: "contain" }}
            />
          ) : (
            <NextImage
              src={mediaURL}
              fill={false}
              alt="Profile"
              className="aspect-video rounded-[1.5rem] bg-gradient-to-b from-zinc-950 to-zinc-900"
              style={{ objectFit: "contain" }}
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
  );
};

export default SubmitImageVideo;
