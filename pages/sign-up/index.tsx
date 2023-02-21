import { LoginInput, SubmitButton } from '@common/form';
import SEO from '@common/SEO';
import { Footer, Header } from '@components/layout';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';

import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

const state = {
  country: {
    name: 'Ukraine',
    flag: { emojitwo: 'https://cdn.ipregistry.co/flags/emojitwo/ua.svg' },
  },
  currency: { code: 'UAH' },
};

type SignUpState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultState: SignUpState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = z
  .object({
    name: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(4, { message: 'Username should be at least 4 characters long' })
      .max(24, { message: 'Username should be at most 24 characters long' })
      .regex(/^[A-Za-z0-9\s]+$/, { message: 'Only letters and digits are allowed' }),
    email: z
      .string({ required_error: 'E-Mail is required' })
      .email({ message: 'Provided values is not a valid E-Mail address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must consist of at least 8 characters' })
      .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, {
        message:
          'Password must be complex (at least 1 digit, one uppercase letter, one lowercase letter)',
      }),
    confirmPassword: z.string().optional(),
  } as Record<keyof SignUpState, any>)
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SignUp() {
  const [userFormValues, setUserFormValues] = useState(defaultState);

  return (
    <>
      <SEO title="Sign-In to ShopPay" desc="Login / Registration page" />
      <Header data={state} />
      <div className="relative border-y border-y-greyish min-h-screen overflow-hidden flex justify-center">
        <div className="p-12 mt-12">
          <div className="flex-between max-w-[26rem] relative -left-2 gap-2">
            <div className="min-w-[3rem] h-12 border-greyish border-[1px] shadow-md rounded-full grid place-items-center cursor-pointer hover:border-blue transition-[transform] duration-300 hover:-translate-y-1">
              <BiLeftArrowAlt className="w-6 h-6 fill-black-lighter" />
            </div>
            <span className="font-semibold flex-grow text-base">
              We&apos;d be happy for you to join us!{' '}
              <Link
                href="/"
                className="text-blue cursor-pointer hover:border-b-[1px] hover:border-blue"
              >
                Go to Store
              </Link>
            </span>
          </div>
          <div className="mt-4">
            <h1 className="font-semibold text-[3.25rem]">Sign Up</h1>
            <p className="text-[#96979b]">Get access to our E-Shopping services</p>
            <Formik
              initialValues={userFormValues}
              onSubmit={() => {}}
              enableReinitialize
              validationSchema={toFormikValidationSchema(validationSchema)}
            >
              {({ isSubmitting, handleSubmit }) => (
                <Form method="post" className="mt-8" onSubmit={handleSubmit}>
                  <LoginInput
                    type="text"
                    name="name"
                    placeholder="Your Username*"
                    autoComplete="username"
                    pattern="[^A-Za-z0-9]"
                  />
                  <LoginInput
                    type="email"
                    name="email"
                    placeholder="E-Mail Address*"
                    autoComplete="email"
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Your password*"
                    autoComplete="current-password"
                  />
                  <LoginInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password*"
                    autoComplete="new-password"
                  />
                  <SubmitButton content="Sign Up" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country={state.country} />
    </>
  );
}
