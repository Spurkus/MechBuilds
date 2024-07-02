"use client";
import { useState, useEffect, useMemo, createContext, useContext, useCallback } from "react";
import useInputValidator from "@/src/hooks/useInputValidator";
import { areArraysEqual, adjustImageURL, linkValidation } from "@/src/helper/helperFunctions";
import {
  editUserProfile,
  uploadProfilePicture,
  getDefaultProfilePictureURL,
} from "@/src/helper/firestoreFunctions";
import { UserProfileType, EditUserProfileType } from "@/src/types/user";
import {
  DEFAULT_PRONOUNS,
  DISPLAY_NAME_REGEX,
  BIO_REGEX,
  PRONOUNS_REGEX,
  LINK_REGEX,
  DEFAULT_PROFILE_PICTURE,
  DEFAULT_IMAGE_SIZE,
  MAXIMUM_IMAGE_SIZE,
} from "@/src/constants";
import { useGlobalModalContext } from "./GlobalModal";
import { useAuthContext } from "./Authentication";
import { StaticImageData } from "next/image";

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
  imageSource: string | StaticImageData;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  isSavable: boolean;

  setDefault: () => void;

  toggleEditProfile: () => void;

  closeProfileModal: () => void;
  handleCancel: () => void;
  handleSave: () => void;
}

export interface EditProfileContextProps {
  children: React.ReactNode;
  userProfile: UserProfileType;
  toggleEditProfile: () => void;
  open: boolean;
}

const checkDefaultPronouns = (pronouns: [string, string]) => {
  return DEFAULT_PRONOUNS.some((defaultPronoun) => areArraysEqual(defaultPronoun, pronouns));
};

export const EditProfileContext = createContext<EditProfileContextType | null>(null);

export const EditProfileContextProvider = ({
  children,
  userProfile,
  toggleEditProfile,
  open,
}: EditProfileContextProps) => {
  const { handleModal, handleModalError } = useGlobalModalContext();
  const { editUserProfileState } = useAuthContext();

  // Check Display name
  const displayNameValidation = (name: string) => DISPLAY_NAME_REGEX.test(name);
  const [displayName, setDisplayName, validDisplayName] = useInputValidator(
    userProfile.displayName,
    displayNameValidation,
  );

  // Check bio
  const bioValidation = (bio: string) => BIO_REGEX.test(bio);
  const [bio, setBio, validBio] = useInputValidator(userProfile.bio, bioValidation);

  // Check pronouns
  const [isCustom, setIsCustom] = useState(!checkDefaultPronouns(userProfile.pronouns));
  const [customOne, setCustomOne] = useState(isCustom ? userProfile.pronouns[0] : "");
  const [customTwo, setCustomTwo] = useState(isCustom ? userProfile.pronouns[1] : "");

  const pronounsValidation = () =>
    isCustom ? PRONOUNS_REGEX.test(customOne) && PRONOUNS_REGEX.test(customTwo) : true;
  const [pronouns, setPronouns, validPronouns] = useInputValidator(
    userProfile.pronouns,
    pronounsValidation,
  );

  // Check social links
  const socialLinksValidation = (links: string[]) => links.every((link) => LINK_REGEX.test(link));
  const [socialLinks, setSocialLinks, validSocialLinks] = useInputValidator(
    userProfile.socialLinks,
    socialLinksValidation,
  );

  const [socialLinkOne, setSocialLinkOne, validSocialLinkOne] = useInputValidator(
    userProfile.socialLinks[0] || "",
    linkValidation,
  );
  const [socialLinkTwo, setSocialLinkTwo, validSocialLinkTwo] = useInputValidator(
    userProfile.socialLinks[1] || "",
    linkValidation,
  );
  const [socialLinkThree, setSocialLinkThree, validSocialLinkThree] = useInputValidator(
    userProfile.socialLinks[2] || "",
    linkValidation,
  );

  // Select Image
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File | null>(null);
  const [removedProfilePicture, setRemovedProfilePicture] = useState(false);

  // Loading state when saving
  const [loading, setLoading] = useState(false);

  // Check if any changes are made
  const changed = useMemo(() => {
    return (
      displayName !== userProfile.displayName ||
      bio !== userProfile.bio ||
      !areArraysEqual(pronouns, userProfile.pronouns) ||
      !areArraysEqual(socialLinks, userProfile.socialLinks) ||
      !!selectedProfilePicture ||
      removedProfilePicture
    );
  }, [
    displayName,
    bio,
    pronouns,
    socialLinks,
    selectedProfilePicture,
    removedProfilePicture,
    userProfile,
  ]);

  // Check if profile is savable
  const isSavable = useMemo(() => {
    const valid = validDisplayName && validPronouns && validBio && validSocialLinks && !loading;
    return valid && changed;
  }, [changed, validDisplayName, validPronouns, validBio, validSocialLinks, loading]);

  // Get source for profile picture
  const imageSource = useMemo(() => {
    return removedProfilePicture
      ? DEFAULT_PROFILE_PICTURE
      : selectedProfilePicture
        ? URL.createObjectURL(selectedProfilePicture)
        : adjustImageURL(userProfile.profilePicture, DEFAULT_IMAGE_SIZE);
  }, [removedProfilePicture, selectedProfilePicture, userProfile.profilePicture]);

  useEffect(() => {
    if (isCustom) {
      setPronouns([customOne, customTwo]);
    }
  }, [customOne, customTwo, isCustom, setPronouns]);

  const setCustomPronounDefault = () => {
    setCustomOne("");
    setCustomTwo("");
  };

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

  // Setting default states
  const setDefault = useCallback(() => {
    setDisplayName(userProfile.displayName);
    setBio(userProfile.bio);

    // Default pronouns
    setPronouns(userProfile.pronouns);
    setIsCustom(!checkDefaultPronouns(userProfile.pronouns));
    setCustomOne(!checkDefaultPronouns(userProfile.pronouns) ? userProfile.pronouns[0] : "");
    setCustomTwo(!checkDefaultPronouns(userProfile.pronouns) ? userProfile.pronouns[1] : "");

    // Default social links
    setSocialLinks(userProfile.socialLinks);
    setSocialLinkOne(userProfile.socialLinks[0] || "");
    setSocialLinkTwo(userProfile.socialLinks[1] || "");
    setSocialLinkThree(userProfile.socialLinks[2] || "");

    // Default profile picture
    setSelectedProfilePicture(null);
    setRemovedProfilePicture(false);
  }, [
    setBio,
    setDisplayName,
    setPronouns,
    setSocialLinkOne,
    setSocialLinkThree,
    setSocialLinkTwo,
    setSocialLinks,
    userProfile.bio,
    userProfile.displayName,
    userProfile.pronouns,
    userProfile.socialLinks,
  ]);

  const closeProfileModal = useCallback(() => {
    const element = document.getElementById("editprofilemodal");
    if (element instanceof HTMLDialogElement) {
      element.close();
      toggleEditProfile();
    }
  }, [toggleEditProfile]);

  const handleCancel = useCallback(() => {
    setDefault();
    closeProfileModal();
  }, [closeProfileModal, setDefault]);

  const handleSave = async () => {
    if (!isSavable || loading) return;
    setLoading(true);
    try {
      const profilePictureURL = removedProfilePicture
        ? await getDefaultProfilePictureURL()
        : await uploadProfilePicture(selectedProfilePicture, userProfile);
      const fieldsToUpdate: EditUserProfileType = {
        displayName: displayName,
        profilePicture: profilePictureURL ? profilePictureURL : userProfile.profilePicture,
        lastActive: new Date(),
        bio: bio,
        pronouns: pronouns,
        socialLinks: socialLinks,
      };
      await editUserProfile(userProfile.uid, fieldsToUpdate);
      await editUserProfileState(fieldsToUpdate);
    } catch (error: any) {
      handleModalError(error);
      setDefault();
    } finally {
      setTimeout(() => {
        setLoading(false);
        closeProfileModal();
      }, 1500);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading && open) {
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown); // Add event listener
    return () => document.removeEventListener("keydown", handleKeyDown); // Remove on cleanup
  }, [handleCancel, loading, open]);

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
        imageSource,
        loading,
        setLoading,
        isSavable,
        setDefault,
        toggleEditProfile,
        closeProfileModal,
        handleCancel,
        handleSave,
      }}
    >
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfileContext = () => {
  const context = useContext(EditProfileContext);
  if (!context) {
    throw new Error("useEditProfileContext must be used within an EditProfileContextProvider");
  }
  return context;
};
