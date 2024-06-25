import ProfileDetails from "@/src/components/ProfileDetails/ProfileDetails";
import NeedsAuthentication from "@/src/context/NeedsAuthentication";

const Profile = () => {
  return (
    <NeedsAuthentication>
      <div className="flex w-full space-x-6">
        <div className="w-[28%] p-2">
          <ProfileDetails />
        </div>
        <div className="w-[72%] p-2">
          <div className="mt-3 flex w-full justify-between">
            <h1 className="font-regular font-clashgrotesk text-5xl">Profile</h1>
            <button className="btn btn-outline btn-info btn-sm mr-2 self-center rounded-xl px-5 pb-10 text-base">
              <span className="mt-2">Add Keyboard</span>
            </button>
          </div>
        </div>
      </div>
    </NeedsAuthentication>
  );
};

export default Profile;
