import { isUsernameTaken } from "./firestoreFunctions";
import { LINK_REGEX } from "@/src/constants";

export const closeDropdown = () => {
  const elem = document.activeElement as HTMLElement;
  elem?.blur();
};

export const adjustImageURL = (url: string, desiredSize: number) => {
  return url.replace(/=s\d+-c/, `=s${desiredSize}-c`);
};

export const isPronounsEmpty = ([first, second]: [string, string]) => {
  return !first && !second;
};

export const formatPronouns = (
  pronouns: [string, string] | null,
  includeParentheses: boolean = false,
) => {
  if (!pronouns || isPronounsEmpty(pronouns)) return "";
  const formattedPronouns = pronouns.join("/");
  return includeParentheses ? `(${formattedPronouns})` : formattedPronouns;
};

export const formatSocialLink = (link: string) => {
  return link.replace(/^(https?:\/\/)?(www\.)?/, "");
};

export const formatUsername = (username: string) => {
  const formattedUsername = username.toLowerCase().replace(/[^a-z]/g, "");
  return formattedUsername.length > 15
    ? formattedUsername.substring(0, 15)
    : formattedUsername.padEnd(2, "x");
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
  return formattedDisplayName.length > 15
    ? formattedDisplayName.substring(0, 15)
    : formattedDisplayName.padEnd(2, "_");
};

export const ensureHttpsLink = (link: string): string => {
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    return `https://${link}`;
  }
  return link;
};

export const areArraysEqual = <T>(arrayOne: T[], arrayTwo: T[]) =>
  arrayOne.length === arrayTwo.length &&
  arrayOne.every((element, index) => element === arrayTwo[index]);

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
