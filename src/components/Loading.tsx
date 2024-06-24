const Loading = ({ height = 12, width = 12 }: { height?: number; width?: number }) => {
  return (
    <div className="items-center self-center rounded-xl text-base">
      <div className="flex">
        <span className={`loading loading-spinner h-${height} w-${width}`}></span>
      </div>
    </div>
  );
};

export default Loading;
