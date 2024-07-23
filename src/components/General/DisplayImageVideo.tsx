import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_KEYBOARD_IMAGE_HEIGHT, DEFAULT_KEYBOARD_IMAGE_WIDTH } from "@/src/constants";
import ReactPlayer from "react-player";
import NextImage from "next/image";

interface DisplayImageVideoProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  imageVideoList: string[];
  isMediaVideo: boolean[];
}

const DisplayImageVideo = ({ index, setIndex, imageVideoList, isMediaVideo }: DisplayImageVideoProps) => {
  const buttonStyle: React.CSSProperties = { top: "calc(50% - 0.75rem)" };

  const firstIndex = useMemo(() => index === 0, [index]);
  const lastIndex = useMemo(() => index === imageVideoList.length - 1, [index, imageVideoList]);
  const isCurrentMediaVideo = useMemo(() => isMediaVideo[index], [isMediaVideo, index]);

  const moveLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (firstIndex) return;
    setIndex(index - 1);
  };

  const moveRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (lastIndex) return;
    setIndex(index + 1);
  };

  return (
    <div className="avatar mask my-1 flex w-full self-center">
      {!firstIndex && (
        <button
          style={buttonStyle}
          className="btn btn-circle btn-sm absolute left-3 z-20 flex rounded-2xl border-0 bg-gray-800 bg-opacity-60 hover:bg-gray-800 hover:bg-opacity-75"
          onClick={moveLeft}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5 text-white" />
        </button>
      )}
      {!lastIndex && (
        <button
          style={buttonStyle}
          className="btn btn-circle btn-sm absolute right-3 z-20 flex rounded-2xl border-0 bg-gray-800 bg-opacity-60 hover:bg-gray-800 hover:bg-opacity-75"
          onClick={moveRight}
        >
          <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 text-white" />
        </button>
      )}
      <label className="relative w-full grow cursor-pointer">
        {imageVideoList.length !== 1 && (
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
        {isCurrentMediaVideo ? (
          <ReactPlayer
            url={imageVideoList[index]}
            controls
            pip={false}
            className="aspect-video rounded-[1rem] bg-gradient-to-b from-zinc-950 to-zinc-900"
            width="100%"
            height="100%"
            style={{ objectFit: "contain", overflow: "hidden" }}
          />
        ) : (
          <NextImage
            src={imageVideoList[index]}
            fill={false}
            alt="Profile"
            className="aspect-video rounded-[1rem] bg-gradient-to-b from-zinc-950 to-zinc-900"
            style={{ objectFit: "contain" }}
            width={DEFAULT_KEYBOARD_IMAGE_WIDTH}
            height={DEFAULT_KEYBOARD_IMAGE_HEIGHT}
            quality={100}
          />
        )}
      </label>
    </div>
  );
};

export default DisplayImageVideo;
