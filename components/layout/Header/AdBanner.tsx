import Link from 'next/link';
import ROUTES from '@common/routes';

import { useState } from 'react';
import styles from '@styles/header.module.scss';

export default function AdBanner() {
  const [isVisible, setIsVisible] = useState<boolean | null>(true);

  return (
    <div className="relative">
      {isVisible && (
        <>
          <Link href={ROUTES.PRODUCTS} className={styles.adBanner} />
          <button
            type="button"
            className="absolute top-0 right-0 w-5 h-5 text-sm lg:text-base lg:w-[1.75rem] lg:h-[1.75rem] text-black bg-red rounded-bl-sm hover:brightness-90"
            onClick={() => setIsVisible(false)}
          >
            X
          </button>
        </>
      )}
    </div>
  );
}
