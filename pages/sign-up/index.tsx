import { KeyboardEvent, useEffect } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import SEO from '@common/SEO';
import { DotLoader } from '@common/loaders';
import { LoginInput, SubmitButton } from '@common/form';
import { Footer, Header } from '@components/layout';

import { BiLeftArrowAlt } from 'react-icons/bi';
import { useSignUpMutation } from '@store/api';
import { toast } from 'react-toastify';

import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'Zod';

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
  const router = useRouter();
  const { data: session } = useSession();
  const [postSignUp, { data, isLoading, error }] = useSignUpMutation();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (data !== undefined) {
      toast.success('Successful Sign Up! Redirection will happen in 5 seconds.');
      timeout = setTimeout(() => router.push('/'), 5e3);
    } else if (error !== undefined) {
      toast.error('User with such E-Mail already exists!');
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!/^[a-zA-Z0-9\s]*$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const onFormSubmit = async (values: SignUpState, { setErrors }: FormikHelpers<SignUpState>) => {
    const res: any = await postSignUp(values);
    if (res?.error) {
      setErrors({ email: res.error.data.message });
      return;
    }

    const nextRes = await signIn('credentials', {
      redirect: false,
      ...values,
    });
    if (nextRes?.error) {
      setErrors({ email: nextRes.error });
    }
  };

  return (
    <>
      <SEO title="Sign-Up to ShopPay" desc="ShopPay Registration page" />
      <Header data={state} />
      {isLoading && <DotLoader content="Please wait for a bit..." />}
      <div className="relative border-y border-y-greyish min-h-screen overflow-hidden flex justify-center">
        <div className="p-12 mt-12">
          <div className="flex-between max-w-[26rem] relative -left-2 gap-2">
            <Link
              href="/"
              className="min-w-[3rem] h-12 border-greyish border shadow-md rounded-full flex-center cursor-pointer hover:border-blue transition-transform hover:-translate-y-1"
            >
              <BiLeftArrowAlt className="w-6 h-6 fill-black-lighter" />
            </Link>
            <span className="font-semibold flex-grow text-base">
              We&apos;d be happy for you to join us!{' '}
              <Link
                href="/products"
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
              onSubmit={onFormSubmit}
              initialValues={defaultState}
              validationSchema={toFormikValidationSchema(validationSchema)}
            >
              {({ isSubmitting, dirty, isValid, handleSubmit }) => (
                <Form method="post" className="mt-8" onSubmit={handleSubmit}>
                  <LoginInput
                    type="text"
                    name="name"
                    placeholder="Your Username*"
                    autoComplete="username"
                    onKeyDown={handleKeyPress}
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
                    autoComplete="new-password"
                    aria-autocomplete="list"
                  />
                  <LoginInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password*"
                    autoComplete="current-password"
                  />
                  <div className="flex-between">
                    <SubmitButton
                      content={session ? 'Signed In' : 'Sign Up'}
                      disabled={!dirty || !isValid || isSubmitting || !!session}
                    />
                    <div className="p-4 mt-1 w-36 h-14 text-blue hover:text-blue-dark border-b-blue">
                      <button type="button" onClick={() => signIn()} className="link">
                        Sign In instead
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {data && <p className="text-center text-xl text-success mt-8">{data.message}</p>}
            {error && (
              <p className="text-center text-xl text-error mt-4">{(error as any).data.message}</p>
            )}
          </div>
        </div>
      </div>
      <Footer country={state.country} />
    </>
  );
}
