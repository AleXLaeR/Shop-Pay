import Image from 'next/image';

interface ProductListEntryProps {
  product: CartProductModel;
}

export default function ProductListEntry({ product }: ProductListEntryProps) {
  const { name, quantity, imageUri, price, size, color } = product;

  return (
    <div className="product">
      <div className="relative">
        <Image
          src={imageUri}
          alt={name}
          width={140}
          height={180}
          loading="lazy"
          className="rounded-md shadow-sm"
        />
        <div className="bg-white-dark p-1.5 flex-between font-bold absolute inset-0">
          <span className="w-7 h-7 rounded-full" style={{ backgroundColor: color }} />
          <span>{size}</span>
          <span>{quantity}</span>
        </div>
      </div>
      <div className="text-sm mt-1">
        <span className="line-clamp-2 lg:line-clamp-1">{name}</span>
      </div>
      <div className="font-bold text-lg">
        <span>USD {(price * quantity).toFixed(2)}$</span>
      </div>
    </div>
  );
}
