import { LoginInput, SubmitButton } from '@common/form';
import { DotLoader } from '@common/loaders';

import Link from 'next/link';
import { Form, Formik, FormikHelpers } from 'formik';

import SEO from '@common/SEO';
import { Footer, Header } from '@components/layout';
import { BiLeftArrowAlt } from 'react-icons/bi';

import { z } from 'Zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { useForgotPasswordMutation } from '@store/api';

type FormState = { email: string };
const defaultState: FormState = { email: '' };

const state = {
  country: {
    name: 'Ukraine',
    flag: { emojitwo: 'https://cdn.ipregistry.co/flags/emojitwo/ua.svg' },
  },
  currency: { code: 'UAH' },
};

const validationSchema = z.object({
  email: z
    .string({ required_error: 'E-Mail is required' })
    .email({ message: 'Provided values is not a valid E-Mail address' }),
} as Record<keyof FormState, any>);

export default function ForgotPassword() {
  const [postForgotPassword, { data, isLoading, error }] = useForgotPasswordMutation();

  const onFormSubmit = async (values: FormState, { setErrors }: FormikHelpers<FormState>) => {
    const res: any = await postForgotPassword(values);

    if (res?.error) {
      setErrors({ email: res.error.data?.message ?? 'Error' });
    }
  };

  return (
    <>
      <SEO title="Password reset Page | ShopPay" desc="User Password reset page | ShopPay" />
      <Header data={state} />
      {isLoading && <DotLoader content="Please wait for a bit..." />}
      <div className="min-h-[320px] border border-grey-dark grid place-items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="min-w-[3rem] h-12 border border-greyisshadow-md rounded-full flex-center cursor-pointer hover:border-blue transition-transform hover:-translate-y-1">
              <BiLeftArrowAlt className="w-6 h-6 fill-black-lighter" />
            </div>
            <span className="font-semibold">
              Forgot your Password ?{' '}
              <Link href="/sign-in" className="text-blue cursor-pointer pb-1 link">
                Login Instead!
              </Link>
            </span>
          </div>
          <Formik
            onSubmit={onFormSubmit}
            initialValues={defaultState}
            validationSchema={toFormikValidationSchema(validationSchema)}
          >
            {({ dirty, isValid, isSubmitting, handleSubmit }) => (
              <Form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
                <LoginInput
                  type="email"
                  name="email"
                  placeholder="E-Mail Address"
                  autoComplete="email"
                />
                <SubmitButton content="Send link" disabled={!dirty || !isValid || isSubmitting} />
              </Form>
            )}
          </Formik>
          {data && <p className="text-center text-xl text-success mt-8">{data.message}</p>}
          {error && (
            <p className="text-center text-xl text-error mt-4">{(error as any).data.message}</p>
          )}
        </div>
      </div>
      <Footer country={state.country} />
    </>
  );
}
