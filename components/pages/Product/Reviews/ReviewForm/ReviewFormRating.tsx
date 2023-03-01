import { useRef } from 'react';
import { useFormikContext } from 'formik';
import Rating from '@mui/material/Rating';

const labels: Record<number, string> = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Great',
  5: 'Great+',
};

export default function ReviewFormRating() {
  const rating = useRef<number | null>(null);
  const { setFieldValue } = useFormikContext<ReviewFormValues>();

  const onChange = (value: number) => {
    setFieldValue('rating', value);
    rating.current = value;
  };

  return (
    <div className="flex flex-grow items-center pr-1 justify-end gap-2">
      {rating !== null && rating.current && (
        <span className="font-semibold">{labels[rating.current]}</span>
      )}
      <Rating
        name="rating"
        defaultValue={0}
        precision={0.5}
        value={rating.current}
        onChange={(_, value) => onChange(value!)}
        className="text-yellow-light !text-4xl"
      />
    </div>
  );
}
