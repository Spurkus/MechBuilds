import { useAuthContext } from "@/src/context/Authentication";
import useInputValidator from "@/src/hooks/useInputValidator";
import { useState, useRef, useCallback } from "react";
import { USERNAME_REGEX } from "@/src/constants";
import { UserProfileType, EditUserProfileType } from "@/src/types/user";
import Loading from "@/src/components/General/Loading";
import { isUsernameTaken, editUserProfile, deleteUserAndUserKeyboard } from "@/src/helper/firestoreFunctions";
import { closeModal, showModal } from "@/src/helper/helperFunctions";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { InputNameField } from "@/src/components/Keyboard/AddEditKeyboard/Fields/InputFields";
import { useRouter } from "next/navigation";

interface ChangeUsernameModalProps {
  open: boolean;
  toggleChangeUsername: () => void;
}

interface ChangeUsernameFormProps {
  toggleChangeUsername: () => void;
  userProfile: UserProfileType;
  editUserProfileState: (newUserProfile: EditUserProfileType) => void;
}

interface DeleteAccountModalProps {
  open: boolean;
  toggleDeleteAccount: () => void;
}

interface DeleteAccountFormProps {
  toggleDeleteAccount: () => void;
  username: string;
}

const ChangeUsernameForm = ({ toggleChangeUsername, userProfile, editUserProfileState }: ChangeUsernameFormProps) => {
  const { handleModalError } = useGlobalModalContext();
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isSavable, setIsSavable] = useState(false);
  const usernameRef = useRef(0); // Reference to keep track of the current username check

  const usernameValidity = useCallback(
    async (name: string): Promise<boolean> => {
      const currentUsernameRef = ++usernameRef.current; // Increment reference for tracking username
      // Set loading states
      setUsernameLoading(true);
      setUsernameTaken(false);
      setIsSavable(false);

      // Check if the username is the same as the current user's username or if it is invalid
      if (name === userProfile.username || !USERNAME_REGEX.test(name)) {
        if (currentUsernameRef !== usernameRef.current) return false;
        setIsSavable(false);
        setUsernameLoading(false);
        return name === userProfile.username;
      }

      // Check if the username is taken
      const usernameTaken = await isUsernameTaken(name)
        .then((result) => {
          if (currentUsernameRef !== usernameRef.current) return false;
          setUsernameTaken(result);
          setIsSavable(!result);
          return !result;
        })
        .catch((error) => {
          if (currentUsernameRef !== usernameRef.current) return false;
          setIsSavable(false);
          handleModalError(error);
          return false;
        });

      if (currentUsernameRef !== usernameRef.current) return false;
      setUsernameLoading(false);
      return usernameTaken;
    },
    [userProfile.username, handleModalError],
  );

  const [username, setUsername, validUsername] = useInputValidator(userProfile.username, usernameValidity);

  const handleCancel = () => {
    setUsername(userProfile.username);
    closeModal("changeusernamemodal", toggleChangeUsername);
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
        closeModal("changeusernamemodal", toggleChangeUsername);
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
      <span className="text-sm leading-4 text-gray-500">
        Your username must be unique and can only contain lowercase letters
      </span>
      {usernameTaken && (
        <span className="mt-1 text-center text-sm font-semibold text-error">Username already taken</span>
      )}
      <div className={`form-control ${usernameTaken ? "mt-1" : "mt-2"}`}>
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
          {usernameLoading && !isSavable && <Loading height={15} width={15} />}
        </label>
        <div className="mt-3 flex grow flex-row justify-center space-x-8">
          <button className="btn btn-neutral btn-sm" onClick={handleCancel}>
            cancel
          </button>
          <button className={`btn btn-success btn-sm ${isSavable ? "" : "btn-disabled"}`} onClick={handleSave}>
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

const DeleteAccountForm = ({ toggleDeleteAccount, username }: DeleteAccountFormProps) => {
  const router = useRouter();
  const { logout, userProfile } = useAuthContext();
  const [usernameInput, setUsernameInput, validUsernameInput] = useInputValidator("", (name) => name === username);

  const handleCancel = () => {
    setUsernameInput("");
    closeModal("deleteaccountmodal", toggleDeleteAccount);
  };

  const handleDelete = async () => {
    if (!validUsernameInput) return;
    if (!userProfile) return;
    await deleteUserAndUserKeyboard(userProfile.uid).then(async () => {
      await logout();
      router.push("/");
    });
  };

  return (
    <div className="flex w-full flex-grow flex-col">
      <h2 className="text-center font-clashgrotesk text-2xl font-medium">Delete Account</h2>
      <span className="text-sm leading-4">
        If you delete your account, it <span className="font-bold">cannot</span> be recovered.
      </span>
      <span className="mt-1 text-sm leading-4">
        If you do wish to delete you account, please enter your username below and click the delete button.
      </span>
      <div className="form-control mt-2">
        <InputNameField
          type="usernamedelete"
          validName={validUsernameInput}
          name={usernameInput}
          nameChange={(e) => setUsernameInput(e.target.value)}
          namePlaceholder="Username"
          nameMaxLength={15}
          noInput={false}
        />
        <div className="mt-3 flex grow flex-row justify-center space-x-8">
          <button className="btn btn-neutral btn-sm" onClick={handleCancel}>
            cancel
          </button>
          <button className={`btn btn-error btn-sm ${validUsernameInput ? "" : "btn-disabled"}`} onClick={handleDelete}>
            delete user
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteAccountModal = ({ open, toggleDeleteAccount }: DeleteAccountModalProps) => {
  const { userProfile } = useAuthContext();

  return (
    <dialog id="deleteaccountmodal" className="modal modal-middle" open={open}>
      <div className="modal-box flex w-96 flex-col bg-base-200 pb-4 pt-4">
        {userProfile ? (
          <DeleteAccountForm toggleDeleteAccount={toggleDeleteAccount} username={userProfile.username} />
        ) : (
          <Loading />
        )}
      </div>
    </dialog>
  );
};

const DeleteAccount = () => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const toggleDeleteAccount = () => setDeleteAccount(!deleteAccount);
  return (
    <div className="flex flex-col space-y-2">
      <span>
        If you delete your account, it <span className="font-bold">cannot</span> be recovered. All your information will
        be deleted.
      </span>
      <button
        className="btn btn-outline btn-error btn-sm self-start rounded-xl pb-10"
        onClick={() => showModal("deleteaccountmodal", toggleDeleteAccount)}
      >
        <span className="mt-[0.6rem] text-sm">Delete Account</span>
      </button>
      <DeleteAccountModal open={deleteAccount} toggleDeleteAccount={() => setDeleteAccount(!deleteAccount)} />
    </div>
  );
};

const AccountDetails = () => {
  const { userProfile } = useAuthContext();
  const [changeUsername, setChangeUsername] = useState(false);
  if (!userProfile) return <Loading />;

  const toggleChangeUsername = () => setChangeUsername(!changeUsername);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <label className="text-2xl font-medium">Username</label>
          <span className="text-lg leading-5 text-gray-500">{userProfile.username}</span>
        </div>
        <button
          className="btn btn-outline btn-neutral btn-sm self-center rounded-xl pb-10"
          onClick={() => showModal("changeusernamemodal", toggleChangeUsername)}
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
