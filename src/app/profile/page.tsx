import ProfileDetails from "./ProfileDetails";

const profile = () => {
  return (
    <div className="flex w-full space-x-6">
      <div className="flex w-[28%] p-2">
        <ProfileDetails />
      </div>
      <div className="flex w-[72%] items-center justify-center text-center">
        <div className="flex h-full flex-grow flex-col space-y-3 rounded-[3rem] bg-base-300 p-6">
          {/* Content for the right column (2/3) */}
          <h1 className="font-regular text-center font-clashgrotesk text-6xl">
            Profile
          </h1>
        </div>
      </div>
    </div>
  );
};

export default profile;
