import ProfileDetails from "@/src/components/ProfileDetails/ProfileDetails";
import NeedsAuthentication from "@/src/context/NeedsAuthentication";
import { AddKeyboardButton } from "@/src/components/Keyboard/AddEditKeyboard/AddEditKeyboard";
import { AddEditKeyboardSelectContextProvider } from "@/src/context/AddEditKeyboardSelectContext";
import KeyboardModal from "./KeyboardModal";
import DisplayUserKeyboards from "@/src/components/Keyboard/DisplayKeyboard/DisplayUserKeyboards";

const Profile = () => {
  return (
    <NeedsAuthentication>
      <div className="flex w-full justify-center space-x-6">
        <div className="w-[20rem] p-2">
          <ProfileDetails />
        </div>
        <div className="w-[40rem] space-y-2">
          <AddEditKeyboardSelectContextProvider>
            <div className="mt-2 flex justify-between">
              <h1 className="font-regular font-clashgrotesk text-5xl">Profile</h1>
              <AddKeyboardButton />
            </div>
            <hr className="border-t border-gray-700" />
            <DisplayUserKeyboards />
            <KeyboardModal />
          </AddEditKeyboardSelectContextProvider>
        </div>
      </div>
    </NeedsAuthentication>
  );
};

export default Profile;
