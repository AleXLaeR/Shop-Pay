import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useAppSelector } from '@store/hooks';

import { usePostCartMutation } from '@store/api';
import { selectProducts } from '@store/slices/cart.slice';
import PropagateLoader from 'react-spinners/PropagateLoader';

interface CheckoutSubmitButtonProps {
  isDisabled: boolean;
}

export default function CheckoutSubmitButton({ isDisabled }: CheckoutSubmitButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [postCart, { isLoading, error }] = usePostCartMutation();
  const products = useAppSelector(selectProducts).filter(({ isSelected }) => isSelected);

  const onSubmit = async () => {
    if (session) {
      await postCart({ userId: session.user?.id!, cart: products });
      router.push('/checkout');
    } else {
      signIn();
    }
  };

  return (
    <div className="mt-4">
      <button
        type="submit"
        disabled={isDisabled}
        className={`bg-blue rounded-md hover:bg-blue-dark transition-colors shadow-md w-full text-white h-12 text-xl ${
          isDisabled ? 'bg-grey-light cursor-not-allowed hover:bg-grey-light' : ''
        }`}
        onClick={onSubmit}
      >
        {isLoading ? (
          <PropagateLoader color="white" size={10} className="pb-[13px]" />
        ) : (
          <span>Continue</span>
        )}
        {error && (
          <span className="text-lg text-center text-error-secondary">
            {JSON.stringify((error as any).data)}
          </span>
        )}
      </button>
    </div>
  );
}
