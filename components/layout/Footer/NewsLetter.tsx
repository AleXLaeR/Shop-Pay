import Link from 'next/link';
import { useState } from 'react';
import styles from '@styles/footer.module.scss';

export default function NewsLetter() {
  const [email, setEmail] = useState<string>();

  return (
    <div className={styles.newsletter}>
      <b className="text-lg uppercase">sign up for our newsletter</b>
      <div className="flex gap-3 my-1.5 pr-3">
        <input
          type="text"
          placeholder="Your E-Mail address"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          className="outline-0 border-[1px] flex-grow border-grey-lighter h-[3.25rem] pl-1.5 rounded-sm"
        />
        <button type="button" className="btn-primary uppercase w-44 flex-grow-0">
          subscribe
        </button>
      </div>
      <p className="text-xs sm:text-base mt-1.5 text-sm text-grey-dark inline">
        By clicking the <b>SUBSCRIBE</b> button, you are agreeing to{' '}
      </p>
      <Link href="/" className="text-sm sm:text-base text-blue underline hover:text-blue-dark">
        our Privacy & Cookie Policy
      </Link>
    </div>
  );
}
