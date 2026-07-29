import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect, useRef } from 'react';

import { useForm } from '@hooks/use-form.ts';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { updateUserData } from '@services/store/user/actions.ts';
import { selectUser } from '@services/store/user/slice.ts';

import type { TRegisterFormData } from '@utils/types.ts';
import type { JSX, FormEvent, ChangeEvent } from 'react';

import styles from './profile-info.module.css';

export const ProfileInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [nameEditLocked, setNameEditLocked] = useState<boolean>(true);

  const { values, handleChange, setValues } = useForm<TRegisterFormData>({
    name: '',
    email: '',
    password: '',
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const initialFormRef = useRef({
    name: '',
    email: '',
    password: '',
  });

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || '',
        email: user.email || '',
        password: '',
      };

      const isUserDataChanged =
        userData.name !== initialFormRef.current.name ||
        userData.email !== initialFormRef.current.email;

      if (isUserDataChanged || !isInitializedRef.current) {
        setValues(userData);
        initialFormRef.current = userData;
        setIsFormChanged(false);
        isInitializedRef.current = true;
      }
    }
  }, [user, setValues]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    handleChange(e);

    const updatedForm = { ...values, [name]: value };
    const isChanged =
      updatedForm.name !== initialFormRef.current.name ||
      updatedForm.email !== initialFormRef.current.email ||
      updatedForm.password !== initialFormRef.current.password;

    setIsFormChanged(isChanged);
  };

  const handleSave = (e: FormEvent): void => {
    e.preventDefault();

    const updatedData: Partial<typeof values> = {};
    if (values.name !== initialFormRef.current.name) updatedData.name = values.name;
    if (values.email !== initialFormRef.current.email) updatedData.email = values.email;
    if (values.password) updatedData.password = values.password;

    if (Object.keys(updatedData).length > 0) {
      void dispatch(updateUserData(updatedData));
      initialFormRef.current = { ...values };
      setIsFormChanged(false);
    }
  };

  const handleCancel = (): void => {
    setValues({ ...initialFormRef.current });
    setIsFormChanged(false);
  };

  return (
    <form className={`flex flex-column ${styles.form}`} onSubmit={handleSave}>
      <Input
        name={'name'}
        placeholder={'Имя'}
        icon={'EditIcon'}
        value={values.name}
        disabled={nameEditLocked}
        onIconClick={() => setNameEditLocked(false)}
        onBlur={() => setNameEditLocked(true)}
        onChange={handleFormChange}
      />
      <EmailInput
        name={'email'}
        placeholder={'Логин'}
        isIcon={true}
        value={values.email}
        onChange={handleFormChange}
      />
      <PasswordInput
        name={'password'}
        placeholder={'Пароль'}
        icon={'EditIcon'}
        value={values.password}
        onChange={handleFormChange}
      />
      {isFormChanged && (
        <div className={styles.actions}>
          <Button htmlType={'submit'} type={'primary'} size={'medium'}>
            Сохранить
          </Button>
          <Button
            htmlType={'button'}
            type={'secondary'}
            size={'medium'}
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};
