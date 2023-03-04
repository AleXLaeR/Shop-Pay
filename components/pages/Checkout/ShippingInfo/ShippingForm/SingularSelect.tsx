import Image from 'next/image';
import { HTMLProps } from 'react';
import { useField } from 'formik';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

interface SingularSelectProps extends HTMLProps<HTMLInputElement> {
  options: { id: number; name: string }[];
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
    <div className="mb-4 max-w-[230px]">
      {title && (
        <div className={`header ${error ? '---error' : ''}`}>
          <div className="---flex relative">
            {error && (
              <Image
                src="/images/warning.png"
                alt={title}
                className="absolute top-3 left-[15rem]"
                width={32}
                height={32}
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
        {options.map(({ id, name }) => (
          <MenuItem key={id} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
