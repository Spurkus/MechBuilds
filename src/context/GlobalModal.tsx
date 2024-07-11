"use client";
import { createContext, useState, useContext } from "react";
import { showModal, closeModal } from "@/src/helper/helperFunctions";
import { ModalButtonType, ModalThemeType } from "@/src/types/globalModal";
import { DEFAULT_MODAL_TEXT, DEFAULT_MODAL_THEME, DEFAULT_MODAL_BUTTONS } from "@/src/constants";
import Modal from "@/src/components/Modal";

export interface GlobalModalType {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle: string;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  modalMessage: string;
  setModalMessage: React.Dispatch<React.SetStateAction<string>>;
  modalTheme: ModalThemeType;
  setModalTheme: React.Dispatch<React.SetStateAction<ModalThemeType>>;
  modalButtons: ModalButtonType[];
  setModalButtons: React.Dispatch<React.SetStateAction<ModalButtonType[]>>;
  toggleModal: () => void;
  handleModalError: (error: Error | string) => void;
  handleModal: (title: string, message: string, theme?: ModalThemeType, buttons?: ModalButtonType[]) => void;
}

export interface GlobalModalProps {
  children: React.ReactNode;
}

export const GlobalModalContext = createContext<GlobalModalType | null>(null);

export const GlobalModalContextProvider = ({ children }: GlobalModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(DEFAULT_MODAL_TEXT);
  const [modalMessage, setModalMessage] = useState(DEFAULT_MODAL_TEXT);
  const [modalTheme, setModalTheme] = useState<ModalThemeType>(DEFAULT_MODAL_THEME);
  const [modalButtons, setModalButtons] = useState<ModalButtonType[]>(DEFAULT_MODAL_BUTTONS);

  const toggleModal = () => {
    closeModal("globalmodal");
    setModalOpen(!modalOpen);
    setModalTitle(DEFAULT_MODAL_TEXT);
    setModalMessage(DEFAULT_MODAL_TEXT);
    setModalTheme(DEFAULT_MODAL_THEME);
    setModalButtons(DEFAULT_MODAL_BUTTONS);
  };

  const handleModalError = (error: Error | string) => {
    const message = error instanceof Error ? error.message : error;
    setModalTitle("Error");
    setModalMessage(message);
    setModalTheme("error");
    showModal("globalmodal");
    setModalOpen(true);
  };

  const handleModal = (
    title: string,
    message: string,
    theme: ModalThemeType = DEFAULT_MODAL_THEME,
    buttons: ModalButtonType[] = DEFAULT_MODAL_BUTTONS,
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalTheme(theme);
    setModalButtons(buttons);
    showModal("globalmodal");
    setModalOpen(true);
  };

  return (
    <GlobalModalContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        modalTitle,
        setModalTitle,
        modalMessage,
        setModalMessage,
        modalTheme,
        setModalTheme,
        modalButtons,
        setModalButtons,
        toggleModal,
        handleModalError,
        handleModal,
      }}
    >
      {children}
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        theme={modalTheme}
        buttons={modalButtons}
        toggleModal={toggleModal}
      />
    </GlobalModalContext.Provider>
  );
};

export const useGlobalModalContext = () => {
  const context = useContext(GlobalModalContext);
  if (!context) throw new Error("useGlobalModalContext must be used within a GlobalModalContextProvider");

  return context;
};
