import { useState } from 'react';

import type { ChangeEvent } from 'react';

export function useForm<T extends Record<string, string> = Record<string, string>>(
  inputValues: T
): {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
} {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange, setValues };
}
