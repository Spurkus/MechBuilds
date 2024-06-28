import ProfileDetails from "@/src/components/ProfileDetails/ProfileDetails";
import NeedsAuthentication from "@/src/context/NeedsAuthentication";
import AddKeyboardButton from "./AddKeyboard";

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
            <AddKeyboardButton />
          </div>
        </div>
      </div>
    </NeedsAuthentication>
  );
};

export default Profile;
