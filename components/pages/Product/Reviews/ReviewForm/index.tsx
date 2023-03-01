import { Formik, Form, FormikHelpers } from 'formik';

import { z } from 'Zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import ReviewFormSelect from './ReviewFormSelect';
import ReviewFormRating from './ReviewFormRating';
import ImageUploadInput from './ImageUpload';
import ReviewTextArea from './ReviewTextArea';
import ValidationErrorList from './ValidationErrorList';
import ImagePreviews from './ImageUpload/ImagePreviews';

const fits = ['Well', 'Awful', 'Not bad'];

interface ReviewFormProps {
  sizes: string[];
  colors: string[];
}

const initialState: ReviewFormValues = {
  size: '',
  color: '',
  fit: '',
  rating: '',
  review: '',
  files: [],
};

const validationSchema = z.object({
  size: z.string({ required_error: 'Please select a size' }),
  color: z.string({ required_error: 'Please select a color' }),
  fit: z.string({ required_error: 'Please choose a fit' }),
  review: z.string({ required_error: 'Please provide a review' }),
  rating: z.number({ required_error: 'Please give product a rating' }),
} as Record<keyof ReviewFormValues, any>);

export default function ReviewForm({ sizes, colors }: ReviewFormProps) {
  const onFormSubmit = (
    values: ReviewFormValues,
    { resetForm, setFieldValue }: FormikHelpers<ReviewFormValues>,
  ) => {
    console.log(values);
    resetForm();
    setFieldValue('rating', 0);
  };

  return (
    <Formik
      onSubmit={onFormSubmit}
      initialValues={initialState}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({ values: { color, size, fit, files }, handleSubmit, errors }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className="mt-4 p-4 pt-0 flex flex-col gap-4 rounded-md bg-white-dark">
              <div className="mt-4 flex flex-col flex-wrap md:flex-nowrap items-start sm:items-center md:flex-row gap-8">
                <ReviewFormSelect label={color} name="color" items={colors} />
                <ReviewFormSelect label={size} name="size" items={sizes} />
                <ReviewFormSelect label={fit} name="fit" items={fits} />
                <ReviewFormRating />
              </div>
              <ReviewTextArea name="review" />
              <div className="flex md:flex-row flex-col gap-6">
                <ImageUploadInput name="files" />
                <ImagePreviews files={files} />
              </div>
              <ValidationErrorList errors={Object.entries(errors)} />
              <button
                type="submit"
                className="-mt-0.5 w-full rounded-sm transition-colors duration-300 hover:bg-yellow-light text-white h-12 hover:underline bg-yellow text-lg font-bold mt-4"
              >
                Submit Review
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
