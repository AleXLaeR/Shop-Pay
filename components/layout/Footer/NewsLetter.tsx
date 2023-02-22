import Link from 'next/link';
import { ChangeEvent, useEffect, useRef } from 'react';

import styles from '@styles/footer.module.scss';
import { useSubscribeToNewsletterMutation } from '@store/api';

import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';

export default function NewsLetter() {
  const inputRef = useRef<HTMLInputElement>();
  const [postEmail, { data, isLoading, error }] = useSubscribeToNewsletterMutation();

  useEffect(() => {
    if (data !== undefined) {
      toast.success(`You've been successfully subscribed!`);
    }
  }, [data]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = target;
  };

  return (
    <div className={styles.newsletter}>
      <b className="text-lg uppercase">sign up for our newsletter</b>
      <div className="flex gap-3 my-1.5 pr-3">
        <input
          type="text"
          name="email"
          placeholder="Your E-Mail address"
          onChange={onInputChange}
          className="outline-0 border-[1px] flex-grow border-grey-lighter h-[3.25rem] pl-1.5 rounded-sm"
        />
        <button
          type="button"
          className="btn-primary uppercase w-44 flex-grow-0"
          disabled={isLoading}
          style={isLoading ? { cursor: 'not-allowed' } : undefined}
          onClick={() => postEmail(inputRef.current?.value!)}
        >
          subscribe
        </button>
      </div>
      {error && (
        <div className="text-red text-lg underline underline-offset-2 my-2">
          {(error as any).data.message}
        </div>
      )}
      {isLoading && (
        <PulseLoader
          size={20}
          color="green"
          speedMultiplier={0.7}
          className="my-2"
          placeholder="Loading..."
        />
      )}
      {data ? <div className="text-green text-lg">Success!</div> : undefined}
      <p className="text-xs sm:text-base mt-1.5 text-sm text-grey-dark inline">
        By clicking the <b>SUBSCRIBE</b> button, you are agreeing to{' '}
      </p>
      <Link href="/" className="text-sm sm:text-base text-blue underline hover:text-blue-dark">
        our Privacy & Cookie Policy
      </Link>
    </div>
  );
}
