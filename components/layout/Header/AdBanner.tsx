import { useLocalStorage } from '@hooks/useStorage.hook';
import Link from 'next/link';
import ROUTES from '@services/routes';

import { useState } from 'react';
import styles from '@styles/header.module.scss';

interface AdBannerProps {
  appearAfterMs?: number;
}

export default function AdBanner({ appearAfterMs = 36e5 }: AdBannerProps) {
  const { value, setValue } = useLocalStorage({
    key: 'bannerClosedAt',
    defValue: Date.now(),
  });
  const [isVisible, setIsVisible] = useState(() => {
    return value ? value < Date.now() : true;
  });

  const onBannerClose = () => {
    setIsVisible(false);
    setValue(Date.now() + appearAfterMs);
  };

  return (
    <div className="relative">
      {isVisible && (
        <>
          <Link href={ROUTES.PRODUCTS} className={styles.adBanner} />
          <button
            type="button"
            className="absolute top-0 right-0 w-5 h-5 text-sm lg:text-base lg:w-[1.75rem] lg:h-[1.75rem] text-black bg-red rounded-bl-sm hover:brightness-90"
            onClick={onBannerClose}
          >
            X
          </button>
        </>
      )}
    </div>
  );
}
