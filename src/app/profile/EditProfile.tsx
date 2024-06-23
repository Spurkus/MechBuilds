import Loading from "@/src/components/Loading";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { adjustImageUrl, formatSocialLink, closeDropdown } from "@/src/helper/helperFunctions";
import { UserProfileType } from "@/src/context/Authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLink } from "@fortawesome/free-solid-svg-icons";
import { formatPronouns } from "@/src/helper/helperFunctions";
import { updateUserProfile, uploadProfilePicture } from "@/src/helper/firestoreFunctions";
import { useGlobalModalContext } from "@/src/context/GlobalModal";

const DEFAULT_IMAGE_SIZE = 1000;
const DEFAULT_PRONOUNS: [string, string][] = [
  ["", ""],
  ["he", "him"],
  ["she", "her"],
  ["they", "them"],
];

const DISPLAY_NAME_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-. @&#:]{2,20}$/;
const BIO_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-.?!@#$%^&*()_+=\[\]{}|\\;:"<>,/ \n]{0,150}$/;
const PRONOUNS_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]{1,6}$/;
const SOCIAL_LINK_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

interface EditProfileProps {
  open: boolean;
  toggleEditProfile: () => void;
  userProfile: UserProfileType | null;
  editUserProfile: (newUserProfile: UserProfileType) => void;
}

interface EditProfileComponentProps {
  toggleEditProfile: () => void;
  userProfile: UserProfileType;
  editUserProfile: (newUserProfile: UserProfileType) => void;
}

interface PronounsFieldProps {
  pronouns: [string, string];
  setPronouns: (pronouns: [string, string]) => void;
  validPronouns: boolean;
  setValidPronouns: (validPronouns: boolean) => void;
  isCustomSelected: boolean;
  setIsCustomSelected: (isCustomSelected: boolean) => void;
  customOne: string;
  setCustomOne: (customOne: string) => void;
  customTwo: string;
  setCustomTwo: (customTwo: string) => void;
}

interface SocialLinksFieldProps {
  socialLinks: string[];
  setSocialLink: (socialLinks: string[]) => void;
  setValidSocialLinks: (validSocialLinks: boolean) => void;
}

interface ProfilePictureFieldProps {
  selectedProfilePicture: File | null;
  setSelectedProfilePicture: (selectedProfilePicture: File | null) => void;
  defaultProfilePicture: string;
}

const ProfilePictureField = ({
  selectedProfilePicture,
  setSelectedProfilePicture,
  defaultProfilePicture,
}: ProfilePictureFieldProps) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="avatar mask flex w-full grow self-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <label className="relative w-full grow cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setSelectedProfilePicture(e.target.files?.[0] || null)}
        />
        <div
          className={`${isHovering ? "flex" : "hidden"} absolute inset-0 items-center justify-center rounded-[2.5rem] bg-black bg-opacity-60`}
        >
          <span className="text font-satoshi font-bold text-white">Change Profile Picture</span>
        </div>
        <Image
          src={
            selectedProfilePicture
              ? URL.createObjectURL(selectedProfilePicture)
              : adjustImageUrl(defaultProfilePicture, DEFAULT_IMAGE_SIZE)
          }
          alt="Profile"
          className="aspect-square rounded-[2.5rem]"
          width={DEFAULT_IMAGE_SIZE}
          height={DEFAULT_IMAGE_SIZE}
          quality={100}
        />
      </label>
    </div>
  );
};

const SocialLinksField = ({
  socialLinks,
  setSocialLink,
  setValidSocialLinks,
}: SocialLinksFieldProps) => {
  const [socialLinkOne, setSocialLinkOne] = useState(socialLinks[0] || "");
  const [socialLinkTwo, setSocialLinkTwo] = useState(socialLinks[1] || "");
  const [socialLinkThree, setSocialLinkThree] = useState(socialLinks[2] || "");
  const [validSocialLinkOne, setValidSocialLinkOne] = useState(true);
  const [validSocialLinkTwo, setValidSocialLinkTwo] = useState(true);
  const [validSocialLinkThree, setValidSocialLinkThree] = useState(true);
  const [isSocialLinkOneFocused, setSocialLinkOneFocused] = useState(false);
  const [isSocialLinkTwoFocused, setSocialLinkTwoFocused] = useState(false);
  const [isSocialLinkThreeFocused, setSocialLinkThreeFocused] = useState(false);

  // Test validity of social links
  useEffect(() => {
    setValidSocialLinkOne(!socialLinkOne || SOCIAL_LINK_REGEX.test(socialLinkOne));
    setValidSocialLinkTwo(!socialLinkTwo || SOCIAL_LINK_REGEX.test(socialLinkTwo));
    setValidSocialLinkThree(!socialLinkThree || SOCIAL_LINK_REGEX.test(socialLinkThree));
  }, [socialLinkOne, socialLinkTwo, socialLinkThree]);

  // Create social link list
  useEffect(() => {
    const links = [socialLinkOne, socialLinkTwo, socialLinkThree].filter((link) => link !== "");
    setSocialLink(links);
  }, [socialLinkOne, socialLinkTwo, socialLinkThree, setSocialLink]);

  return (
    <div className="flex flex-col">
      <label className="label pb-0 font-satoshi font-bold">Social Links</label>
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
            value={isSocialLinkOneFocused ? socialLinkOne : formatSocialLink(socialLinkOne)}
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
            value={isSocialLinkTwoFocused ? socialLinkTwo : formatSocialLink(socialLinkTwo)}
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
            value={isSocialLinkThreeFocused ? socialLinkThree : formatSocialLink(socialLinkThree)}
          />
        </div>
      </div>
    </div>
  );
};

const PronounsField = ({
  pronouns,
  setPronouns,
  validPronouns,
  setValidPronouns,
  isCustomSelected,
  setIsCustomSelected,
  customOne,
  setCustomOne,
  customTwo,
  setCustomTwo,
}: PronounsFieldProps) => {
  // Test validity of custom pronouns
  useEffect(() => {
    setValidPronouns(
      isCustomSelected ? PRONOUNS_REGEX.test(customOne) && PRONOUNS_REGEX.test(customTwo) : true,
    );
  }, [customOne, customTwo, setValidPronouns, isCustomSelected]);

  useEffect(() => {
    if (isCustomSelected) {
      setPronouns([customOne, customTwo]);
    }
  }, [customOne, customTwo, isCustomSelected, setPronouns]);

  const setCustomPronounDefault = () => {
    setCustomOne("");
    setCustomTwo("");
  };

  return (
    <div className="flex flex-col">
      <label className="label pb-0 font-satoshi font-bold">Pronouns</label>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm flex w-full grow flex-col items-center rounded-lg border border-gray-400 pl-2.5 text-sm hover:border-white focus:border-white"
        >
          <p className="self-start">
            {isCustomSelected ? "custom" : formatPronouns(pronouns) || "Select Pronouns"}
          </p>
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
                setIsCustomSelected(false);
                closeDropdown();
              }}
            >
              <a>
                {pronoun[0] === "" && pronoun[1] === "" ? "don't specify" : formatPronouns(pronoun)}
              </a>
            </li>
          ))}
          <li
            onClick={() => {
              closeDropdown();
              setIsCustomSelected(true);
            }}
          >
            <a>custom</a>
          </li>
        </ul>
      </div>
      {isCustomSelected && (
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
          <a className="font-satoshi text-gray-500">/</a>
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

const checkDefaultPronouns = (pronouns: [string, string]) => {
  return DEFAULT_PRONOUNS.some(
    (defaultPronoun) => defaultPronoun[0] === pronouns[0] && defaultPronoun[1] === pronouns[1],
  );
};

const EditProfileForm = ({
  toggleEditProfile,
  userProfile,
  editUserProfile,
}: EditProfileComponentProps) => {
  const { handleModalError } = useGlobalModalContext();

  // Check display name
  const [displayName, setDisplayName] = useState(userProfile.displayName);
  const [validDisplayName, setValidDisplayName] = useState(DISPLAY_NAME_REGEX.test(displayName));

  // Check bio
  const [bio, setBio] = useState(userProfile.bio);
  const [validBio, setValidBio] = useState(DISPLAY_NAME_REGEX.test(bio));

  // Check pronouns
  const [pronouns, setPronouns] = useState(userProfile.pronouns);
  const [isCustom, setIsCustom] = useState(!checkDefaultPronouns(userProfile.pronouns));
  const [customOne, setCustomOne] = useState(isCustom ? pronouns[0] : "");
  const [customTwo, setCustomTwo] = useState(isCustom ? pronouns[1] : "");
  const [validPronouns, setValidPronouns] = useState(
    isCustom ? PRONOUNS_REGEX.test(customOne) && PRONOUNS_REGEX.test(customTwo) : true,
  );

  // Check social links
  const [socialLinks, setSocialLinks] = useState(userProfile.socialLinks);
  const [validSocialLinks, setValidSocialLinks] = useState(
    socialLinks.every((link) => SOCIAL_LINK_REGEX.test(link)),
  );

  // Select Image
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File | null>(null);

  // Loading state when saving
  const [loading, setLoading] = useState(false);

  // Check if profile is savable
  const isSavable = useMemo(() => {
    return validDisplayName && validPronouns && validBio && validSocialLinks && !loading;
  }, [validDisplayName, validPronouns, validBio, validSocialLinks, loading]);

  // Check validity of display name, bio (the rest are handled within their components)
  useEffect(() => {
    setValidDisplayName(DISPLAY_NAME_REGEX.test(displayName));
    setValidBio(BIO_REGEX.test(bio));
  }, [displayName, bio]);

  const setDefault = () => {
    // Default display name
    setDisplayName(userProfile.displayName);
    setValidDisplayName(DISPLAY_NAME_REGEX.test(displayName));

    // Default bio
    setBio(userProfile.bio);
    setValidBio(BIO_REGEX.test(bio));

    // Default pronouns
    setPronouns(userProfile.pronouns);
    setIsCustom(!checkDefaultPronouns(userProfile.pronouns));
    setCustomOne(isCustom ? pronouns[0] : "");
    setCustomTwo(isCustom ? pronouns[1] : "");
    setValidPronouns(
      isCustom ? PRONOUNS_REGEX.test(customOne) && PRONOUNS_REGEX.test(customTwo) : true,
    );

    // Default social links
    setSocialLinks(userProfile.socialLinks);
    setValidSocialLinks(socialLinks.every((link) => SOCIAL_LINK_REGEX.test(link)));
    setSelectedProfilePicture(null);
  };

  const closeProfileModal = () => {
    const element = document.getElementById("editprofilemodal");
    if (element instanceof HTMLDialogElement) {
      element.close();
      toggleEditProfile();
    }
  };

  const handleCancel = () => {
    setDefault();
    closeProfileModal();
  };

  const handleSave = async () => {
    if (!isSavable || loading) return;
    setLoading(true);
    try {
      const profilePictureURL = await uploadProfilePicture(selectedProfilePicture, userProfile);
      const newUserProfile: UserProfileType = {
        uid: userProfile.uid,
        email: userProfile.email,
        username: userProfile.username,
        displayName: displayName,
        profilePicture: profilePictureURL ? profilePictureURL : userProfile.profilePicture,
        premium: userProfile.premium,
        status: userProfile.status,
        joinedDate: userProfile.joinedDate,
        lastActive: new Date(),
        bio: bio,
        socialLinks: socialLinks,
        pronouns: pronouns,
      };
      await updateUserProfile(newUserProfile);
      await editUserProfile(newUserProfile);
    } catch (error: any) {
      handleModalError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        closeProfileModal();
      }, 1500);
    }
  };

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
      <ProfilePictureField
        selectedProfilePicture={selectedProfilePicture}
        setSelectedProfilePicture={setSelectedProfilePicture}
        defaultProfilePicture={userProfile.profilePicture}
      />
      <div className="form-control">
        <label className="label pb-0 font-satoshi font-bold">Display Name</label>
        <input
          type="text"
          placeholder="Display Name"
          maxLength={20}
          className={`grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
            validDisplayName || !displayName ? "bg-base-200" : "bg-input-error"
          }`}
          id="displayname"
          autoComplete="off"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
        <PronounsField
          pronouns={pronouns}
          setPronouns={setPronouns}
          validPronouns={validPronouns}
          setValidPronouns={setValidPronouns}
          isCustomSelected={isCustom}
          setIsCustomSelected={setIsCustom}
          customOne={customOne}
          setCustomOne={setCustomOne}
          customTwo={customTwo}
          setCustomTwo={setCustomTwo}
        />
        <label className="label pb-0 font-satoshi font-bold">Bio</label>
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
        <SocialLinksField
          socialLinks={socialLinks}
          setSocialLink={setSocialLinks}
          setValidSocialLinks={setValidSocialLinks}
        />
      </div>
      <div className="mt-4">
        <form method="dialog" className="flex grow flex-row justify-center space-x-8">
          <button className="btn btn-neutral btn-sm" onClick={handleCancel}>
            cancel
          </button>
          <button
            className={`btn btn-success btn-sm ${isSavable ? "" : "btn-disabled"}`}
            onClick={handleSave}
          >
            save profile
          </button>
        </form>
      </div>
    </div>
  );
};

const EditProfile = ({
  open,
  toggleEditProfile,
  userProfile,
  editUserProfile,
}: EditProfileProps) => {
  return (
    <dialog id="editprofilemodal" className="modal modal-middle" open={open}>
      <div className="modal-box flex w-80 flex-col bg-base-200 pb-4 pt-4">
        {userProfile ? (
          <EditProfileForm
            toggleEditProfile={toggleEditProfile}
            userProfile={userProfile}
            editUserProfile={editUserProfile}
          />
        ) : (
          <Loading />
        )}
      </div>
    </dialog>
  );
};

export default EditProfile;
