"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { useGlobalModalContext } from "./GlobalModal";
import {
  saveProfilePicture,
  saveAuthenticated,
  saveUsername,
} from "../helper/CookiesFunctions";

type userStatus = "active" | "suspended" | "banned";

interface UserProfileType {
  uid: string;
  email: string;
  username: string;
  profilePicture: string;
  status: userStatus;
  joinedDate: Date;
  lastActive: Date;
  bio: string;
}

interface AuthContextProps {
  initialAuthenticated: boolean;
  initialUsername: string | null;
  initialProfilePicture: string | null;
  children: React.ReactNode;
}

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  authenticated: boolean;
  username: string | null;
  profilePicture: string | null;
  signInWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  initialAuthenticated,
  initialUsername,
  initialProfilePicture,
  children,
}: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] =
    useState<boolean>(initialAuthenticated);
  const [username, setUsername] = useState<string | null>(initialUsername);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    initialProfilePicture,
  );
  const { handleModalError } = useGlobalModalContext();

  const updateUserState = async (
    newUser: User | null,
    newAuthenticated: boolean,
    newUsername: string | null = null,
    newProfilePicture: string | null = null,
  ) => {
    // Update state
    setUser(newUser);
    setAuthenticated(newAuthenticated);
    setUsername(newUsername);
    setProfilePicture(newProfilePicture);

    // Save to cookies
    saveAuthenticated(newAuthenticated);
    if (newUsername !== null) saveUsername(newUsername);
    if (newProfilePicture !== null) saveProfilePicture(newProfilePicture);
  };

  const signInWithGoogle = async () => {
    try {
      const currentUser = await signInWithPopup(auth, googleProvider);
      setUser(currentUser.user);
      if (!currentUser.user.photoURL || !currentUser.user.displayName) {
        throw new Error("User is not valid");
      }
      await updateUserState(
        currentUser.user,
        true,
        currentUser.user.displayName,
        currentUser.user.photoURL,
      );
    } catch (error: any) {
      handleModalError(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await updateUserState(null, false);
    } catch (error: any) {
      handleModalError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authenticated,
        username,
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
