import { useEffect } from 'react';
import { useAppSelector } from '@store/hooks';
import type { OrArray } from 'types/general';

interface ScrollLockProps {
  children: OrArray<JSX.Element>;
}

export default function ScrollLock({ children }: ScrollLockProps) {
  const isLocked = useAppSelector(({ checkout }) => checkout.isLocked);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isLocked);

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isLocked]);

  return <>{children}</>;
}
