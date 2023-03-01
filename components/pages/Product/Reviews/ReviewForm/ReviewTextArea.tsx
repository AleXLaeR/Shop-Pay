import { useField } from 'formik';

interface ReviewTextAreaProps {
  name: string;
  rows?: number;
  maxLength?: number;
}

export default function ReviewTextArea({ name, rows = 5, maxLength = 1e3 }: ReviewTextAreaProps) {
  const [field] = useField(name);

  return (
    <div className="relative w-full">
      <textarea
        {...field}
        rows={rows}
        maxLength={maxLength}
        placeholder="Write Your review here..."
        className="w-full text-lg border-0 bg-white outline-0 focus:outline-1 outline-grey-light rounded-sm resize-none p-2"
      />
      <span className="absolute right-2 bottom-3 text-right text-grey-lighter -my-1">
        {field.value.length} / {maxLength} characters
      </span>
    </div>
  );
}
