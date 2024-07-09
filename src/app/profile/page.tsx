import ProfileDetails from "@/src/components/ProfileDetails/ProfileDetails";
import NeedsAuthentication from "@/src/context/NeedsAuthentication";
import AddKeyboardButton from "@/src/components/Keyboard/AddEditKeyboard/AddEditKeyboard";
import DisplayUserKeyboards from "./DisplayUserKeyboards";

const Profile = () => {
  return (
    <NeedsAuthentication>
      <div className="flex w-full justify-center space-x-6">
        <div className="w-[20rem] p-2">
          <ProfileDetails />
        </div>
        <div className="space-y-2">
          <div className="mt-2 flex w-[40rem] justify-between">
            <h1 className="font-regular font-clashgrotesk text-5xl">Profile</h1>
            <AddKeyboardButton />
          </div>
          <hr className="border-t border-gray-700" />
          <DisplayUserKeyboards />
        </div>
      </div>
    </NeedsAuthentication>
  );
};

export default Profile;
