export type ModalThemeType = "base" | "error" | "success" | "fail";
export type ModalButtonThemeType = "base" | "info" | "success" | "warning" | "error";
export type ModalButtonType =
  | string
  | { text: string; type: ModalButtonThemeType; onClick: () => void };
