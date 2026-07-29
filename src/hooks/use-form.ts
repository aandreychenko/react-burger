import { useState } from 'react';

import type { ChangeEvent, SetStateAction, Dispatch } from 'react';

export function useForm<T extends Record<string, string> = Record<string, string>>(
  inputValues: T
): {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<T>>;
} {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange, setValues };
}
