import { useState } from "react";

const useBooleanList = (
  initialValue: boolean[],
): [
  boolean[],
  React.Dispatch<React.SetStateAction<boolean[]>>,
  () => void,
  (index: number) => void,
  (index: number) => void,
] => {
  const [values, setValues] = useState<boolean[]>(initialValue);
  const addElement = () => setValues([...values, false]);
  const toggleElement = (index: number) => {
    setValues(values.map((value, i) => (i === index ? !value : value)));
  };
  const removeElement = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  return [values, setValues, addElement, toggleElement, removeElement];
};

export default useBooleanList;
