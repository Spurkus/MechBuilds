"use client";
import { createContext, useContext, useState } from "react";
import { KeyboardType } from "@/src/types/keyboard";

interface AddEditKeyboardSelectContextType {
  addEditKeyboardModalOpen: boolean;
  setAddEditKeyboardModalOpen: (value: boolean) => void;
  edit: KeyboardType | undefined;
  setEdit: (value: KeyboardType | undefined) => void;
}

interface AddEditKeyboardSelectProviderProps {
  children: React.ReactNode;
}

const AddEditKeyboardSelectContext = createContext<AddEditKeyboardSelectContextType | null>(null);

export const AddEditKeyboardSelectContextProvider = ({ children }: AddEditKeyboardSelectProviderProps) => {
  const [addEditKeyboardModalOpen, setAddEditKeyboardModalOpen] = useState(false);
  const [edit, setEdit] = useState<KeyboardType | undefined>(undefined);

  return (
    <AddEditKeyboardSelectContext.Provider
      value={{ addEditKeyboardModalOpen, setAddEditKeyboardModalOpen, edit, setEdit }}
    >
      {children}
    </AddEditKeyboardSelectContext.Provider>
  );
};

export const useAddEditKeyboardSelectContext = () => {
  const context = useContext(AddEditKeyboardSelectContext);
  if (!context) {
    throw new Error("useAddEditKeyboardSelectContext must be used within a AddEditKeyboardSelectContextProvider");
  }
  return context;
};
