import { Header, Footer } from '@components/layout';
import { LoginInput, SubmitButton } from '@common/form';

import ChoiceDivider from '@common/ChoiceDivider';
import SEO from '@common/SEO';

import { GetServerSideProps } from 'next';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

import { useState } from 'react';
import { Formik, Form } from 'formik';

import Link from 'next/link';
import Image from 'next/image';

import { BiLeftArrowAlt } from 'react-icons/bi';

import { z } from 'Zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const state = {
  country: {
    name: 'Ukraine',
    flag: { emojitwo: 'https://cdn.ipregistry.co/flags/emojitwo/ua.svg' },
  },
  currency: { code: 'UAH' },
};

type UserState = {
  email: string;
  password: string;
};

const defaultState: UserState = {
  email: '',
  password: '',
};

const validationSchema = z.object({
  email: z
    .string({ required_error: 'E-Mail is required' })
    .trim()
    .email({ message: 'Provided values is not a valid E-Mail address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must consist of at least 8 characters' })
    .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, {
      message:
        'Password must be complex (at least 1 digit, one uppercase letter, one lowercase letter)',
    }),
} as Record<keyof UserState, any>);

interface SignInProps {
  providers: ClientSafeProvider[];
}

export default function SignIn({ providers }: SignInProps) {
  const [userFormValues, setUserFormValues] = useState(defaultState);

  const onFormSubmit = () => {};

  return (
    <>
      <SEO title="Sign-In to ShopPay" desc="Login / Registration page" />
      <Header data={state} />
      <div className="relative border-y border-y-greyish min-h-screen overflow-hidden flex justify-center">
        <div className="p-12 mt-12">
          <div className="flex-between max-w-[26rem] min-w-[24rem] relative -left-2 gap-2">
            <div className="min-w-[3rem] h-12 border-greyish border-[1px] shadow-md rounded-full grid place-items-center cursor-pointer hover:border-blue transition-[transform] duration-300 hover:-translate-y-1">
              <BiLeftArrowAlt className="w-6 h-6 fill-black-lighter" />
            </div>
            <span className="font-semibold flex-grow text-base">
              We&apos;re happy to have you here!{' '}
              <Link
                href="/"
                className="text-blue cursor-pointer hover:border-b-[1px] hover:border-blue"
              >
                Go to Store
              </Link>
            </span>
          </div>
          <div className="mt-4">
            <h1 className="font-semibold text-[3.25rem]">Sign In</h1>
            <p className="text-[#96979b]">Retrieve access to our E-Shopping services</p>
            <Formik
              initialValues={userFormValues}
              onSubmit={onFormSubmit}
              enableReinitialize
              validationSchema={toFormikValidationSchema(validationSchema)}
            >
              {({ dirty, isSubmitting, handleSubmit }) => (
                <Form method="post" className="mt-8" onSubmit={handleSubmit}>
                  <LoginInput
                    type="email"
                    name="email"
                    placeholder="E-Mail Address*"
                    autoComplete="username"
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Your password*"
                    autoComplete="current-password"
                  />
                  <div className="flex-between">
                    <SubmitButton content="Sign In" />
                    <div className="p-4 mt-1 text-sm w-36 h-14 hover:underline text-blue hover:text-blue-dark border-b-blue">
                      <Link href="/resetPassword">Forgot Password?</Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mt-4">
              <ChoiceDivider content="Or continue With" />
              <div className="mt-4 flex flex-col gap-4 pl-12">
                {providers.map(({ id, name }) => (
                  <button
                    key={id}
                    type="button"
                    className="w-72 h-12 rounded-3xl flex items-center gap-4 bg-transparent pl-5 border border-[#66666683] cursor-pointer"
                    onClick={() => signIn(id)}
                  >
                    <Image
                      src={`/icons/${name}.png`}
                      className="w-9 h-9 cursor-pointer"
                      alt={name}
                      width={36}
                      height={36}
                      loading="lazy"
                    />
                    Sign in With {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer country={state.country} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers: Object.values(providers!) },
  };
};
