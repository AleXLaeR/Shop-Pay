import { useDispatch } from 'react-redux';
import { removeProduct } from '@store/slices/cart.slice';

import { AiOutlineDelete } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';

interface EntryHeaderProps {
  name: string;
  itemId: string;
}

export default function EntryHeader({ name, itemId }: EntryHeaderProps) {
  const dispatch = useDispatch();
  const onRemoveBtnClick = () => dispatch(removeProduct(itemId));

  return (
    <div className="grid grid-cols-[1fr,1.5rem,1.5rem]">
      <h1 className="line-clamp-1 xl:line-clamp-2">{name}</h1>
      <BsHeart
        className="z-10 w-5 h-5 cursor-pointer fill-grey-dark hover:fill-blue z-30"
        onClick={() => {}}
      />
      <AiOutlineDelete
        className="z-10 w-5 h-5 cursor-pointer fill-grey-dark hover:fill-blue z-30"
        onClick={onRemoveBtnClick}
      />
    </div>
  );
}
