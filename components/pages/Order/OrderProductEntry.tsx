import Image from 'next/image';

interface OrderProductEntryProps {
  product: CartProductModel;
}

export default function OrderProductEntry({ product }: OrderProductEntryProps) {
  const { name, imageUri, size, quantity, price, color } = product;

  return (
    <div className="relative flex gap-2.5 py-2.5 border-b border-b-white-darker">
      <div className="w-[120px] h-[160px]">
        <Image
          src={imageUri}
          alt={name}
          loading="lazy"
          width={130}
          height={170}
          className="rounded-md shadow-sm"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-semibold line-clamp-2 xl:line-clamp-1">{name}</h1>
        <div className="flex items-center gap-2.5 bg-white-dark w-fit py-2 px-2.5 rounded-lg">
          <span className="w-5 h-5 rounded-full shadow-md" style={{ backgroundColor: color }} />
          <span className="-ml-1 font-semibold text-lg"> / {size}</span>
        </div>
        <div className="mt-2.5 font-semibold underline underline-offset-4">
          {price}$ x {quantity}
        </div>
        <div className="absolute right-4 bottom-4 text-xl font-bold">
          {(price * quantity).toFixed(2)}$
        </div>
      </div>
    </div>
  );
}
