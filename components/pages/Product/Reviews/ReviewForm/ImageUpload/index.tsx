import { ChangeEvent, useRef } from 'react';
import { useField, useFormikContext } from 'formik';

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5mb
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];

interface FileUploadInputProps {
  multiple?: boolean;
  name: string;
  acceptedFormats?: string;
}

export default function ImageUploadInput({
  multiple = true,
  acceptedFormats,
  ...inputProps
}: FileUploadInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [{ value, ...field }, meta, { setError }] = useField(inputProps);
  const { setFieldValue } = useFormikContext<ReviewFormValues>();

  const onInputChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    let selectedFiles = Array.from(files ?? []);

    if (value.length >= 3) {
      console.log(selectedFiles.length);
      setError('Maximum 3 images allowed.');
      return;
    }

    selectedFiles.forEach((file) => {
      if (!allowedFileTypes.includes(file.type)) {
        setError(`${file.name} format is unsupported ! only JPEG, PNG, WEBP are allowed.`);
        selectedFiles = selectedFiles.filter(({ name }) => name === file.name);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('File size cannot be larger than 5 mb.');
        selectedFiles = selectedFiles.filter(({ name }) => name === file.name);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setFieldValue(inputProps.name, [...value, dataUrl]);
      };
      reader.onerror = () => {
        setError('Failed to read image file.');
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        {...field}
        {...inputProps}
        hidden
        accept={acceptedFormats ?? allowedFileTypes.join(',')}
        onChange={onInputChange}
        multiple={multiple}
      />
      <button
        type="button"
        className={`-mt-0.5 w-[200px] rounded-sm transition-colors duration-300 hover:bg-yellow-light text-white h-12 hover:underline ${
          value.length >= 3 ? 'bg-error-secondary cursor-not-allowed' : 'bg-yellow'
        } text-lg font-bold mt-4`}
        onClick={() => inputRef.current && inputRef.current.click()}
        disabled={value.length >= 3}
      >
        {value.length >= 3 ? '3 images allowed' : 'Add images'}
      </button>
    </>
  );
}
