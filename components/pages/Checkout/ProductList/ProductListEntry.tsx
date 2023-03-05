import Image from 'next/image';

interface ProductListEntryProps {
  product: CartProductModel;
}

export default function ProductListEntry({ product }: ProductListEntryProps) {
  const { name, quantity, imageUri, price, size, color } = product;

  return (
    <div className="max-w-[180px]">
      <div className="relative">
        <Image
          src={imageUri}
          alt={name}
          width={170}
          height={170}
          loading="lazy"
          className="rounded-t-md shadow-sm"
        />
        <div className="bg-white-dark p-1.5 rounded-b-md flex-between w-[170px] px-4 font-bold relative bottom-0 left-0 right-0">
          <span className="w-7 h-7 rounded-full" style={{ backgroundColor: color }} />
          <span>{size}</span>
          <span>{quantity}</span>
        </div>
      </div>
      <div className="text-sm mt-1">
        <span className="line-clamp-2">{name}</span>
      </div>
      <div className="font-bold text-lg">
        <span>USD {(price * quantity).toFixed(2)}$</span>
      </div>
    </div>
  );
}
