"use server";
import { cookies } from "next/headers";

const DEFAULT_THEME = "dark";

export const saveTheme = (theme: string) => {
  const cookieStore = cookies();
  cookieStore.set("theme", theme);
};

export const getTheme = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")
    ? cookieStore.get("theme")!.value
    : DEFAULT_THEME;

  return theme;
};
