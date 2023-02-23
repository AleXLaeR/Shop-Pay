import { useValidateEmailMutation } from '@store/api';
import jwt from 'jsonwebtoken';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CombinedLoader } from '@common/loaders';
import useTimer from '@hooks/useTimer';

const DELAY_FOR_MS = 5e3;

interface ValidateEmailProps {
  userId: string;
}

export default function ValidateEmail({ userId }: ValidateEmailProps) {
  const router = useRouter();
  const [timer, setTimer] = useTimer();
  const [putValidateEmail] = useValidateEmailMutation();

  useEffect(() => {
    putValidateEmail({ userId });
    setTimer(DELAY_FOR_MS / 1e3);

    const timeout = setTimeout(() => router.push('/'), DELAY_FOR_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CombinedLoader
      content={`Your E-Mail has been verified. You will be redirected to the home page in ${timer} seconds...`}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { token } }) => {
  const payload: any = jwt.verify(token as string, process.env.JWT_TOKEN_SECRET);

  return {
    props: { userId: payload.id },
  };
};
