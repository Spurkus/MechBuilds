export type KitType = Partial<
  Pick<KeyboardType, "case" | "pcb" | "plate" | "stabilizers" | "keycaps">
>;

export interface KeyboardType {
  id: string;
  uid: string;
  name: string;
  description: string;
  kit: KitType;
  kitLink?: string;
  case: string;
  caseLink?: string;
  pcb: string;
  pcbLink?: string;
  plate: string;
  plateLink?: string;
  size: string;
  switches: string[];
  switchesLink?: string;
  stabilizers: string[];
  stabilizersLink?: string;
  keycaps: string[];
  keycapsLink?: string;
  mods: string[];
  images: string[];
  createdAt: Date;
}
