// General Constants
export const MEGABYTES = 1048 * 1048;
export const DEFAULT_IMAGE_SIZE = 1000;
export const MAXIMUM_IMAGE_SIZE = 5 * MEGABYTES;

// User Profile Regex
export const USERNAME_REGEX = /^[a-z]{2,15}$/;
export const DISPLAY_NAME_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-. @&#:_]{2,15}$/;
export const BIO_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-.?!@#$%^&*()_+=\[\]{}|\\;:"<>,/ \n]{0,150}$/;
export const PRONOUNS_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]{1,6}$/;
export const SOCIAL_LINK_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

// User Profile Constants
export const DEFAULT_PROFILE_PICTURE = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PICTURE as string;
export const DEFAULT_PRONOUNS: [string, string][] = [
  ["", ""],
  ["he", "him"],
  ["she", "her"],
  ["they", "them"],
];

// Global Modal Constants
export const DEFAULT_MODAL_TEXT = "";
export const DEFAULT_MODAL_THEME = "base";
export const DEFAULT_MODAL_BUTTONS = ["close"];
