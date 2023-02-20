/* eslint-disable react/jsx-no-useless-fragment */
import { FieldMetaProps, ErrorMessage } from 'formik';

interface Props {
  meta: FieldMetaProps<string>;
  name: string;
}

export default function ErrorLabel({ meta: { touched, error }, name }: Props) {
  return (
    <>
      {touched && error && (
        <div className="absolute -top-[70px] bg-error-secondary h-16 w-full rounded-2xl grid place-items-center text-white font-bold text-sm p-2.5">
          <span className="absolute -bottom-2.5 left-4 border-t-[10px] border-t-error-secondary border-x-transparent border-x-[10px]" />
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
}
