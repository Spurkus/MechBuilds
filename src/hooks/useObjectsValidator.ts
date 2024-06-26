import { useState, useEffect, useRef } from "react";

type ValidatorFunction<T> = (value: T[]) => boolean;
type FieldValidatorFunction<T> = (value: T) => boolean;

function useObjectsValidator<T extends object>(
  initialValues: T[],
  isValidObject: ValidatorFunction<T>,
  ...fieldValidators: FieldValidatorFunction<any>[]
): [
  T[],
  React.Dispatch<React.SetStateAction<T[]>>,
  (element: T) => void,
  (index: number, newValue: T) => void,
  (index: number) => void,
  boolean,
  Partial<Record<keyof T, boolean>>[],
] {
  // Check if the number of field validators match the number of fields in the object
  if (fieldValidators.length !== Object.keys(initialValues[0]).length) {
    throw new Error("Number of field validators should match the number of fields in the object");
  }

  // Using function references for dependency withdrawal
  const isValidObjectRef = useRef(isValidObject);
  const fieldValidatorsRef = useRef(fieldValidators);

  // Setting states for object validation
  const [values, setValues] = useState<T[]>(initialValues);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationMap, setValidationMap] = useState<Partial<Record<keyof T, boolean>>[]>([]);
  const addElement = (element: T) => setValues([...values, element]);
  const updateElement = (index: number, newValue: T) => {
    setValues(values.map((value, i) => (i === index ? newValue : value)));
  };
  const removeElement = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  // Validate the objects when the values change
  useEffect(() => {
    // Create an array of objects with the validation results for each field
    const newValidationResults: Partial<Record<keyof T, boolean>>[] = values.map(
      (obj: { [key: string]: any }) => {
        const fieldResults: Partial<Record<keyof T, boolean>> = {};

        // Validate each field in the object
        Object.keys(obj).forEach((key, index) => {
          const isValidField = fieldValidatorsRef.current[index](obj[key]);
          fieldResults[key as keyof T] = isValidField;
        });

        return fieldResults;
      },
    );

    setIsValid(
      isValidObjectRef.current(values) && // Check if the object is valid and all fields are true
        newValidationResults.every((obj) => Object.values(obj).every((value) => value === true)),
    );
    setValidationMap(newValidationResults);
  }, [values]);

  return [values, setValues, addElement, updateElement, removeElement, isValid, validationMap];
}

export default useObjectsValidator;
