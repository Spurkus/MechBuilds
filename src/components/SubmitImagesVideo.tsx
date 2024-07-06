import { useState, useMemo, forwardRef, useRef, useEffect } from "react";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
  MAXIMUM_KEYBOARD_IMAGE_SIZE,
} from "@/src/constants";
import NextImage from "next/image";
import { useGlobalModalContext } from "../context/GlobalModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faPhotoFilm,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const SubmitImagesVideo = () => {
  const { handleModal } = useGlobalModalContext();
  const [isHovering, setIsHovering] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageVideoList, setImageVideoList] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState("");
  const isUploaded = useMemo(() => imageVideoList.length !== 0, [imageVideoList]);
  const firstIndex = useMemo(() => index === 0, [index]);
  const lastIndex = useMemo(() => index === imageVideoList.length - 1, [index, imageVideoList]);

  const moveLeft = () => {
    if (firstIndex) return;
    setImageURL("");
    URL.revokeObjectURL(imageURL);
    setImageURL(URL.createObjectURL(imageVideoList[index - 1]));
    setIndex(index - 1);
  };

  const moveRight = () => {
    if (lastIndex) return;
    setImageURL("");
    URL.revokeObjectURL(imageURL);
    setImageURL(URL.createObjectURL(imageVideoList[index + 1]));
    setIndex(index + 1);
  };

  const removeElement = (currentIndex: number) => {
    if (imageVideoList.length === 1) {
      setImageVideoList([]);
      setImageURL("");
      URL.revokeObjectURL(imageURL);
    } else if (currentIndex === 0) {
      setImageURL("");
      URL.revokeObjectURL(imageURL);
      setIndex(0);
      setImageURL(URL.createObjectURL(imageVideoList[1]));
      setImageVideoList(imageVideoList.slice(1));
    } else {
      setImageVideoList(imageVideoList.filter((_, i) => i !== currentIndex));
      setImageURL("");
      URL.revokeObjectURL(imageURL);
      setIndex(currentIndex - 1);
      setImageURL(URL.createObjectURL(imageVideoList[currentIndex]));
    }
  };

  const InputImageVideo = forwardRef(
    (props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
      return (
        <input
          ref={ref}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            addFile(e.target.files?.[0]);
          }}
          {...props}
        />
      );
    },
  );

  InputImageVideo.displayName = "InputImageVideo";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImage = (file: File) => {
    if (file.size > MAXIMUM_KEYBOARD_IMAGE_SIZE)
      return handleModal("Uploading Image", "Image must be smaller than 10MB", "error");

    // Image validation
    const imageURL = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // Image must be bigger than 250x250px
      if (img.width < 250 || img.height < 250) {
        URL.revokeObjectURL(imageURL); // Clean up
        return handleModal("Uploading Image", "Image size must be bigger than 250x250px", "error");
      }

      URL.revokeObjectURL(imageURL); // Clean up
      setImageVideoList((prevList) => [...prevList, file]);
      if (!isUploaded) setImageURL(URL.createObjectURL(file));
    };

    // Check if the image is valid
    img.onerror = () => {
      URL.revokeObjectURL(imageURL); // Clean up
      return handleModal("Uploading Image", "Could not load the image", "error");
    };

    img.src = imageURL;
  };

  const addFile = (file: File | undefined) => {
    if (!file) {
      handleModal("Uploading Image/Video", "No file selected", "error");
      return;
    }

    if (file.type.includes("image")) {
      handleImage(file);
    } else if (file.type.includes("video")) {
    } else {
      handleModal("Uploading Image/Video", "Invalid file type", "error");
    }
  };

  return (
    <div
      className="avatar mask flex w-full grow self-center py-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isUploaded && isHovering && (
        <div className="absolute z-20 flex h-36 w-full grow p-3">
          <div className="flex w-full grow flex-row justify-between">
            <button
              className="btn btn-sm flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15"
              onClick={() => inputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faPhotoFilm} className="h-5 w-5 text-white" />
              <span className="mt-0.5 font-bold">Add</span>
            </button>
            <button
              className="btn btn-sm flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15"
              onClick={() => removeElement(index)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="h-5 w-5 text-error" />
            </button>
            <InputImageVideo ref={inputRef} />
          </div>
        </div>
      )}
      {isUploaded && (
        <div className="absolute z-10 flex h-full w-full grow p-3">
          <div className="flex h-full w-full grow flex-row items-center">
            {!firstIndex && (
              <button
                className="btn btn-circle btn-sm flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15"
                onClick={moveLeft}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5 text-white" />
              </button>
            )}
            {!lastIndex && (
              <div className="flex w-full grow justify-end">
                <button
                  className="btn btn-circle btn-sm flex rounded-2xl border-0 bg-gray-200 bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-15"
                  onClick={moveRight}
                >
                  <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <label className={`relative w-full grow ${!isUploaded && "cursor-pointer"}`}>
        {isHovering && !isUploaded && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[1.5rem] bg-black bg-opacity-60">
            <InputImageVideo />
            <span className="text font-bold text-white">Add Images or Videos</span>
          </div>
        )}
        {isUploaded && imageVideoList.length !== 1 && (
          <>
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="badge badge-neutral mb-2 space-x-1.5">
                {imageVideoList.map((_, indexList) => (
                  <FontAwesomeIcon
                    key={indexList}
                    icon={faCircle}
                    className={`h-1.5 w-1.5 ${indexList !== index && "text-gray-500"}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <NextImage
          src={isUploaded ? imageURL : DEFAULT_KEYBOARD_IMAGE}
          fill={false}
          alt="Profile"
          className="aspect-video rounded-[1.5rem] bg-gradient-to-b from-zinc-950 to-zinc-900"
          style={{ objectFit: "contain" }}
          width={DEFAULT_KEYBOARD_IMAGE_WIDTH}
          height={DEFAULT_KEYBOARD_IMAGE_HEIGHT}
          quality={100}
        />
      </label>
    </div>
  );
};

export default SubmitImagesVideo;
