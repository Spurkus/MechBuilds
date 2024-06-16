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

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { setModalOpen, setModalTitle, setModalMessage, setModalTheme } =
    useGlobalModalContext();

  const signInWithGoogle = async () => {
    try {
      const currentUser = await signInWithPopup(auth, googleProvider);
      setUser(currentUser.user);
    } catch (error: any) {
      setModalTitle("Error");
      setModalMessage(error.message);
      setModalTheme("error");
      setModalOpen(true);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      setModalTitle("Error");
      setModalMessage(error.message);
      setModalTheme("error");
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
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
