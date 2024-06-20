"use server";
import { cookies } from "next/headers";

const DEFAULT_THEME = "dark";
const DEFAULT_USERNAME = "username";

export const saveTheme = (theme: string) => {
  const cookieStore = cookies();
  cookieStore.set("theme", theme);
};

export const getTheme = async () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")
    ? cookieStore.get("theme")!.value
    : DEFAULT_THEME;

  return theme;
};

export const saveAuthenticated = (authenticated: boolean) => {
  const cookiesStore = cookies();
  cookiesStore.set("signedIn", authenticated ? "true" : "false");
};

export const getAuthenticated = async () => {
  const cookieStore = cookies();
  const authenticated = cookieStore.get("signedIn")
    ? cookieStore.get("signedIn")!.value === "true"
      ? true
      : false
    : false;

  return authenticated;
};

export const saveUsername = (name: string) => {
  const cookieStore = cookies();
  cookieStore.set("username", name);
};

export const getUsername = async () => {
  const cookieStore = cookies();
  const name = cookieStore.get("username")
    ? cookieStore.get("username")!.value
    : DEFAULT_USERNAME;

  return name;
};

export const saveProfilePicture = (profilePicture: string) => {
  const cookieStore = cookies();
  cookieStore.set("profilePicture", profilePicture);
};

export const getProfilePicture = async () => {
  const cookieStore = cookies();
  const profilePicture = cookieStore.get("profilePicture")
    ? cookieStore.get("profilePicture")!.value
    : "";

  return profilePicture;
};
