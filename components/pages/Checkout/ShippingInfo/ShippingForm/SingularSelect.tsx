import Image from 'next/image';
import { HTMLProps } from 'react';
import { useField } from 'formik';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

interface SingularSelectProps extends HTMLProps<HTMLInputElement> {
  options: { code: string; name: string }[];
  name: string;
  title: string;
  placeholder: string;
}

export default function SingularSelect({
  options,
  title,
  placeholder,
  ...selectProps
}: SingularSelectProps) {
  const [field, { touched, error }] = useField(selectProps);

  return (
    <div className="mb-4 w-[230px]">
      {title && (
        <div className={`header ${error ? '---error' : ''}`}>
          <div className="---flex relative">
            {error && (
              <Image
                src="/images/warning.png"
                alt={title}
                className="absolute top-3.5 left-[5rem]"
                width={25}
                height={25}
                loading="lazy"
              />
            )}
          </div>
        </div>
      )}
      <TextField
        variant="outlined"
        select
        {...field}
        label={placeholder}
        className="select w-full"
        size="medium"
        helperText={touched ? error : undefined}
        error={touched && !!error}
      >
        <MenuItem value="">No Selected / Or Empty</MenuItem>
        {options.map(({ code, name }) => (
          <MenuItem key={code} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
