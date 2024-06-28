import { KEYBOARD_KIT_ITEMS } from "@/src/constants";

type KitKeys = (typeof KIT_KEYS)[number];

export type KitType = Partial<Pick<KeyboardType, KitKeys>>;

export type ItemType = { name: string; link?: string };
export type ItemValidity = { name: boolean; link?: boolean };

export interface KeyboardType {
  id: string;
  uid: string;
  name: string;
  description: string;
  kitName: string;
  kit: KitType;
  kitLink?: string;
  case: string;
  caseLink?: string;
  pcb: string;
  pcbLink?: string;
  plate: string;
  plateLink?: string;
  size: string;
  switches: MaxLengthArray<string, 6>;
  stabilizers: MaxLengthArray<string, 6>;
  keycaps: MaxLengthArray<string, 6>;
  mods: string[];
  images: string[];
  createdAt: Date;
  draft: boolean;
  visible: boolean;
}
