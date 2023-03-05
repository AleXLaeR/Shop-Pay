import { useField } from 'formik';
import TextField from '@mui/material/TextField';
import { HTMLInputTypeAttribute, HTMLProps } from 'react';

interface ShippingInputProps extends HTMLProps<HTMLInputElement> {
  name: keyof CheckoutFormValues;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

export default function ShippingFormInput({
  className,
  placeholder,
  ...inputProps
}: ShippingInputProps) {
  const [field, { touched, error }] = useField(inputProps);

  return (
    <div className="w-full mb-5">
      <TextField
        type={inputProps.type}
        {...field}
        label={placeholder}
        variant="outlined"
        size="medium"
        helperText={touched ? error : undefined}
        error={touched && !!error}
        className={`w-full pl-4 pt-2 text-black-light border-grey-light border ${className || ''}`}
      />
    </div>
  );
}
