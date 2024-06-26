"use client";
import { useState, useEffect, useMemo, createContext, useContext } from "react";
import useInputValidator from "@/src/hooks/useInputValidator";
import { ItemType, KeyboardType, KitType } from "@/src/types/keyboard";
import { linkValidation } from "@/src/helper/helperFunctions";
import {
  KEYBOARD_NAME_REGEX,
  KEYBOARD_DESCRIPTION_REGEX,
  KEYBOARD_SIZE_REGEX,
  KEYBOARD_MOD_REGEX,
  KEYBOARD_KIT_ITEMS,
  KEYBOARD_PLATE_REGEX,
} from "@/src/constants";
import { useGlobalModalContext } from "./GlobalModal";
import useObjectsValidator from "../hooks/useObjectsValidator";

export interface AddKeyboardContextType {
  screen: number;
  setScreen: React.Dispatch<React.SetStateAction<number>>;
  validScreenOne: boolean;
  validScreenTwo: boolean;
  validScreenThree: boolean;
  setValidScreenThree: React.Dispatch<React.SetStateAction<boolean>>;

  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  validName: boolean;

  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  validDescription: boolean;

  kitName: string;
  setKitName: React.Dispatch<React.SetStateAction<string>>;
  validKitName: boolean;
  kitSelected: boolean | null;
  setKitSelected: React.Dispatch<React.SetStateAction<boolean | null>>;
  kitCase: boolean;
  setKitCase: React.Dispatch<React.SetStateAction<boolean>>;
  kitPcb: boolean;
  setKitPcb: React.Dispatch<React.SetStateAction<boolean>>;
  kitPlate: boolean;
  setKitPlate: React.Dispatch<React.SetStateAction<boolean>>;
  kitStabilizers: boolean;
  setKitStabilizers: React.Dispatch<React.SetStateAction<boolean>>;
  kitKeycaps: boolean;
  setKitKeycaps: React.Dispatch<React.SetStateAction<boolean>>;
  kitLink: string;
  setKitLink: React.Dispatch<React.SetStateAction<string>>;
  validKitLink: boolean;
  kitSelectedLink: boolean;
  setKitSelectedLink: React.Dispatch<React.SetStateAction<boolean>>;

  caseName: string;
  setCaseName: React.Dispatch<React.SetStateAction<string>>;
  validCaseName: boolean;
  caseLink: string;
  setCaseLink: React.Dispatch<React.SetStateAction<string>>;
  validCaseLink: boolean;
  caseSelectedLink: boolean;
  setCaseSelectedLink: React.Dispatch<React.SetStateAction<boolean>>;

  pcbName: string;
  setPcbName: React.Dispatch<React.SetStateAction<string>>;
  validPcbName: boolean;
  pcbLink: string;
  setPcbLink: React.Dispatch<React.SetStateAction<string>>;
  validPcbLink: boolean;
  pcbSelectedLink: boolean;
  setPcbSelectedLink: React.Dispatch<React.SetStateAction<boolean>>;

  plateName: string;
  setPlateName: React.Dispatch<React.SetStateAction<string>>;
  validPlateName: boolean;
  plateLink: string;
  setPlateLink: React.Dispatch<React.SetStateAction<string>>;
  validPlateLink: boolean;
  plateSelectedLink: boolean;
  setPlateSelectedLink: React.Dispatch<React.SetStateAction<boolean>>;

  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  validSize: boolean;

  switches: ItemType[];
  setSwitches: React.Dispatch<React.SetStateAction<ItemType[]>>;
  addSwitches: (element: ItemType) => void;
  updateSwitches: (index: number, newValue: ItemType) => void;
  removeSwitches: (index: number) => void;
  validSwitches: boolean;
  validSwitchesMap: Partial<Record<keyof ItemType, boolean>>[];

  stabilizers: ItemType[];
  setStabilizers: React.Dispatch<React.SetStateAction<ItemType[]>>;
  addStabilizers: (element: ItemType) => void;
  updateStabilizers: (index: number, newValue: ItemType) => void;
  removeStabilizers: (index: number) => void;
  validStabilizers: boolean;
  validStabilizersMap: Partial<Record<keyof ItemType, boolean>>[];

  keycaps: ItemType[];
  setKeycaps: React.Dispatch<React.SetStateAction<ItemType[]>>;
  addKeycaps: (element: ItemType) => void;
  updateKeycaps: (index: number, newValue: ItemType) => void;
  removeKeycaps: (index: number) => void;
  validKeycaps: boolean;
  validKeycapsMap: Partial<Record<keyof ItemType, boolean>>[];

  mods: string[];
  setMods: React.Dispatch<React.SetStateAction<string[]>>;
  validMods: boolean;

  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface AddKeyboardContextProps {
  children: React.ReactNode;
}

export const AddKeyboardContext = createContext<AddKeyboardContextType | null>(null);

export const AddKeyboardContextProvider = ({ children }: AddKeyboardContextProps) => {
  // Check name
  const nameValidation = (name: string) => KEYBOARD_NAME_REGEX.test(name);
  const [name, setName, validName] = useInputValidator<string>("", nameValidation);

  // Check description
  const descriptionValidation = (desc: string) => KEYBOARD_DESCRIPTION_REGEX.test(desc);
  const [description, setDescription, validDescription] = useInputValidator<string>(
    "",
    descriptionValidation,
  );

  // Check kit
  const [kitName, setKitName, validKitName] = useInputValidator<string>("", nameValidation);
  const [kitSelected, setKitSelected] = useState<boolean | null>(null);
  const [kitCase, setKitCase] = useState<boolean>(false);
  const [kitPcb, setKitPcb] = useState<boolean>(false);
  const [kitPlate, setKitPlate] = useState<boolean>(false);
  const [kitStabilizers, setKitStabilizers] = useState<boolean>(false);
  const [kitKeycaps, setKitKeycaps] = useState<boolean>(false);
  const [kitLink, setKitLink, validKitLink] = useInputValidator<string>("", linkValidation);
  const [kitSelectedLink, setKitSelectedLink] = useState<boolean>(false);

  // Check case
  const [caseName, setCaseName, validCaseName] = useInputValidator<string>("", nameValidation);
  const [caseLink, setCaseLink, validCaseLink] = useInputValidator<string>("", linkValidation);
  const [caseSelectedLink, setCaseSelectedLink] = useState<boolean>(false);

  // Check PCB
  const [pcbName, setPcbName, validPcbName] = useInputValidator<string>("", nameValidation);
  const [pcbLink, setPcbLink, validPcbLink] = useInputValidator<string>("", linkValidation);
  const [pcbSelectedLink, setPcbSelectedLink] = useState<boolean>(false);

  // Check plate
  const plateValidation = (plate: string) => KEYBOARD_PLATE_REGEX.test(plate);
  const [plateName, setPlateName, validPlateName] = useInputValidator<string>("", plateValidation);
  const [plateLink, setPlateLink, validPlateLink] = useInputValidator<string>("", linkValidation);
  const [plateSelectedLink, setPlateSelectedLink] = useState<boolean>(false);

  // Check size
  const sizeValidation = (size: string) => KEYBOARD_SIZE_REGEX.test(size);
  const [size, setSize, validSize] = useInputValidator<string>("", sizeValidation);

  // Validating multiple items
  const defaultItem: ItemType[] = [{ name: "", link: undefined }];
  const itemsValidation = (items: ItemType[]) => items.length <= 6;

  // Check switches
  const [
    switches,
    setSwitches,
    addSwitches,
    updateSwitches,
    removeSwitches,
    validSwitches,
    validSwitchesMap,
  ] = useObjectsValidator<ItemType>(defaultItem, itemsValidation, nameValidation, linkValidation);

  // Check stabilizers
  const [
    stabilizers,
    setStabilizers,
    addStabilizers,
    updateStabilizers,
    removeStabilizers,
    validStabilizers,
    validStabilizersMap,
  ] = useObjectsValidator<ItemType>(defaultItem, itemsValidation, nameValidation, linkValidation);

  // Check keycaps
  const [
    keycaps,
    setKeycaps,
    addKeycaps,
    updateKeycaps,
    removeKeycaps,
    validKeycaps,
    validKeycapsMap,
  ] = useObjectsValidator<ItemType>(defaultItem, itemsValidation, nameValidation, linkValidation);

  // Check mods
  const modsValidation = (mods: string[]) => mods.every((mod) => KEYBOARD_MOD_REGEX.test(mod));
  const [mods, setMods, validMods] = useInputValidator<string[]>([], modsValidation);

  // Check images
  const [images, setImages] = useState<File[]>([]);

  // Screen state
  const [screen, setScreen] = useState(1);
  const validScreenOne = useMemo(() => validName, [validName]);
  const validScreenTwo = useMemo(() => {
    // Kit checkboxes can only be selected if the user has selected a kit
    const kitCheckBoxValid = kitSelected
      ? true
      : !(kitCase || kitPcb || kitPlate || kitStabilizers || kitKeycaps);
    const valid =
      kitSelected !== null &&
      (kitSelected ? validKitLink : true) &&
      kitCheckBoxValid &&
      validSize &&
      validPlateName &&
      (validPlateLink || !plateLink) &&
      validCaseName &&
      (validCaseLink || !caseLink) &&
      validPcbName &&
      (validPcbLink || !pcbLink);

    return valid;
  }, [
    caseLink,
    kitCase,
    kitKeycaps,
    kitPcb,
    kitPlate,
    kitSelected,
    kitStabilizers,
    pcbLink,
    plateLink,
    validCaseLink,
    validCaseName,
    validKitLink,
    validPcbLink,
    validPcbName,
    validPlateLink,
    validPlateName,
    validSize,
  ]);
  const [validScreenThree, setValidScreenThree] = useState(false);

  return (
    <AddKeyboardContext.Provider
      value={{
        screen,
        setScreen,
        validScreenOne,
        validScreenTwo,
        validScreenThree,
        setValidScreenThree,
        name,
        setName,
        validName,
        description,
        setDescription,
        validDescription,
        kitName,
        setKitName,
        validKitName,
        kitSelected,
        setKitSelected,
        kitCase,
        setKitCase,
        kitPcb,
        setKitPcb,
        kitPlate,
        setKitPlate,
        kitStabilizers,
        setKitStabilizers,
        kitKeycaps,
        setKitKeycaps,
        kitLink,
        setKitLink,
        validKitLink,
        kitSelectedLink,
        setKitSelectedLink,
        caseName,
        setCaseName,
        validCaseName,
        caseLink,
        setCaseLink,
        validCaseLink,
        caseSelectedLink,
        setCaseSelectedLink,
        pcbName,
        setPcbName,
        validPcbName,
        pcbLink,
        setPcbLink,
        validPcbLink,
        pcbSelectedLink,
        setPcbSelectedLink,
        plateName,
        setPlateName,
        validPlateName,
        plateLink,
        setPlateLink,
        validPlateLink,
        plateSelectedLink,
        setPlateSelectedLink,
        size,
        setSize,
        validSize,
        switches,
        setSwitches,
        addSwitches,
        updateSwitches,
        removeSwitches,
        validSwitches,
        validSwitchesMap,
        stabilizers,
        setStabilizers,
        addStabilizers,
        updateStabilizers,
        removeStabilizers,
        validStabilizers,
        validStabilizersMap,
        keycaps,
        setKeycaps,
        addKeycaps,
        updateKeycaps,
        removeKeycaps,
        validKeycaps,
        validKeycapsMap,
        mods,
        setMods,
        validMods,
        images,
        setImages,
      }}
    >
      {children}
    </AddKeyboardContext.Provider>
  );
};

export const useAddKeyboardContext = () => {
  const context = useContext(AddKeyboardContext);
  if (!context) {
    throw new Error("useAddKeyboardContext must be used within an AddKeyboardProvider");
  }
  return context;
};
