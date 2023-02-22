/* eslint-disable react/jsx-no-useless-fragment */
import { HTMLInputTypeAttribute, HTMLProps } from 'react';
import { useToggle } from '@hooks/index';
import { useField } from 'formik';

import { BiLock, BiUser } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { SiMinutemailer } from 'react-icons/si';
import { IoKeyOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import ErrorLabel from './helpers/ErrorLabel';

interface LoginInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

export default function LoginInput({ type, ...inputProps }: LoginInputProps) {
  const {
    toggleState: isPasswordVisible,
    handlers: { toggle },
  } = useToggle();
  const [field, meta, { setValue, setTouched }] = useField(inputProps);

  return (
    <div
      className={`relative max-w-[28rem] rounded-3xl items-center w-full bg-grey my-1.5 h-14 grid-15-85 px-4 mb-4 transition-[background-color,margin-top] duration-300 ${
        meta.touched && meta.error
          ? '!bg-error mt-20 [&>input]:text-white [&>input]:!placeholder-white [&>svg]:stroke-white [&_svg]:fill-white'
          : ''
      }`}
    >
      {inputProps.name === 'confirmPassword' ? (
        <BiLock className="w-7 h-7 stroke-grey-dark fill-grey-dark" />
      ) : type === 'email' ? (
        <SiMinutemailer className="w-7 h-7 stroke-grey-dark fill-grey-dark" />
      ) : type === 'password' ? (
        <IoKeyOutline className="w-6 h-6 stroke-grey-dark fill-grey-dark" />
      ) : (
        <BiUser className="w-7 h-7 stroke-grey-dark fill-grey-dark" />
      )}
      <input
        type={isPasswordVisible ? 'text' : type}
        {...field}
        {...inputProps}
        className="input-base"
        {...(type === 'password' ? { maxLength: 16 } : undefined)}
      />
      <span
        className={`absolute right-0 w-12 rounded-r-xl flex-center bg-grey-light h-full transition-[background-color] duration-300 hover:bg-grey-lighter [&>svg]:transition-transform hover:[&>svg]:scale-110 ${
          meta.touched && meta.error ? '!bg-error-secondary' : ''
        }`}
      >
        {type === 'password' ? (
          <>
            {isPasswordVisible ? (
              <IoEyeOutline className="p-1 w-9 h-9 cursor-pointer" onClick={toggle} />
            ) : (
              <IoEyeOffOutline className="p-1 w-9 h-9 cursor-pointer" onClick={toggle} />
            )}
          </>
        ) : (
          <MdClear
            className="p-1 w-9 h-9 cursor-pointer"
            onClick={() => {
              setTouched(false);
              setValue('', false);
            }}
          />
        )}
      </span>
      <ErrorLabel meta={meta} name={field.name} />
    </div>
  );
}
