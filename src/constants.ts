import defaultProfilePicture from "@/src/public/images/Default Profile Picture.png";
import defaultKeyboardImage from "@/src/public/images/Default Keyboard Image.png";

// General Constants
export const MEGABYTES = 1048 * 1048;
export const DEFAULT_IMAGE_SIZE = 1000;
export const DEFAULT_KEYBOARD_IMAGE_WIDTH = 1600;
export const DEFAULT_KEYBOARD_IMAGE_HEIGHT = 900;
export const MAXIMUM_IMAGE_SIZE = 5 * MEGABYTES;

// General Regex
export const LINK_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

// User Profile Regex
export const USERNAME_REGEX = /^[a-z]{2,15}$/;
export const DISPLAY_NAME_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-. @&#:_]{2,15}$/;
export const BIO_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿ'-.?!@#$%^&*()_+=\[\]{}|\\;:"<>,/ \n]{0,150}$/;
export const PRONOUNS_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]{1,6}$/;

// Keyboard Regex
export const KEYBOARD_NAME_REGEX = /^[A-Za-z0-9-_ ]{2,50}$/;
export const KEYBOARD_DESCRIPTION_REGEX =
  /^[A-Za-z0-9À-ÖØ-öø-ÿ'-.?!@#$%^&*()_+=\[\]{}|\\;:"<>,/ \n]{0,1000}$/;
export const KEYBOARD_SIZE_REGEX = /^[A-Za-z0-9-_ \(\)%]{1,20}$/;
export const KEYBOARD_PLATE_REGEX = /^[A-Za-z0-9-_ \(\)%]{1,50}$/;
export const KEYBOARD_MOD_REGEX = /^[A-Za-z0-9-_ \(\)\[\]]{1,25}$/;

// Keyboard Constants
export const KEYBOARD_KIT_ITEMS = ["case", "pcb", "plate", "stabilizers", "keycaps"];
export const KEYBOARD_SIZES = ["100% (Full Size)", "80% (TKL)", "75%", "65%", "60%"];
export const KEYBOARD_PLATES = ["Polycarbonate (PC)", "FR4", "POM", "Aluminium", "Acrylic"];
export const DEFAULT_KEYBOARD_IMAGE = defaultKeyboardImage;

// User Profile Constants
export const DEFAULT_PROFILE_PICTURE = defaultProfilePicture;
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
