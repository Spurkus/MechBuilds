import { useState, useEffect } from "react";

const useInputValidator = <T>(
  initialValue: T,
  validator: (value: T) => boolean | Promise<boolean>,
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const validate = async () => {
      const result = await validator(value);
      setIsValid(result);
    };

    validate();
  }, [value, validator]);

  return [value, setValue, isValid];
};

export default useInputValidator;
