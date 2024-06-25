"use client";
import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { areArraysEqual, adjustImageUrl } from "@/src/helper/helperFunctions";
import { UserProfileType, DEFAULT_PROFILE_PICTURE } from "./Authentication";
import { DISPLAY_NAME_REGEX } from "./Authentication";
import { useGlobalModalContext } from "./GlobalModal";

export const MEGABYTES = 1048 * 1048;
export const DEFAULT_IMAGE_SIZE = 1000;
export const MAXIMUM_IMAGE_SIZE = 5 * MEGABYTES;
export const DEFAULT_PRONOUNS: [string, string][] = [
  ["", ""],
  ["he", "him"],
  ["she", "her"],
  ["they", "them"],
];
export const BIO_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-.?!@#$%^&*()_+=\[\]{}|\\;:"<>,/ \n]{0,150}$/;
export const PRONOUNS_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]{1,6}$/;
export const SOCIAL_LINK_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export interface EditProfileContextType {
  userProfile: UserProfileType;

  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  validDisplayName: boolean;

  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  validBio: boolean;

  pronouns: [string, string];
  setPronouns: React.Dispatch<React.SetStateAction<[string, string]>>;
  isCustom: boolean;
  setIsCustom: React.Dispatch<React.SetStateAction<boolean>>;
  customOne: string;
  setCustomOne: React.Dispatch<React.SetStateAction<string>>;
  customTwo: string;
  setCustomTwo: React.Dispatch<React.SetStateAction<string>>;
  validPronouns: boolean;
  setCustomPronounDefault: () => void;

  socialLinks: string[];
  setSocialLinks: React.Dispatch<React.SetStateAction<string[]>>;
  validSocialLinks: boolean;
  socialLinkOne: string;
  setSocialLinkOne: React.Dispatch<React.SetStateAction<string>>;
  socialLinkTwo: string;
  setSocialLinkTwo: React.Dispatch<React.SetStateAction<string>>;
  socialLinkThree: string;
  setSocialLinkThree: React.Dispatch<React.SetStateAction<string>>;
  validSocialLinkOne: boolean;
  validSocialLinkTwo: boolean;
  validSocialLinkThree: boolean;

  selectedProfilePicture: File | null;
  setSelectedProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  removedProfilePicture: boolean;
  setRemovedProfilePicture: React.Dispatch<React.SetStateAction<boolean>>;
  source: string;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  isSavable: boolean;

  setDefault: () => void;

  toggleEditProfile: () => void;
}

export interface EditProfileContextProps {
  userProfile: UserProfileType;
  toggleEditProfile: () => void;
  children: React.ReactNode;
}

const checkDefaultPronouns = (pronouns: [string, string]) => {
  return DEFAULT_PRONOUNS.some((defaultPronoun) => areArraysEqual(defaultPronoun, pronouns));
};

export const EditProfileContext = createContext<EditProfileContextType | null>(null);

export const EditProfileContextProvider = ({
  children,
  userProfile,
  toggleEditProfile,
}: EditProfileContextProps) => {
  const { handleModal } = useGlobalModalContext();
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
  const [socialLinkOne, setSocialLinkOne] = useState(userProfile.socialLinks[0] || "");
  const [socialLinkTwo, setSocialLinkTwo] = useState(userProfile.socialLinks[1] || "");
  const [socialLinkThree, setSocialLinkThree] = useState(userProfile.socialLinks[2] || "");
  const [validSocialLinkOne, setValidSocialLinkOne] = useState(
    !userProfile.socialLinks[0] || SOCIAL_LINK_REGEX.test(userProfile.socialLinks[0]),
  );
  const [validSocialLinkTwo, setValidSocialLinkTwo] = useState(
    !userProfile.socialLinks[1] || SOCIAL_LINK_REGEX.test(userProfile.socialLinks[1]),
  );
  const [validSocialLinkThree, setValidSocialLinkThree] = useState(
    !userProfile.socialLinks[2] || SOCIAL_LINK_REGEX.test(userProfile.socialLinks[2]),
  );

  // Select Image
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File | null>(null);
  const [removedProfilePicture, setRemovedProfilePicture] = useState(false);

  // Loading state when saving
  const [loading, setLoading] = useState(false);

  // Check if profile is savable
  const isSavable = useMemo(() => {
    const valid = validDisplayName && validPronouns && validBio && validSocialLinks && !loading;
    const changed =
      displayName !== userProfile.displayName ||
      bio !== userProfile.bio ||
      !areArraysEqual(pronouns, userProfile.pronouns) ||
      !areArraysEqual(socialLinks, userProfile.socialLinks) ||
      !!selectedProfilePicture ||
      removedProfilePicture;

    return valid && changed;
  }, [
    validDisplayName,
    validPronouns,
    validBio,
    validSocialLinks,
    loading,
    userProfile,
    displayName,
    bio,
    pronouns,
    socialLinks,
    selectedProfilePicture,
    removedProfilePicture,
  ]);

  const source = useMemo(() => {
    return removedProfilePicture
      ? adjustImageUrl(DEFAULT_PROFILE_PICTURE, DEFAULT_IMAGE_SIZE)
      : selectedProfilePicture
        ? URL.createObjectURL(selectedProfilePicture)
        : userProfile.profilePicture;
  }, [removedProfilePicture, selectedProfilePicture, userProfile.profilePicture]);

  // Check validity of display name, bio
  useEffect(() => {
    setValidDisplayName(DISPLAY_NAME_REGEX.test(displayName));
    setValidBio(BIO_REGEX.test(bio));
  }, [displayName, bio]);

  // Test validity of custom pronouns
  useEffect(() => {
    setValidPronouns(
      isCustom ? PRONOUNS_REGEX.test(customOne) && PRONOUNS_REGEX.test(customTwo) : true,
    );
  }, [customOne, customTwo, setValidPronouns, isCustom]);

  useEffect(() => {
    if (isCustom) {
      setPronouns([customOne, customTwo]);
    }
  }, [customOne, customTwo, isCustom, setPronouns]);

  const setCustomPronounDefault = () => {
    setCustomOne("");
    setCustomTwo("");
  };

  // Test validity of social links
  useEffect(() => {
    setValidSocialLinkOne(!socialLinkOne || SOCIAL_LINK_REGEX.test(socialLinkOne));
    setValidSocialLinkTwo(!socialLinkTwo || SOCIAL_LINK_REGEX.test(socialLinkTwo));
    setValidSocialLinkThree(!socialLinkThree || SOCIAL_LINK_REGEX.test(socialLinkThree));
  }, [
    socialLinkOne,
    socialLinkTwo,
    socialLinkThree,
    setValidSocialLinkOne,
    setValidSocialLinkTwo,
    setValidSocialLinkThree,
  ]);

  useEffect(() => {
    setValidSocialLinks(validSocialLinkOne && validSocialLinkTwo && validSocialLinkThree);
  }, [validSocialLinkOne, validSocialLinkTwo, validSocialLinkThree, setValidSocialLinks]);

  // Create social link list
  useEffect(() => {
    const links = [socialLinkOne, socialLinkTwo, socialLinkThree].filter((link) => link !== "");
    setSocialLinks(links);
  }, [socialLinkOne, socialLinkTwo, socialLinkThree, setSocialLinks]);

  // Validate profile picture
  useEffect(() => {
    if (selectedProfilePicture) {
      if (selectedProfilePicture.size > MAXIMUM_IMAGE_SIZE) {
        handleModal("Profile Picture", "Image size must be less than 5MB", "error");
        setSelectedProfilePicture(null);
      } else {
        const imageUrl = URL.createObjectURL(selectedProfilePicture);
        const img = new Image();
        img.onload = () => {
          if (img.width < 250 || img.height < 250) {
            handleModal("Profile Picture", "Image size must be bigger than 250x250px", "error");
            setSelectedProfilePicture(null);
          }
          URL.revokeObjectURL(imageUrl); // Clean up
        };
        img.onerror = () => {
          handleModal("Error", "Could not load the image", "error");
          setSelectedProfilePicture(null);
          URL.revokeObjectURL(imageUrl); // Clean up
        };
        img.src = imageUrl;
      }
    }
  }, [selectedProfilePicture, setSelectedProfilePicture, handleModal]);

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
    setCustomOne(!checkDefaultPronouns(userProfile.pronouns) ? userProfile.pronouns[0] : "");
    setCustomTwo(!checkDefaultPronouns(userProfile.pronouns) ? userProfile.pronouns[1] : "");
    setValidPronouns(
      isCustom ? PRONOUNS_REGEX.test(customOne) && PRONOUNS_REGEX.test(customTwo) : true,
    );

    // Default social links
    setSocialLinks(userProfile.socialLinks);
    setValidSocialLinks(userProfile.socialLinks.every((link) => SOCIAL_LINK_REGEX.test(link)));
    setSocialLinkOne(userProfile.socialLinks[0] || "");
    setSocialLinkTwo(userProfile.socialLinks[1] || "");
    setSocialLinkThree(userProfile.socialLinks[2] || "");
    setValidSocialLinkOne(
      !userProfile.socialLinks[0] || SOCIAL_LINK_REGEX.test(userProfile.socialLinks[0]),
    );
    setValidSocialLinkTwo(
      !userProfile.socialLinks[1] || SOCIAL_LINK_REGEX.test(userProfile.socialLinks[1]),
    );
    setValidSocialLinkThree(
      !userProfile.socialLinks[2] || SOCIAL_LINK_REGEX.test(userProfile.socialLinks[2]),
    );

    // Default profile picture
    setSelectedProfilePicture(null);
    setRemovedProfilePicture(false);
  };

  return (
    <EditProfileContext.Provider
      value={{
        userProfile,
        displayName,
        setDisplayName,
        validDisplayName,
        bio,
        setBio,
        validBio,
        pronouns,
        setPronouns,
        isCustom,
        setIsCustom,
        customOne,
        setCustomOne,
        customTwo,
        setCustomTwo,
        setCustomPronounDefault,
        validPronouns,
        socialLinks,
        setSocialLinks,
        validSocialLinks,
        socialLinkOne,
        setSocialLinkOne,
        socialLinkTwo,
        setSocialLinkTwo,
        socialLinkThree,
        setSocialLinkThree,
        validSocialLinkOne,
        validSocialLinkTwo,
        validSocialLinkThree,
        selectedProfilePicture,
        setSelectedProfilePicture,
        removedProfilePicture,
        setRemovedProfilePicture,
        source,
        loading,
        setLoading,
        isSavable,
        setDefault,
        toggleEditProfile,
      }}
    >
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfileContext = () => {
  const context = useContext(EditProfileContext);
  if (!context) {
    throw new Error("useEditProfileContext must be used within a EditProfileContextProvider");
  }
  return context;
};
