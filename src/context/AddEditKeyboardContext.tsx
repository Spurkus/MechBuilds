"use client";
import { useState, useEffect, useMemo, createContext, useContext, useCallback, useRef } from "react";
import { ItemType, KeyboardStatusType, KeyboardType, KitType } from "@/src/types/keyboard";
import { linkValidation, closeModal, triggerConfetti, showModal } from "@/src/helper/helperFunctions";
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
import useKeyboardItem from "@/src/hooks/useKeyboardItem";
import {
  getDefaultKeyboardImage,
  createKeyboard,
  isKeyboardNameTaken,
  handleUploadKeyboardContent,
  editKeyboard,
} from "@/src/helper/firestoreFunctions";
import { useAuthContext } from "./Authentication";
import useBooleanList from "@/src/hooks/useBooleanList";

export interface AddEditKeyboardContextType {
  loading: boolean;
  screen: number;
  setScreen: React.Dispatch<React.SetStateAction<number>>;
  validScreenOne: boolean;
  validScreenTwo: boolean;
  validScreenThree: boolean;
  isSavable: boolean;

  nameLoading: boolean;
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

  contentIndex: number;
  setContentIndex: React.Dispatch<React.SetStateAction<number>>;
  imageVideoList: (File | string)[];
  setImageVideoList: React.Dispatch<React.SetStateAction<(File | string)[]>>;
  mediaURL: string;
  setMediaURL: React.Dispatch<React.SetStateAction<string>>;
  isMediaVideo: boolean[];
  setIsMediaVideo: React.Dispatch<React.SetStateAction<boolean[]>>;
  addIsMediaVideo: (value?: boolean) => void;
  toggleIsMediaVideo: (index: number) => void;
  removeIsMediaVideo: (index: number) => void;

  status: KeyboardStatusType | null;
  setStatus: React.Dispatch<React.SetStateAction<KeyboardStatusType | null>>;

  handleCancel: () => void;
  handleSave: () => void;
}

export interface AddEditKeyboardContextProps {
  children: React.ReactNode;
  toggleAddEditKeyboard: () => void;
  open: boolean;
  edit?: KeyboardType;
  setEdit: (value: KeyboardType | undefined) => void;
}

export const AddEditKeyboardContext = createContext<AddEditKeyboardContextType | null>(null);

export const AddEditKeyboardContextProvider = ({
  children,
  toggleAddEditKeyboard,
  open,
  edit,
  setEdit,
}: AddEditKeyboardContextProps) => {
  const { handleModal, handleModalError, toggleModal } = useGlobalModalContext();
  const { userProfile } = useAuthContext();

  // Check name
  const nameValidation = (name: string) => KEYBOARD_NAME_REGEX.test(name);

  const [nameLoading, setNameLoading] = useState(false);
  const nameRef = useRef(0);
  const keyboardNameValidation = useCallback(
    async (name: string): Promise<boolean> => {
      if (!userProfile) return false;
      const currentNameRef = ++nameRef.current; // Increment reference for tracking keyboard name
      setNameLoading(true); // Set loading states

      // Check if the name is the same as the current keyboard name
      if (edit && edit.name === name) {
        if (currentNameRef !== nameRef.current) return false;
        setNameLoading(false);
        return true;
      }

      // Check if the name is nothing or invalid
      if (!name || !nameValidation(name)) {
        if (currentNameRef !== nameRef.current) return false;
        setNameLoading(false);
        return false;
      }

      // Check if the name is taken
      const nameTaken = await isKeyboardNameTaken(userProfile.uid, name)
        .then((result) => {
          if (currentNameRef !== nameRef.current) return false;
          setNameLoading(false);
          return result;
        })
        .catch((error) => {
          if (currentNameRef !== nameRef.current) return false;
          handleModalError(error);
          setNameLoading(false);
          return false;
        });

      if (currentNameRef !== nameRef.current) return false;
      setNameLoading(false);
      return !nameTaken;
    },
    [userProfile, handleModalError, edit],
  );
  const [name, setName, validName] = useInputValidator(edit ? edit.name : "", keyboardNameValidation);

  // Check description
  const descriptionValidation = (desc: string) => KEYBOARD_DESCRIPTION_REGEX.test(desc);
  const [description, setDescription, validDescription] = useInputValidator<string>(
    edit ? edit.description : "",
    descriptionValidation,
  );

  // Check kit
  const [kitName, setKitName, validKitName] = useInputValidator(edit ? edit.kitName : "", nameValidation);
  const [kitSelected, setKitSelected] = useState<boolean | null>(edit ? !!edit.kitName : null);
  const defaultEditKitIncludes = useCallback((item: string): boolean => edit && edit.kit.includes(item), [edit]);
  const [kitCase, setKitCase] = useState(defaultEditKitIncludes("case"));
  const [kitPcb, setKitPcb] = useState(defaultEditKitIncludes("pcb"));
  const [kitPlate, setKitPlate] = useState(defaultEditKitIncludes("plate"));
  const [kitStabilizers, setKitStabilizers] = useState(defaultEditKitIncludes("stabilizers"));
  const [kitKeycaps, setKitKeycaps] = useState(defaultEditKitIncludes("keycaps"));
  const [kitLink, setKitLink, validKitLink] = useInputValidator(edit ? edit.kitLink : "", linkValidation);
  const [kitSelectedLink, setKitSelectedLink] = useState(false);

  // Check case
  const [caseName, setCaseName, validCaseName] = useInputValidator(edit ? edit.case : "", nameValidation);
  const [caseLink, setCaseLink, validCaseLink] = useInputValidator(edit ? edit.caseLink : "", linkValidation);
  const [caseSelectedLink, setCaseSelectedLink] = useState(false);

  // Check PCB
  const [pcbName, setPcbName, validPcbName] = useInputValidator(edit ? edit.pcb : "", nameValidation);
  const [pcbLink, setPcbLink, validPcbLink] = useInputValidator(edit ? edit.pcbLink : "", linkValidation);
  const [pcbSelectedLink, setPcbSelectedLink] = useState(false);

  // Check plate
  const plateValidation = (plate: string) => KEYBOARD_PLATE_REGEX.test(plate);
  const [plateName, setPlateName, validPlateName] = useInputValidator(edit ? edit.plate : "", plateValidation);
  const [plateLink, setPlateLink, validPlateLink] = useInputValidator(edit ? edit.plateLink : "", linkValidation);
  const [plateSelectedLink, setPlateSelectedLink] = useState(false);

  // Check size
  const sizeValidation = (size: string) => KEYBOARD_SIZE_REGEX.test(size);
  const [size, setSize, validSize] = useInputValidator(edit ? edit.size : "", sizeValidation);

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
  ] = useKeyboardItem(
    edit ? edit.switches : DEFAULT_ITEMS,
    itemsValidation,
    nameValidation,
    linkValidation,
    edit ? edit.switches.map(() => false) : [false],
  );

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
  ] = useKeyboardItem(
    edit ? edit.stabilizers : DEFAULT_ITEMS,
    itemsValidation,
    nameValidation,
    linkValidation,
    edit ? edit.stabilizers.map(() => false) : [false],
  );
  // Using function references for dependency withdrawal when updating stabilizers if kit is selected
  const updateStabilizersRef = useRef(updateStabilizers);
  useEffect(() => {
    if (kitSelected && kitStabilizers) {
      setStabilizers(DEFAULT_ITEMS);
      updateStabilizersRef.current(0, { name: kitName, link: "" });
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
  ] = useKeyboardItem(
    edit ? edit.keycaps : DEFAULT_ITEMS,
    itemsValidation,
    nameValidation,
    linkValidation,
    edit ? edit.keycaps.map(() => false) : [false],
  );
  // Using function references for dependency withdrawal when updating keycaps if kit is selected
  const updateKeycapsRef = useRef(updateKeycaps);
  useEffect(() => {
    if (kitSelected && kitKeycaps) {
      setKeycaps(DEFAULT_ITEMS);
      updateKeycapsRef.current(0, { name: kitName, link: "" });
    } else if (kitSelected === null) {
      setKeycaps(DEFAULT_ITEMS);
    }
  }, [kitKeycaps, kitSelected, setKeycaps, kitName]);

  // Check mods
  const modValidation = (mod: string) => KEYBOARD_MOD_REGEX.test(mod);
  const [currentMod, setCurrentMod, validCurrentMod] = useInputValidator<string>("", modValidation);
  const modsValidation = (mods: string[]) => mods.every((mod) => modValidation(mod));
  const [mods, setMods, validMods] = useInputValidator<string[]>(edit ? edit.mods : [], modsValidation);
  const maxMods = useMemo(() => mods.length >= 10, [mods]);

  // Check content
  const [contentIndex, setContentIndex] = useState(0);
  const [imageVideoList, setImageVideoList] = useState<(File | string)[]>(edit ? edit.media : []);
  const [mediaURL, setMediaURL] = useState(edit ? edit.media[0] : "");
  const [isMediaVideo, setIsMediaVideo, addIsMediaVideo, toggleIsMediaVideo, removeIsMediaVideo] = useBooleanList(
    edit ? edit.isMediaVideo : [],
  );

  // Check status
  const statusValidation = (status: string | null) =>
    status === "public" || status === "private" || status === "unlisted";
  const [status, setStatus, validStatus] = useInputValidator<KeyboardStatusType | null>(
    edit ? edit.status : null,
    statusValidation,
  );

  // Screen state
  const [screen, setScreen] = useState(1);
  const [loading, setLoading] = useState(false);
  const validScreenOne = useMemo(() => validName && !nameLoading, [validName, nameLoading]);
  const validScreenTwo = useMemo(() => {
    // Kit checkboxes can only be selected if the user has selected a kit
    const validKitCheckBox = kitSelected ? true : !(kitCase || kitPcb || kitPlate || kitStabilizers || kitKeycaps);

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
    return validMods && validDescription && validStatus;
  }, [validDescription, validMods, validStatus]);

  // Check if keyboard has changed if in edit mode
  const changed = useMemo(() => {
    if (!edit) return true;
    return (
      edit.name !== name ||
      edit.description !== description ||
      edit.kitName !== kitName ||
      edit.kitLink !== kitLink ||
      edit.case !== caseName ||
      edit.caseLink !== caseLink ||
      edit.pcb !== pcbName ||
      edit.pcbLink !== pcbLink ||
      edit.plate !== plateName ||
      edit.plateLink !== plateLink ||
      edit.size !== size ||
      edit.switches.length !== switches.length ||
      edit.stabilizers.length !== stabilizers.length ||
      edit.keycaps.length !== keycaps.length ||
      edit.mods.length !== mods.length ||
      edit.media.length !== imageVideoList.length ||
      edit.status !== status
    );
  }, [
    name,
    description,
    kitName,
    kitLink,
    caseName,
    caseLink,
    pcbName,
    pcbLink,
    plateName,
    plateLink,
    size,
    switches,
    stabilizers,
    keycaps,
    mods,
    imageVideoList,
    status,
    edit,
  ]);

  // Check if the keyboard can be saved
  const isSavable = useMemo(() => {
    return validScreenOne && validScreenTwo && validScreenThree && validScreenFour && changed;
  }, [validScreenFour, validScreenOne, validScreenThree, validScreenTwo, changed]);

  // Setting default states
  const setDefault = useCallback(() => {
    // Default screen
    setScreen(1);

    // Default name and description
    setName(edit ? edit.name : "");
    setDescription(edit ? edit.description : "");

    // Default kit
    setKitName(edit ? edit.kitName : "");
    setKitSelected(edit ? !!edit.kitName : null);
    setKitCase(defaultEditKitIncludes("case"));
    setKitPcb(defaultEditKitIncludes("pcb"));
    setKitPlate(defaultEditKitIncludes("plate"));
    setKitStabilizers(defaultEditKitIncludes("stabilizers"));
    setKitKeycaps(defaultEditKitIncludes("keycaps"));
    setKitLink(edit ? edit.kitLink : "");
    setKitSelectedLink(false);

    // Default case
    setCaseName(edit ? edit.case : "");
    setCaseLink(edit ? edit.caseLink : "");
    setCaseSelectedLink(false);

    // Default PCB
    setPcbName(edit ? edit.pcb : "");
    setPcbLink(edit ? edit.pcbLink : "");
    setPcbSelectedLink(false);

    // Default plate
    setPlateName(edit ? edit.plate : "");
    setPlateLink(edit ? edit.plateLink : "");
    setPlateSelectedLink(false);

    // default size
    setSize(edit ? edit.size : "");

    // Default switches
    setSwitches(edit ? edit.switches.map((item: ItemType) => ({ name: item.name, link: item.link })) : DEFAULT_ITEMS);
    setSwitchesSelectedLink(edit ? edit.switches.map(() => false) : [false]);

    // Default stabilizers
    setStabilizers(edit ? edit.stabilizers.map((s: ItemType) => ({ name: s.name, link: s.link })) : DEFAULT_ITEMS);
    setStabilizersSelectedLink(edit ? edit.stabilizers.map(() => false) : [false]);

    // Default keycaps
    setKeycaps(edit ? edit.keycaps.map((key: ItemType) => ({ name: key.name, link: key.link })) : DEFAULT_ITEMS);
    setKeycapsSelectedLink(edit ? edit.keycaps.map(() => false) : [false]);

    // Default mods
    setMods(edit ? edit.mods : []);
    setCurrentMod("");

    // Default content
    setContentIndex(0);
    setImageVideoList(edit ? edit.media : []);
    setMediaURL(edit ? edit.media[0] : "");
    setIsMediaVideo(edit ? edit.isMediaVideo : []);

    // Default status
    setStatus(edit ? edit.status : null);
  }, [
    setName,
    edit,
    setDescription,
    setKitName,
    defaultEditKitIncludes,
    setKitLink,
    setCaseName,
    setCaseLink,
    setPcbName,
    setPcbLink,
    setPlateName,
    setPlateLink,
    setSize,
    setSwitches,
    setSwitchesSelectedLink,
    setStabilizers,
    setStabilizersSelectedLink,
    setKeycaps,
    setKeycapsSelectedLink,
    setMods,
    setCurrentMod,
    setIsMediaVideo,
    setStatus,
  ]);

  const discardAndClose = useCallback(
    (globalModal?: boolean) => {
      if (globalModal) toggleModal();
      toggleAddEditKeyboard();
      setEdit(undefined);
    },
    [toggleAddEditKeyboard, toggleModal, setEdit],
  );

  const handleCancel = useCallback(() => {
    if (validScreenOne && changed) {
      handleModal("Discard Changes", "Are you sure you want to discard the changes?", "error", [
        { text: "Discard", type: "error", onClick: () => discardAndClose(false) },
        { text: "Cancel", type: "neutral", onClick: toggleModal },
      ]);
    } else {
      discardAndClose();
    }
  }, [discardAndClose, handleModal, validScreenOne, toggleModal, changed]);

  const handleSave = async () => {
    if (!isSavable || loading || !userProfile || !status || !changed) return;
    setLoading(true);
    try {
      if (edit) {
        const media = !imageVideoList.length
          ? [await getDefaultKeyboardImage()]
          : await handleUploadKeyboardContent(imageVideoList, edit.id);
        const kitComponents: KitType = [];
        if (kitCase) kitComponents.push("case");
        if (kitPcb) kitComponents.push("pcb");
        if (kitPlate) kitComponents.push("plate");
        if (kitStabilizers) kitComponents.push("stabilizers");
        if (kitKeycaps) kitComponents.push("keycaps");

        const editedKeyboard: Partial<KeyboardType> = {
          ...(edit.id && { id: edit.id }),
        };

        // Only include fields that have changed
        if (name !== edit.name) editedKeyboard.name = name;
        if (description !== edit.description) editedKeyboard.description = description;
        if (kitName !== edit.kitName) editedKeyboard.kitName = kitName;
        if (JSON.stringify(kitComponents) !== JSON.stringify(edit.kit)) editedKeyboard.kit = kitComponents;
        if (kitLink !== edit.kitLink) editedKeyboard.kitLink = kitLink;
        if (caseName !== edit.case) editedKeyboard.case = caseName;
        if (caseLink !== edit.caseLink) editedKeyboard.caseLink = caseLink;
        if (pcbName !== edit.pcb) editedKeyboard.pcb = pcbName;
        if (pcbLink !== edit.pcbLink) editedKeyboard.pcbLink = pcbLink;
        if (plateName !== edit.plate) editedKeyboard.plate = plateName;
        if (plateLink !== edit.plateLink) editedKeyboard.plateLink = plateLink;
        if (size !== edit.size) editedKeyboard.size = size;
        if (switches !== edit.switches) editedKeyboard.switches = switches;
        if (stabilizers !== edit.stabilizers) editedKeyboard.stabilizers = stabilizers;
        if (keycaps !== edit.keycaps) editedKeyboard.keycaps = keycaps;
        if (mods !== edit.mods) editedKeyboard.mods = mods;

        // Assuming media is always considered changed for simplicity
        editedKeyboard.media = await Promise.all(media);
        if (isMediaVideo !== edit.isMediaVideo) editedKeyboard.isMediaVideo = isMediaVideo;
        if (status !== edit.status) editedKeyboard.status = status;

        await editKeyboard(edit.id, editedKeyboard).then(() => {
          setTimeout(triggerConfetti, 0);
          setTimeout(triggerConfetti, 50);
          setTimeout(triggerConfetti, 100);
          setTimeout(triggerConfetti, 200);
          setTimeout(triggerConfetti, 300);
          handleModal("Success", "Keyboard edited successfully", "success", [
            { text: "yay!", type: "success", onClick: toggleModal },
          ]);
        });
      } else {
        const kitComponents: KitType = [];
        if (kitCase) kitComponents.push("case");
        if (kitPcb) kitComponents.push("pcb");
        if (kitPlate) kitComponents.push("plate");
        if (kitStabilizers) kitComponents.push("stabilizers");
        if (kitKeycaps) kitComponents.push("keycaps");

        const keyboard: KeyboardType = {
          id: "",
          uid: userProfile.uid,
          name: name,
          description: description,
          kitName: kitName,
          kit: kitComponents,
          kitLink: kitLink,
          case: caseName,
          caseLink: caseLink,
          pcb: pcbName,
          pcbLink: pcbLink,
          plate: plateName,
          plateLink: plateLink,
          size: size,
          switches: switches,
          stabilizers: stabilizers,
          keycaps: keycaps,
          mods: mods,
          media: [],
          isMediaVideo: !imageVideoList.length ? [false] : isMediaVideo,
          createdAt: new Date(),
          status: status,
          visible: true,
        };
        await createKeyboard(keyboard).then(async (id) => {
          // Upload media and id fields after creating keyboard to get ID
          const media = !imageVideoList.length
            ? [await getDefaultKeyboardImage()]
            : await handleUploadKeyboardContent(imageVideoList, id);
          await editKeyboard(id, { id, media }).then(() => {
            setTimeout(triggerConfetti, 0);
            setTimeout(triggerConfetti, 50);
            setTimeout(triggerConfetti, 100);
            setTimeout(triggerConfetti, 200);
            setTimeout(triggerConfetti, 300);
            handleModal("Success", `Keyboard ${edit ? "edited" : "created"} successfully`, "success", [
              { text: "yay!", type: "success", onClick: toggleModal },
            ]);
          });
        });
      }
    } catch (error: any) {
      handleModalError(error);
    } finally {
      toggleAddEditKeyboard();
      setEdit(undefined);
      setLoading(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) handleCancel();
    };

    document.addEventListener("keydown", handleKeyDown); // Add event listener
    return () => document.removeEventListener("keydown", handleKeyDown); // Remove on cleanup
  }, [handleCancel, open]);

  // Set default states when opening or closing modal
  useEffect(() => {
    setDefault();
  }, [open, setDefault, edit]);

  // Show modal when opening or closing
  useEffect(() => {
    const modalAction = open ? showModal : closeModal;
    modalAction("addeditkeyboardmodal");
  }, [open]);

  return (
    <AddEditKeyboardContext.Provider
      value={{
        loading,
        screen,
        setScreen,
        validScreenOne,
        validScreenTwo,
        validScreenThree,
        isSavable,
        nameLoading,
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
        contentIndex,
        setContentIndex,
        imageVideoList,
        setImageVideoList,
        mediaURL,
        setMediaURL,
        isMediaVideo,
        setIsMediaVideo,
        addIsMediaVideo,
        toggleIsMediaVideo,
        removeIsMediaVideo,
        status,
        setStatus,
        handleCancel,
        handleSave,
      }}
    >
      {children}
    </AddEditKeyboardContext.Provider>
  );
};

export const useAddEditKeyboardContext = () => {
  const context = useContext(AddEditKeyboardContext);
  if (!context) throw new Error("useAddEditKeyboardContext must be used within an AddEditKeyboardProvider");

  return context;
};
