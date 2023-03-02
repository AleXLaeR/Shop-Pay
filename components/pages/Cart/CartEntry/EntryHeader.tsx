import { useDispatch } from 'react-redux';
import { removeProduct } from '@store/slices/cart.slice';

import { AiOutlineDelete } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';

interface EntryHeaderProps {
  name: string;
  _id: string;
}

export default function EntryHeader({ name, _id }: EntryHeaderProps) {
  const dispatch = useDispatch();
  const onRemoveBtnClick = () => dispatch(removeProduct(_id));

  return (
    <div className="grid grid-cols-[1fr,1.5rem,1.5rem]">
      <h1 className="line-clamp-1 xl:line-clamp-2">{name}</h1>
      <BsHeart
        className="z-10 w-5 h-5 cursor-pointer fill-grey-dark hover:fill-blue"
        onClick={() => {}}
      />
      <AiOutlineDelete
        className="z-10 w-5 h-5 cursor-pointer fill-grey-dark hover:fill-blue"
        onClick={onRemoveBtnClick}
      />
    </div>
  );
}
