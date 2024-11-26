import Loading from "@/src/components/General/Loading";
import NextImage from "next/image";
import { useState } from "react";
import { formatLink, closeDropdown } from "@/src/helper/helperFunctions";
import { useAuthContext } from "@/src/context/Authentication";
import { DEFAULT_IMAGE_SIZE, DEFAULT_PRONOUNS } from "@/src/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLink } from "@fortawesome/free-solid-svg-icons";
import { formatPronouns } from "@/src/helper/helperFunctions";
import { EditProfileContextProvider, useEditProfileContext } from "@/src/context/EditProfileContext";

interface EditProfileProps {
  open: boolean;
  toggleEditProfile: () => void;
}

const ProfilePictureField = () => {
  const { setSelectedProfilePicture, setRemovedProfilePicture, imageSource } = useEditProfileContext();
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="flex grow flex-col space-y-2">
      <div
        className="avatar mask flex w-[30%] self-center sm:w-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <label className="relative w-full grow cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              setSelectedProfilePicture(e.target.files?.[0] || null);
              setRemovedProfilePicture(false);
            }}
          />
          <div
            className={`${isHovering ? "flex" : "hidden"} absolute inset-0 items-center justify-center rounded-[2.5rem] bg-black bg-opacity-60`}
          >
            <span className="text font-bold text-white">Change Profile Picture</span>
          </div>
          <NextImage
            src={imageSource}
            alt="Profile"
            className="aspect-square rounded-3xl sm:rounded-[2.5rem]"
            width={DEFAULT_IMAGE_SIZE}
            height={DEFAULT_IMAGE_SIZE}
            quality={100}
          />
        </label>
      </div>
      <button className="btn btn-outline btn-error btn-sm rounded-xl" onClick={() => setRemovedProfilePicture(true)}>
        remove profile picture
      </button>
    </div>
  );
};

const SocialLinksField = () => {
  const {
    socialLinkOne,
    setSocialLinkOne,
    validSocialLinkOne,
    socialLinkTwo,
    setSocialLinkTwo,
    validSocialLinkTwo,
    socialLinkThree,
    setSocialLinkThree,
    validSocialLinkThree,
  } = useEditProfileContext();
  const [isSocialLinkOneFocused, setSocialLinkOneFocused] = useState(false);
  const [isSocialLinkTwoFocused, setSocialLinkTwoFocused] = useState(false);
  const [isSocialLinkThreeFocused, setSocialLinkThreeFocused] = useState(false);
  return (
    <div className="flex flex-col">
      <label className="label pb-0 font-bold">Social Links</label>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-1.5">
          <FontAwesomeIcon icon={faLink} className="self-center text-gray-400" />
          <input
            type="text"
            placeholder="www.example.com"
            id="sociallinkone"
            maxLength={100}
            className={`grow truncate rounded-lg border border-gray-400 p-1 pl-2 text-sm focus:border-white ${
              validSocialLinkOne || !socialLinkOne ? "bg-base-200" : "bg-input-error"
            }`}
            autoComplete="off"
            onFocus={() => setSocialLinkOneFocused(true)}
            onBlur={() => setSocialLinkOneFocused(false)}
            onChange={(e) => setSocialLinkOne(e.target.value)}
            value={isSocialLinkOneFocused ? socialLinkOne : formatLink(socialLinkOne)}
          />
        </div>
        <div className="flex flex-row space-x-1.5">
          <FontAwesomeIcon icon={faLink} className="self-center text-gray-400" />
          <input
            type="text"
            placeholder="www.example.com"
            id="sociallinktwo"
            maxLength={100}
            className={`grow truncate rounded-lg border border-gray-400 p-1 pl-2 text-sm focus:border-white ${
              validSocialLinkTwo || !socialLinkTwo ? "bg-base-200" : "bg-input-error"
            }`}
            autoComplete="off"
            onFocus={() => setSocialLinkTwoFocused(true)}
            onBlur={() => setSocialLinkTwoFocused(false)}
            onChange={(e) => setSocialLinkTwo(e.target.value)}
            value={isSocialLinkTwoFocused ? socialLinkTwo : formatLink(socialLinkTwo)}
          />
        </div>
        <div className="flex flex-row space-x-1.5">
          <FontAwesomeIcon icon={faLink} className="self-center text-gray-400" />
          <input
            type="text"
            placeholder="www.example.com"
            id="sociallinkthree"
            maxLength={100}
            className={`grow truncate rounded-lg border border-gray-400 p-1 pl-2 text-sm focus:border-white ${
              validSocialLinkThree || !socialLinkThree ? "bg-base-200" : "bg-input-error"
            }`}
            autoComplete="off"
            onFocus={() => setSocialLinkThreeFocused(true)}
            onBlur={() => setSocialLinkThreeFocused(false)}
            onChange={(e) => setSocialLinkThree(e.target.value)}
            value={isSocialLinkThreeFocused ? socialLinkThree : formatLink(socialLinkThree)}
          />
        </div>
      </div>
    </div>
  );
};

const PronounsField = () => {
  const {
    pronouns,
    setPronouns,
    isCustom,
    setIsCustom,
    setCustomPronounDefault,
    validPronouns,
    customOne,
    customTwo,
    setCustomOne,
    setCustomTwo,
  } = useEditProfileContext();
  return (
    <div className="flex flex-col">
      <label className="label pb-0 font-bold">Pronouns</label>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm flex w-full grow flex-col items-center rounded-lg border border-gray-400 pl-2.5 text-sm hover:border-white focus:border-white"
        >
          <p className="self-start">{isCustom ? "custom" : formatPronouns(pronouns) || "Select Pronouns"}</p>
          <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4 self-end" />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[3] mt-2 w-full rounded-xl border border-white bg-base-100 p-[0.3rem] shadow"
        >
          {DEFAULT_PRONOUNS.map((pronoun, index) => (
            <li
              key={index}
              onClick={() => {
                setPronouns(pronoun);
                setCustomPronounDefault();
                setIsCustom(false);
                closeDropdown();
              }}
            >
              <a>{pronoun[0] === "" && pronoun[1] === "" ? "don't specify" : formatPronouns(pronoun)}</a>
            </li>
          ))}
          <li
            onClick={() => {
              closeDropdown();
              setIsCustom(true);
            }}
          >
            <a>custom</a>
          </li>
        </ul>
      </div>
      {isCustom && (
        <div className="mt-2 flex items-center space-x-1">
          <input
            type="text"
            placeholder="they"
            maxLength={6}
            className={`min-w-0 flex-1 rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
              validPronouns || (!customOne && !customTwo) ? "bg-base-200" : "bg-input-error"
            }`}
            id="custompronounone"
            autoComplete="off"
            onChange={(e) => setCustomOne(e.target.value)}
            value={customOne}
          />
          <a className="text-gray-500">/</a>
          <input
            type="text"
            placeholder="them"
            maxLength={6}
            className={`min-w-0 flex-1 rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
              validPronouns || (!customOne && !customTwo) ? "bg-base-200" : "bg-input-error"
            }`}
            id="custompronountwo"
            autoComplete="off"
            onChange={(e) => setCustomTwo(e.target.value)}
            value={customTwo}
          />
        </div>
      )}
    </div>
  );
};

const BioField = () => {
  const { bio, setBio, validBio } = useEditProfileContext();
  return (
    <>
      <label className="label pb-0 font-bold">Bio</label>
      <textarea
        placeholder="Bio"
        maxLength={150}
        className={`h-20 grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
          validBio || !bio ? "bg-base-200" : "bg-input-error"
        }`}
        id="bio"
        autoComplete="off"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
    </>
  );
};

const DisplayNameField = () => {
  const { displayName, setDisplayName, validDisplayName } = useEditProfileContext();
  return (
    <>
      <label className="label pb-0 font-bold">Display Name</label>
      <input
        type="text"
        placeholder="Display Name"
        maxLength={15}
        className={`grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
          validDisplayName || !displayName ? "bg-base-200" : "bg-input-error"
        }`}
        id="displayname"
        autoComplete="off"
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
      />
    </>
  );
};

const CancelAndSaveButtons = () => {
  const { isSavable, handleCancel, handleSave } = useEditProfileContext();
  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCancel();
  };
  return (
    <form method="dialog" className="flex grow flex-row justify-center space-x-8">
      <button className="btn btn-neutral btn-sm" onClick={handleCancelButton}>
        cancel
      </button>
      <button className={`btn btn-success btn-sm ${isSavable ? "" : "btn-disabled"}`} onClick={handleSave}>
        save profile
      </button>
    </form>
  );
};

const EditProfileForm = () => {
  const { loading } = useEditProfileContext();

  // Saving profile loading state
  if (loading)
    return (
      <div className="flex w-full flex-grow flex-col space-y-2">
        <h2 className="text-center font-clashgrotesk text-2xl font-medium">Saving Profile</h2>
        <Loading />
      </div>
    );

  return (
    <div className="flex w-full flex-grow flex-col">
      <h2 className="text-center font-clashgrotesk text-2xl font-medium">Edit Profile</h2>
      <ProfilePictureField />
      <div className="form-control">
        <DisplayNameField />
        <PronounsField />
        <BioField />
        <SocialLinksField />
      </div>
      <div className="mt-4">
        <CancelAndSaveButtons />
      </div>
    </div>
  );
};

const EditProfile = ({ open, toggleEditProfile }: EditProfileProps) => {
  const { userProfile } = useAuthContext();
  return (
    <dialog id="editprofilemodal" className="modal modal-bottom sm:modal-middle" open={open}>
      <div className="modal-box flex flex-col bg-base-200 pb-4 pt-4 sm:w-80">
        {userProfile ? (
          <EditProfileContextProvider userProfile={userProfile} toggleEditProfile={toggleEditProfile} open={open}>
            <EditProfileForm />
          </EditProfileContextProvider>
        ) : (
          <Loading />
        )}
      </div>
    </dialog>
  );
};

export default EditProfile;
