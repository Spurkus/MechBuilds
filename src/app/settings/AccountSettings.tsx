import { USERNAME_REGEX, useAuthContext } from "@/src/context/Authentication";
import { useEffect, useState } from "react";
import { UserProfileType, EditUserProfileType } from "@/src/context/Authentication";
import Loading from "@/src/components/Loading";
import { isUsernameTaken, editUserProfile } from "@/src/helper/firestoreFunctions";
import { useGlobalModalContext } from "@/src/context/GlobalModal";

interface ChangeUsernameModalProps {
  open: boolean;
  toggleChangeUsername: () => void;
}

interface ChangeUsernameFormProps {
  toggleChangeUsername: () => void;
  userProfile: UserProfileType;
  editUserProfileState: (newUserProfile: EditUserProfileType) => void;
}

const ChangeUsernameForm = ({
  toggleChangeUsername,
  userProfile,
  editUserProfileState,
}: ChangeUsernameFormProps) => {
  const { handleModalError } = useGlobalModalContext();
  const [username, setUsername] = useState(userProfile.username);
  const [validUsername, setValidUsername] = useState(true);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isSavable, setIsSavable] = useState(false);

  // Check if username is valid or taken
  useEffect(() => {
    if (username === userProfile.username) {
      setValidUsername(true);
      return setIsSavable(false);
    }

    if (!USERNAME_REGEX.test(username)) {
      setValidUsername(false);
      return setIsSavable(false);
    }

    setUsernameLoading(true);
    isUsernameTaken(username)
      .then((result) => {
        setValidUsername(!result);
        setIsSavable(!result);
        setUsernameLoading(false);
      })
      .catch((error) => {
        setIsSavable(false);
        handleModalError(error);
        setUsernameLoading(false);
      });
  }, [username, handleModalError, userProfile.username]);

  const closeProfileModal = () => {
    const element = document.getElementById("changeusernamemodal");
    if (element instanceof HTMLDialogElement) {
      element.close();
      toggleChangeUsername();
    }
  };

  const handleCancel = () => {
    setUsername(userProfile.username);
    closeProfileModal();
  };

  const handleSave = async () => {
    if (!isSavable || usernameLoading || !validUsername) return;
    const taken = await isUsernameTaken(username);
    if (taken) return;

    setSaveLoading(true);
    try {
      await editUserProfile(userProfile.uid, { username });
      await editUserProfileState({ username });
    } catch (error: any) {
      handleModalError(error);
    } finally {
      setTimeout(() => {
        setSaveLoading(false);
        closeProfileModal();
      }, 1500);
    }
  };

  if (saveLoading)
    return (
      <div className="flex w-full flex-grow flex-col space-y-2">
        <h2 className="text-center font-clashgrotesk text-2xl font-medium">Saving Username</h2>
        <Loading />
      </div>
    );

  return (
    <div className="flex w-full flex-grow flex-col">
      <h2 className="text-center font-clashgrotesk text-2xl font-medium">Change Username</h2>
      <div className="form-control mt-2">
        <label
          className={`flex grow flex-row rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
            validUsername || !username ? "bg-base-200" : "bg-input-error"
          }`}
        >
          <input
            type="text"
            placeholder="Display Name"
            maxLength={15}
            className="w-full bg-transparent focus:outline-none"
            id="displayname"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {usernameLoading && <Loading height={5} width={5} />}
        </label>
        <div className="mt-3 flex grow flex-row justify-center space-x-8">
          <button className="btn btn-neutral btn-sm" onClick={handleCancel}>
            cancel
          </button>
          <button
            className={`btn btn-success btn-sm ${isSavable ? "" : "btn-disabled"}`}
            onClick={handleSave}
          >
            save profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ChangeUsernameModal = ({ open, toggleChangeUsername }: ChangeUsernameModalProps) => {
  const { userProfile, editUserProfileState } = useAuthContext();

  return (
    <dialog id="changeusernamemodal" className="modal modal-middle" open={open}>
      <div className="modal-box flex w-80 flex-col bg-base-200 pb-4 pt-4">
        {userProfile ? (
          <ChangeUsernameForm
            toggleChangeUsername={toggleChangeUsername}
            userProfile={userProfile}
            editUserProfileState={editUserProfileState}
          />
        ) : (
          <Loading />
        )}
      </div>
    </dialog>
  );
};

const PremiumAccount = () => {
  const { userProfile } = useAuthContext();
  if (!userProfile) return <Loading />;

  if (userProfile.premium) {
    return (
      <div className="flex flex-col space-y-2">
        <span>
          You are now one of my elite employees! You have no benefits as of yet but it will soon
          {" come >:)"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <span>
        You are currently not a premium user. To become a premium user, you need to subscribe to{" "}
        <span className="font-sans">:3</span>
      </span>
      <button className="btn btn-outline btn-success btn-sm self-start rounded-xl pb-10">
        <span className="mt-[0.6rem] font-sans text-sm">Subscribe to :3</span>
      </button>
    </div>
  );
};

const DeleteAccount = () => {
  return (
    <div className="flex flex-col space-y-2">
      <span>
        If you delete your account, it <span className="font-bold">cannot</span> be recovered. All
        your information will be deleted.
      </span>
      <button className="btn btn-outline btn-error btn-sm self-start rounded-xl pb-10">
        <span className="mt-[0.6rem] text-sm">Delete Account</span>
      </button>
    </div>
  );
};

const AccountDetails = () => {
  const { userProfile } = useAuthContext();
  const [changeUsername, setChangeUsername] = useState(false);
  if (!userProfile) return <Loading />;

  const toggleChangeUsername = () => {
    setChangeUsername(!changeUsername);
  };

  const openModal = () => {
    const element = document.getElementById("changeusernamemodal");
    if (element instanceof HTMLDialogElement) {
      element.showModal();
      toggleChangeUsername();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <label className="text-2xl font-medium">Username</label>
          <span className="text-lg leading-5 text-gray-500">{userProfile.username}</span>
        </div>
        <button
          className="btn btn-outline btn-neutral btn-sm self-center rounded-xl pb-10"
          onClick={openModal}
        >
          <span className="mt-[0.6rem] text-sm">Change Username</span>
        </button>
      </div>
      <div className="flex flex-col">
        <label>Email</label>
        <span className="leading-4 text-gray-500">{userProfile.email}</span>
      </div>
      <div className="flex flex-col">
        <label>Status</label>
        <span className="leading-4 text-gray-500">{userProfile.status}</span>
      </div>
      <ChangeUsernameModal open={changeUsername} toggleChangeUsername={toggleChangeUsername} />
    </div>
  );
};

const AccountSettings = () => {
  return (
    <>
      <div className="pb-1">
        <h1 className="font-regular font-clashgrotesk text-5xl">Account</h1>
        <hr className="border-t border-gray-700" />
      </div>
      <AccountDetails />
      <div className="pt-3">
        <h1 className="font-regular font-clashgrotesk text-4xl">Premium Account</h1>
        <hr className="border-t border-gray-700" />
      </div>
      <PremiumAccount />
      <div className="pt-3">
        <h1 className="font-regular font-clashgrotesk text-4xl text-red-500">Delete Account</h1>
        <hr className="border-t border-gray-700" />
      </div>
      <DeleteAccount />
    </>
  );
};

export default AccountSettings;
