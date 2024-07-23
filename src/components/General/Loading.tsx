const Loading = ({ height = 42, width = 42 }: { height?: number; width?: number }) => {
  return (
    <div className="items-center self-center rounded-xl text-base">
      <div className="flex">
        <span className="loading loading-spinner" style={{ width, height }}></span>
      </div>
    </div>
  );
};

export default Loading;
