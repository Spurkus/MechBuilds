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
  switches: MaxLengthArray<ItemType, 3>;
  stabilizers: MaxLengthArray<ItemType, 3>;
  keycaps: MaxLengthArray<ItemType, 3>;
  mods: MaxLengthArray<string, 10>;
  images: string[];
  createdAt: Date;
  visible: boolean;
}
