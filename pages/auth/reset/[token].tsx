import { LoginInput, SubmitButton } from '@common/form';
import { DotLoader } from '@common/loaders';
import jwt from 'jsonwebtoken';
import { GetServerSideProps } from 'next';
import { signIn } from 'next-auth/react';

import Link from 'next/link';
import { Form, Formik, FormikHelpers } from 'formik';

import SEO from '@common/SEO';
import { Footer, Header } from '@components/layout';
import { useRouter } from 'next/router';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { z } from 'Zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { useResetPasswordMutation } from '@store/api';

type ResetPasswordState = {
  password: string;
  confirmPassword: string;
};
const defaultState: ResetPasswordState = {
  password: '',
  confirmPassword: '',
};

const validationSchema = z
  .object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must consist of at least 8 characters' })
      .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, {
        message:
          'Password must be complex (at least 1 digit, one uppercase letter, one lowercase letter)',
      }),
    confirmPassword: z.string().optional(),
  } as Record<keyof ResetPasswordState, any>)
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

interface ResetPasswordProps {
  userId: string;
}

export default function ResetPassword({ userId }: ResetPasswordProps) {
  const router = useRouter();
  const [putResetPassword, { isLoading, error }] = useResetPasswordMutation();

  const onFormSubmit = async (
    { password }: ResetPasswordState,
    { setErrors }: FormikHelpers<ResetPasswordState>,
  ) => {
    const res: any = await putResetPassword({ userId, password });

    if (res?.error) {
      setErrors({ password: res.error.data.message });
      return;
    }

    const nextRes = await signIn('credentials', {
      redirect: false,
      email: res.data.email,
      password,
    });
    if (nextRes?.error) {
      setErrors({ password: nextRes.error });
    } else {
      toast.info('Password has been successfully reset! Logging you in...', {
        autoClose: 1750,
        isLoading: true,
        position: 'top-center',
        style: { marginTop: '12vh' },
      });
      setTimeout(() => router.reload(), 2e3);
    }
  };

  return (
    <>
      <SEO title="Password reset Page | ShopPay" desc="User Password reset page | ShopPay" />
      <Header />
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
            <div
              role="presentation"
              onClick={() => router.back()}
              className="min-w-[3rem] h-12 border border-greyisshadow-md rounded-full flex-center cursor-pointer hover:border-blue transition-transform hover:-translate-y-1"
            >
              <BiLeftArrowAlt className="w-6 h-6 fill-black-lighter" />
            </div>
            <span className="font-semibold text-base">
              Reset your password with the form below.
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
                <SubmitButton
                  grow
                  content="Confirm Reset"
                  disabled={!dirty || !isValid || isSubmitting}
                />
              </Form>
            )}
          </Formik>
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
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { token } }) => {
  const payload: any = jwt.verify(token as string, process.env.RESET_TOKEN_SECRET);

  return {
    props: { userId: payload.id },
  };
};
