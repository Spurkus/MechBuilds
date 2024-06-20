"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
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

      if (!userProfileSnap.exists()) {
        // Create a new user profile if it doesn't exist
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
      } else {
        const currentUserProfile = userProfileSnap.data() as UserProfileType;
        await updateUserState(
          currentUser.user,
          currentUserProfile,
          true,
          currentUserProfile.username,
          currentUserProfile.displayName,
          currentUserProfile.pronouns,
          currentUserProfile.profilePicture,
        );
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        const userProfileSnap = await getDoc(userProfileRef);
        setUserProfile(userProfileSnap.data() as UserProfileType);
      } else {
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
