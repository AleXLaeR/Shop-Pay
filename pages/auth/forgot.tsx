import { LoginInput, SubmitButton } from '@common/form';
import { DotLoader } from '@common/loaders';

import Link from 'next/link';
import { Form, Formik, FormikHelpers } from 'formik';

import SEO from '@common/SEO';
import { Footer, Header } from '@components/layout';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [postForgotPassword, { data, isLoading, error }] = useForgotPasswordMutation();

  const onFormSubmit = async (values: FormState, { setErrors }: FormikHelpers<FormState>) => {
    const res: any = await postForgotPassword(values);

    if (res?.error) {
      setErrors({ email: res.error.data.message });
    }
  };

  return (
    <>
      <SEO title="Forgot password Page | ShopPay" desc="User Password Forgot page | ShopPay" />
      <Header data={state} />
      {isLoading && <DotLoader content="Please wait for a bit..." />}
      <div className="min-h-[650px] border border-grey-dark grid place-items-center">
        <div className="max-w-[400px]">
          <p className="text-center font-bold text-5xl italic mb-12 md:mb-16">
            <span className="text-error">S</span>
            <span className="text-green">H</span>
            <span className="text-violet">O</span>
            <span className="text-yellow">P</span>
            <span className="bg-blue ml-2 text-white px-2 pb-2 font-normal rounded-lg inline-flex items-center">
              Pay
            </span>
          </p>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => router.back()}
              className="min-w-[3rem] h-12 border border-greyisshadow-md rounded-full flex-center cursor-pointer hover:border-blue transition-transform hover:-translate-y-1"
            >
              <BiLeftArrowAlt className="w-6 h-6 fill-black-lighter" />
            </button>
            <span className="font-semibold text-sm">
              Enter the email address associated with your account and we&apos;ll send you a link to
              reset your password.
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
          <p className="text-center font-semibold mt-16 text-lg">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-blue link ml-1">
              Sign Up instead!
            </Link>
          </p>
        </div>
      </div>
      <Footer country={state.country} />
    </>
  );
}
