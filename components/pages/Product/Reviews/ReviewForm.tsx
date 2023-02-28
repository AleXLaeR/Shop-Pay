import { useState } from 'react';
import ReviewFormSelect from './ReviewFormSelect';

interface ReviewFormProps {
  sizes: string[];
  colors: string[];
}

export type FormSelectState = {
  size: string;
  color: string;
  sortBy: string;
  minRating: string;
};

export default function ReviewForm({ sizes, colors }: ReviewFormProps) {
  const [selectState, setSelectState] = useState<FormSelectState>({
    size: '',
    color: '',
    sortBy: '',
    minRating: '',
  });

  const onSelectStateChange = (value: Partial<FormSelectState>) => {
    setSelectState((prev) => ({ ...prev, ...value }));
  };

  return (
    <div className="mt-4 p-4 flex flex-col gap-4 rounded-md">
      <div className="flex flex-col md:flex-row gap-8">
        <ReviewFormSelect
          label={selectState.color}
          property="color"
          dropItems={colors}
          handleChange={onSelectStateChange}
        />
        <ReviewFormSelect
          label={selectState.size}
          property="size"
          dropItems={sizes}
          handleChange={onSelectStateChange}
        />
      </div>
    </div>
  );
}
