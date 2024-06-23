"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { auth, googleProvider, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useGlobalModalContext } from "./GlobalModal";
import {
  saveProfilePicture,
  saveAuthenticated,
  saveUsername,
  saveDisplayName,
  savePronouns,
} from "../helper/cookiesFunctions";
import { createUserProfile } from "../helper/firestoreFunctions";

export const DISPLAY_NAME_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-. @&#:]{2,15}$/;
export const USERNAME_REGEX = /^[A-Za-z0-9_-]{2,15}$/;

export type userStatus = "active" | "suspended" | "banned";
export type userRole = "user" | "mod" | "admin";

export interface UserProfileType {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  profilePicture: string;
  premium: boolean;
  status: userStatus;
  joinedDate: Date;
  lastActive: Date;
  bio: string;
  socialLinks: string[];
  pronouns: [string, string];
}

export interface EditUserProfileType {
  displayName: string;
  profilePicture: string;
  lastActive: Date;
  bio: string;
  pronouns: [string, string];
  socialLinks: string[];
}

export interface AuthContextProps {
  initialAuthenticated: boolean;
  initialUsername: string | null;
  initialProfilePicture: string | null;
  initialDisplayName: string | null;
  initialPronouns: [string, string] | null;
  children: React.ReactNode;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfileType | null;
  authLoading: boolean;
  authenticated: boolean;
  username: string | null;
  displayName: string | null;
  pronouns: [string, string] | null;
  profilePicture: string | null;
  editUserProfileState: (newUserProfile: EditUserProfileType) => void;
  signInWithGoogle: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  initialAuthenticated,
  initialUsername,
  initialProfilePicture,
  initialDisplayName,
  initialPronouns,
  children,
}: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(initialAuthenticated);
  const [username, setUsername] = useState<string | null>(initialUsername);
  const [displayName, setDisplayName] = useState<string | null>(initialDisplayName);
  const [pronouns, setPronouns] = useState<[string, string] | null>(initialPronouns);
  const [profilePicture, setProfilePicture] = useState<string | null>(initialProfilePicture);
  const { handleModalError } = useGlobalModalContext();

  const updateUserState = async (
    newUser: User | null,
    newUserProfile: UserProfileType | null,
    newAuthenticated: boolean,
    newUsername: string | null = null,
    newDisplayName: string | null = null,
    newPronouns: [string, string] | null = null,
    newProfilePicture: string | null = null,
  ) => {
    // Update state
    setUser(newUser);
    setUserProfile(newUserProfile);
    setAuthenticated(newAuthenticated);
    setUsername(newUsername);
    setDisplayName(newDisplayName);
    setPronouns(newPronouns);
    setProfilePicture(newProfilePicture);

    // Save to cookies
    saveAuthenticated(newAuthenticated);
    if (newUsername !== null) saveUsername(newUsername);
    if (newProfilePicture !== null) saveProfilePicture(newProfilePicture);
    if (newDisplayName !== null) saveDisplayName(newDisplayName);
    if (newPronouns !== null) savePronouns(newPronouns);
  };

  const editUserProfileState = async (newUserProfile: EditUserProfileType) => {
    if (!userProfile) return; // Ensure there's a userProfile to update

    // Create a new updated profile object
    const updatedUserProfile: UserProfileType = {
      ...userProfile,
      ...newUserProfile,
    };

    // Update the userProfile state
    setUserProfile(updatedUserProfile);

    // Update individual states if they exist in newUserProfile
    if (newUserProfile.displayName) {
      setDisplayName(newUserProfile.displayName);
      saveDisplayName(newUserProfile.displayName);
    }
    if (newUserProfile.profilePicture) {
      setProfilePicture(newUserProfile.profilePicture);
      saveProfilePicture(newUserProfile.profilePicture);
    }
    if (newUserProfile.pronouns) {
      setPronouns(newUserProfile.pronouns);
      savePronouns(newUserProfile.pronouns);
    }
  };

  const createUserProfileAndUpdateState = async (currentUser: UserCredential) => {
    // Create a new user profile
    const newUserProfile: UserProfileType = {
      uid: currentUser.user.uid,
      email: currentUser.user.email || "",
      username: currentUser.user.displayName || "",
      displayName: currentUser.user.displayName || "",
      profilePicture: currentUser.user.photoURL || "",
      premium: false,
      status: "active",
      joinedDate: new Date(),
      lastActive: new Date(),
      bio: "",
      socialLinks: [],
      pronouns: ["", ""],
    };

    // Save user profile to Firestore and update state
    await createUserProfile(newUserProfile);
    await updateUserState(
      currentUser.user,
      newUserProfile,
      true,
      newUserProfile.username,
      newUserProfile.displayName,
      newUserProfile.pronouns,
      currentUser.user.photoURL,
    );
  };

  const updateUserProfileState = async (
    currentUserProfile: UserProfileType,
    currentUser: UserCredential,
  ) => {
    await updateUserState(
      currentUser.user,
      currentUserProfile,
      true,
      currentUserProfile.username,
      currentUserProfile.displayName,
      currentUserProfile.pronouns,
      currentUserProfile.profilePicture,
    );
  };

  const signInWithGoogle = async () => {
    try {
      const currentUser = await signInWithPopup(auth, googleProvider);
      setUser(currentUser.user);
      if (!currentUser.user.photoURL || !currentUser.user.displayName) {
        throw new Error("User is not valid");
      }
      // Check if user profile already exists
      const userProfileRef = doc(db, "userProfiles", currentUser.user.uid);
      const userProfileSnap = await getDoc(userProfileRef);

      if (userProfileSnap.exists()) {
        // Update state with existing user profile
        const currentUserProfile = userProfileSnap.data() as UserProfileType;
        updateUserProfileState(currentUserProfile, currentUser);
      } else {
        // Create a new user profile if it doesn't exist
        createUserProfileAndUpdateState(currentUser);
      }
    } catch (error: any) {
      handleModalError(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await updateUserState(null, null, false);
    } catch (error: any) {
      handleModalError(error);
    }
  };

  // Check if user is authenticated on page load and update state accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user profile exists and update state
        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        const userProfileSnap = await getDoc(userProfileRef);
        setUserProfile(userProfileSnap.data() as UserProfileType);
      } else {
        // Reset state if user is not authenticated
        setUserProfile(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [user, handleModalError]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        authLoading,
        authenticated,
        username,
        displayName,
        pronouns,
        profilePicture,
        editUserProfileState,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
