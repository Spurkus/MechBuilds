import { ItemType } from "@/src/types/keyboard";
import { useMemo, useRef, useEffect } from "react";
import { DEFAULT_ITEMS } from "@/src/constants";
import useObjectsValidator from "./useObjectsValidator";
import useBooleanList from "./useBooleanList";

const useKeyboardItem = (
  initialItems: ItemType[],
  itemsValidation: (items: ItemType[]) => boolean,
  nameValidation: (name: string) => boolean,
  linkValidation: (link: string) => boolean,
  initialBooleanList: boolean[],
): [
  ItemType[],
  React.Dispatch<React.SetStateAction<ItemType[]>>,
  (element: ItemType) => void,
  (index: number, newValue: ItemType) => void,
  (index: number) => void,
  boolean,
  Partial<Record<keyof ItemType, boolean>>[],
  boolean[],
  React.Dispatch<React.SetStateAction<boolean[]>>,
  () => void,
  (index: number) => void,
  (index: number) => void,
  () => void,
  (index: number) => void,
  boolean,
  boolean,
] => {
  // Objects validation
  const [items, setItems, addItems, updateItems, removeItems, validItems, validItemsMap] =
    useObjectsValidator<ItemType>(initialItems, itemsValidation, nameValidation, linkValidation);

  // Boolean list for selected link in items
  const [
    itemsSelectedLink,
    setItemsSelectedLink,
    addItemsSelectedLink,
    toggleItemsSelectedLink,
    removeItemsSelectedLink,
  ] = useBooleanList(initialBooleanList);

  // Adding and removing items by checking the number of items
  const oneItem = useMemo(() => items.length === 1, [items]);
  const maxItems = useMemo(() => items.length >= 3, [items]);
  const removeItem = (index: number) => {
    if (oneItem) return;
    removeItemsSelectedLink(index);
    removeItems(index);
  };
  const addNewItem = () => {
    if (maxItems) return;
    addItems(DEFAULT_ITEMS[0]);
    addItemsSelectedLink();
  };

  return [
    items,
    setItems,
    addItems,
    updateItems,
    removeItems,
    validItems,
    validItemsMap,
    itemsSelectedLink,
    setItemsSelectedLink,
    addItemsSelectedLink,
    toggleItemsSelectedLink,
    removeItemsSelectedLink,
    addNewItem,
    removeItem,
    oneItem,
    maxItems,
  ];
};

export default useKeyboardItem;
