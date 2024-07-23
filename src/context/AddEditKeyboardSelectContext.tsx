"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { showModal } from "@/src/helper/helperFunctions";
import { KeyboardType } from "@/src/types/keyboard";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const addKeyboard = searchParams.get("add") === "true";
  const [addEditKeyboardModalOpen, setAddEditKeyboardModalOpen] = useState(addKeyboard);
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
  if (!context)
    throw new Error("useAddEditKeyboardSelectContext must be used within a AddEditKeyboardSelectContextProvider");

  return context;
};
