import Link from 'next/link';
import Image from 'next/image';
import { MdFlashOn } from 'react-icons/md';

interface FlashDealCardProps {
  product: FlashDealProduct;
}

export default function FlashDealCard({ product }: FlashDealCardProps) {
  const { image, price, discount, link, amountSold } = product;
  const discountPrice = price - price / discount;

  return (
    <div className="h-fit w-auto py-2">
      <div className="relative w-full h-80 cursor-pointer overflow-hidden">
        <Link href={link}>
          <Image
            src={image}
            alt="product"
            fill
            loading="lazy"
            className="transition-[transform] duration-1000 hover:scale-110"
          />
        </Link>
        <div className="absolute top-0 left-0 rounded-tl-[0.25rem] flex flex-col items-center rounded-br-sm w-12 h-12 bg-yellow p-2">
          <MdFlashOn className="absolute scale-125 fill-black-lighter" />
          <span className="text-black-lighter font-semibold translate-y-4">-{discount}%</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="font-[700] text-red">USD {discountPrice.toFixed(2)}$</span>
        <span className="font-[700] text-grey-lighter text-sm line-through">
          -USD {(price - discountPrice).toFixed(2)}$
        </span>
      </div>
      <div className="w-full h-1.5 rounded-xl bg-grey-light mt-0.5">
        <div className="bg-yellow rounded-xl h-full" style={{ width: `${amountSold}%` }} />
      </div>
      <p className="text-sm italic mt-1 font-semibold text-[#111] mt-0.5 w-full flex justify-start">
        {amountSold}% left in stock!
      </p>
    </div>
  );
}
