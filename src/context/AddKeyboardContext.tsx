"use client";
import {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import { ItemType, KeyboardType, KitType } from "@/src/types/keyboard";
import { linkValidation } from "@/src/helper/helperFunctions";
import {
  KEYBOARD_NAME_REGEX,
  KEYBOARD_DESCRIPTION_REGEX,
  KEYBOARD_SIZE_REGEX,
  KEYBOARD_MOD_REGEX,
  KEYBOARD_PLATE_REGEX,
  DEFAULT_ITEMS,
} from "@/src/constants";
import { useGlobalModalContext } from "./GlobalModal";
import useInputValidator from "@/src/hooks/useInputValidator";
import useKeyboardItem from "../hooks/useKeyboardItem";

export interface AddKeyboardContextType {
  screen: number;
  setScreen: React.Dispatch<React.SetStateAction<number>>;
  validScreenOne: boolean;
  validScreenTwo: boolean;
  validScreenThree: boolean;
  isSavable: boolean;

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
  updateSwitches: (index: number, newValue: ItemType) => void;
  removeSwitches: (index: number) => void;
  validSwitches: boolean;
  validSwitchesMap: Partial<Record<keyof ItemType, boolean>>[];
  switchesSelectedLink: boolean[];
  setSwitchesSelectedLink: React.Dispatch<React.SetStateAction<boolean[]>>;
  toggleSwitchesSelectedLink: (index: number) => void;
  removeSwitchesSelectedLink: (index: number) => void;
  addNewSwitch: () => void;
  removeSwitch: (index: number) => void;
  oneSwitch: boolean;
  maxSwitches: boolean;

  stabilizers: ItemType[];
  setStabilizers: React.Dispatch<React.SetStateAction<ItemType[]>>;
  addStabilizers: (element: ItemType) => void;
  updateStabilizers: (index: number, newValue: ItemType) => void;
  removeStabilizers: (index: number) => void;
  validStabilizers: boolean;
  validStabilizersMap: Partial<Record<keyof ItemType, boolean>>[];
  stabilizersSelectedLink: boolean[];
  setStabilizersSelectedLink: React.Dispatch<React.SetStateAction<boolean[]>>;
  addStabilizersSelectedLink: () => void;
  toggleStabilizersSelectedLink: (index: number) => void;
  removeStabilizersSelectedLink: (index: number) => void;
  addNewStabilizer: () => void;
  removeStabilizer: (index: number) => void;
  oneStabilizer: boolean;
  maxStabilizers: boolean;

  keycaps: ItemType[];
  setKeycaps: React.Dispatch<React.SetStateAction<ItemType[]>>;
  addKeycaps: (element: ItemType) => void;
  updateKeycaps: (index: number, newValue: ItemType) => void;
  removeKeycaps: (index: number) => void;
  validKeycaps: boolean;
  validKeycapsMap: Partial<Record<keyof ItemType, boolean>>[];
  keycapsSelectedLink: boolean[];
  setKeycapsSelectedLink: React.Dispatch<React.SetStateAction<boolean[]>>;
  addKeycapsSelectedLink: () => void;
  toggleKeycapsSelectedLink: (index: number) => void;
  removeKeycapsSelectedLink: (index: number) => void;
  addNewKeycap: () => void;
  removeKeycap: (index: number) => void;
  oneKeycap: boolean;
  maxKeycaps: boolean;

  currentMod: string;
  setCurrentMod: React.Dispatch<React.SetStateAction<string>>;
  validCurrentMod: boolean;
  mods: string[];
  setMods: React.Dispatch<React.SetStateAction<string[]>>;
  validMods: boolean;
  maxMods: boolean;
  modValidation: (mod: string) => boolean;

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
  const itemsValidation = (items: ItemType[]) => items.length <= 3;

  // Check switches
  const [
    switches,
    setSwitches,
    addSwitches,
    updateSwitches,
    removeSwitches,
    validSwitches,
    validSwitchesMap,
    switchesSelectedLink,
    setSwitchesSelectedLink,
    addSwitchesSelectedLink,
    toggleSwitchesSelectedLink,
    removeSwitchesSelectedLink,
    addNewSwitch,
    removeSwitch,
    oneSwitch,
    maxSwitches,
  ] = useKeyboardItem(DEFAULT_ITEMS, itemsValidation, nameValidation, linkValidation, [false]);

  // Check stabilizers
  const [
    stabilizers,
    setStabilizers,
    addStabilizers,
    updateStabilizers,
    removeStabilizers,
    validStabilizers,
    validStabilizersMap,
    stabilizersSelectedLink,
    setStabilizersSelectedLink,
    addStabilizersSelectedLink,
    toggleStabilizersSelectedLink,
    removeStabilizersSelectedLink,
    addNewStabilizer,
    removeStabilizer,
    oneStabilizer,
    maxStabilizers,
  ] = useKeyboardItem(DEFAULT_ITEMS, itemsValidation, nameValidation, linkValidation, [false]);
  // Using function references for dependency withdrawal when updating stabilizers if kit is selected
  const updateStabilizersRef = useRef(updateStabilizers);
  useEffect(() => {
    if (kitSelected && kitStabilizers) {
      setStabilizers(DEFAULT_ITEMS);
      updateStabilizersRef.current(0, { name: kitName });
    } else if (kitSelected === null) {
      setStabilizers(DEFAULT_ITEMS);
    }
  }, [kitStabilizers, kitSelected, setStabilizers, kitName]);

  // Check keycaps
  const [
    keycaps,
    setKeycaps,
    addKeycaps,
    updateKeycaps,
    removeKeycaps,
    validKeycaps,
    validKeycapsMap,
    keycapsSelectedLink,
    setKeycapsSelectedLink,
    addKeycapsSelectedLink,
    toggleKeycapsSelectedLink,
    removeKeycapsSelectedLink,
    addNewKeycap,
    removeKeycap,
    oneKeycap,
    maxKeycaps,
  ] = useKeyboardItem(DEFAULT_ITEMS, itemsValidation, nameValidation, linkValidation, [false]);
  // Using function references for dependency withdrawal when updating keycaps if kit is selected
  const updateKeycapsRef = useRef(updateKeycaps);
  useEffect(() => {
    if (kitSelected && kitKeycaps) {
      setKeycaps(DEFAULT_ITEMS);
      updateKeycapsRef.current(0, { name: kitName });
    } else if (kitSelected === null) {
      setKeycaps(DEFAULT_ITEMS);
    }
  }, [kitKeycaps, kitSelected, setKeycaps, kitName]);

  // Check mods
  const modValidation = (mod: string) => KEYBOARD_MOD_REGEX.test(mod);
  const [currentMod, setCurrentMod, validCurrentMod] = useInputValidator<string>("", modValidation);
  const modsValidation = (mods: string[]) => mods.every((mod) => modValidation(mod));
  const [mods, setMods, validMods] = useInputValidator<string[]>([], modsValidation);
  const maxMods = useMemo(() => mods.length >= 10, [mods]);

  // Check images
  const [images, setImages] = useState<File[]>([]);

  // Screen state
  const [screen, setScreen] = useState(1);
  const validScreenOne = useMemo(() => validName, [validName]);
  const validScreenTwo = useMemo(() => {
    // Kit checkboxes can only be selected if the user has selected a kit
    const validKitCheckBox = kitSelected
      ? true
      : !(kitCase || kitPcb || kitPlate || kitStabilizers || kitKeycaps);

    // Kit name must be the same as the selected kit if selected
    const validKitSelectedName =
      (kitSelected ? validKitName : kitName === "") &&
      (kitCase ? caseName === kitName : true) &&
      (kitPcb ? pcbName === kitName : true) &&
      (kitPlate ? plateName === kitName : true);

    // Kit link must be empty if selected
    const validKitSelectedLink =
      (kitSelected ? validKitLink || !kitLink : kitLink === "") &&
      (kitCase ? caseLink === "" : true) &&
      (kitPcb ? pcbLink === "" : true) &&
      (kitPlate ? plateLink === "" : true);

    const valid =
      validKitCheckBox &&
      validKitSelectedName &&
      validKitSelectedLink &&
      kitSelected !== null &&
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
    caseName,
    kitCase,
    kitKeycaps,
    kitLink,
    kitName,
    kitPcb,
    kitPlate,
    kitSelected,
    kitStabilizers,
    pcbLink,
    pcbName,
    plateLink,
    plateName,
    validCaseLink,
    validCaseName,
    validKitLink,
    validKitName,
    validPcbLink,
    validPcbName,
    validPlateLink,
    validPlateName,
    validSize,
  ]);
  const validScreenThree = useMemo(() => {
    return validSwitches && validStabilizers && validKeycaps;
  }, [validKeycaps, validStabilizers, validSwitches]);
  const validScreenFour = useMemo(() => {
    return validMods && validDescription;
  }, [validDescription, validMods]);

  // Check if the keyboard can be saved
  const isSavable = useMemo(() => {
    return validScreenOne && validScreenTwo && validScreenThree && validScreenFour;
  }, [validScreenFour, validScreenOne, validScreenThree, validScreenTwo]);

  return (
    <AddKeyboardContext.Provider
      value={{
        screen,
        setScreen,
        validScreenOne,
        validScreenTwo,
        validScreenThree,
        isSavable,
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
        updateSwitches,
        removeSwitches,
        validSwitches,
        validSwitchesMap,
        switchesSelectedLink,
        setSwitchesSelectedLink,
        toggleSwitchesSelectedLink,
        removeSwitchesSelectedLink,
        addNewSwitch,
        removeSwitch,
        oneSwitch,
        maxSwitches,
        stabilizers,
        setStabilizers,
        addStabilizers,
        updateStabilizers,
        removeStabilizers,
        validStabilizers,
        validStabilizersMap,
        stabilizersSelectedLink,
        setStabilizersSelectedLink,
        addStabilizersSelectedLink,
        toggleStabilizersSelectedLink,
        removeStabilizersSelectedLink,
        addNewStabilizer,
        removeStabilizer,
        oneStabilizer,
        maxStabilizers,
        keycaps,
        setKeycaps,
        addKeycaps,
        updateKeycaps,
        removeKeycaps,
        validKeycaps,
        validKeycapsMap,
        keycapsSelectedLink,
        setKeycapsSelectedLink,
        addKeycapsSelectedLink,
        toggleKeycapsSelectedLink,
        removeKeycapsSelectedLink,
        addNewKeycap,
        removeKeycap,
        oneKeycap,
        maxKeycaps,
        currentMod,
        setCurrentMod,
        validCurrentMod,
        mods,
        setMods,
        validMods,
        maxMods,
        modValidation,
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
