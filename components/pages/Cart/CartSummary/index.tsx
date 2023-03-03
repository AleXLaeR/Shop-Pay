import { useAppSelector } from '@store/hooks';
import { selectSubTotal } from '@store/slices/cart.slice';

import SelectAllButton from './SelectAllButton';
import RemoveAllButton from './RemoveAllButton';

export default function CartSummary() {
  const totalQuantity = useAppSelector(selectSubTotal);

  return (
    <div className="grid-in-summary card-base lg:h-[140px]">
      <h1 className="text-3xl font-semibold mb-4">Item summary ({totalQuantity})</h1>
      <SelectAllButton />
      <RemoveAllButton />
    </div>
  );
}
