import { isUsernameTaken } from "./firestoreFunctions";
import { Timestamp } from "firebase/firestore";
import { LINK_REGEX } from "@/src/constants";
import confetti from "canvas-confetti";

export const closeDropdown = () => {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownAuth = document.querySelector(".dropdown-auth");
  const isOpen = dropdownMenu?.scrollHeight === 180 || dropdownAuth?.scrollHeight === 180;
  if (isOpen) {
    const elem = document.activeElement as HTMLElement;
    elem?.blur();
  }
};

export const adjustImageURL = (url: string, desiredSize: number) => {
  return url.replace(/=s\d+-c/, `=s${desiredSize}-c`);
};

export const isPronounsEmpty = ([first, second]: [string, string]) => {
  return !first && !second;
};

export const formatPronouns = (pronouns: [string, string] | null, includeParentheses: boolean = false) => {
  if (!pronouns || isPronounsEmpty(pronouns)) return "";
  const formattedPronouns = pronouns.join("/");
  return includeParentheses ? `(${formattedPronouns})` : formattedPronouns;
};

export const formatLink = (link: string) => {
  return link.replace(/^(https?:\/\/)?(www\.)?/, "");
};

export const formatUsername = (username: string) => {
  const formattedUsername = username.toLowerCase().replace(/[^a-z]/g, "");
  return formattedUsername.length > 15 ? formattedUsername.substring(0, 15) : formattedUsername.padEnd(2, "x");
};

export const formatDefaultUsername = async (username: string) => {
  const formattedUsername = formatUsername(username);
  let isTaken = await isUsernameTaken(formattedUsername);
  let index = 0;
  while (isTaken) {
    isTaken = await isUsernameTaken(`${formattedUsername}${index}`);
    index++;
  }
  return index > 0 ? `${formattedUsername}${index}` : formattedUsername;
};

export const formatDisplayName = (displayName: string): string => {
  const formattedDisplayName = displayName.replace(/[^A-Za-z0-9À-ÖØ-öø-ÿ'-. @&#:_]/g, "");
  return formattedDisplayName.length > 15 ? formattedDisplayName.substring(0, 15) : formattedDisplayName.padEnd(2, "_");
};

export const ensureHttpsLink = (link: string): string => {
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    return `https://${link}`;
  }
  return link;
};

export const areArraysEqual = <T>(arrayOne: T[], arrayTwo: T[]) =>
  arrayOne.length === arrayTwo.length && arrayOne.every((element, index) => element === arrayTwo[index]);

export const showModal = (elementID: string, toggleChange?: () => void) => {
  const element = document.getElementById(elementID);
  if (element instanceof HTMLDialogElement) {
    element.showModal();
    if (toggleChange) toggleChange();
  }
};

export const closeModal = (elementID: string, toggleChange?: () => void) => {
  const element = document.getElementById(elementID);
  if (element instanceof HTMLDialogElement) {
    element.close();
    if (toggleChange) toggleChange();
  }
};

export const linkValidation = (link: string) => !link || LINK_REGEX.test(link);

export const formatDate = (date: Date) => new Date((date as unknown as Timestamp).toDate()).toLocaleDateString();

export const triggerConfetti = () => {
  const defaults = {
    zIndex: 10000000,
    spread: 360,
    ticks: 50,
    decay: 0.94,
    startVelocity: 30,
  };

  confetti({
    ...defaults,
    particleCount: 45,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 0.75,
  });
};

export const truncateString = (str: string, maxLength: number) =>
  str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;

export const isFileImage = (file: File) => file.type.startsWith("image/");
export const isFileVideo = (file: File) => file.type.startsWith("video/");

export const formatNamePossessive = (name: string): string => name + (name.endsWith("s") ? "'" : "'s");

export const formatNameForURL = (keyboardName: string) => keyboardName.replaceAll("%20", " ");

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
