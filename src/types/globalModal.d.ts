export type ModalThemeType = "base" | "error" | "success" | "fail";
export type ModalButtonThemeType = "base" | "neutral" | "info" | "success" | "warning" | "error";
export type ModalButtonType = string | { text: string; type: ModalButtonThemeType; onClick: () => void };
