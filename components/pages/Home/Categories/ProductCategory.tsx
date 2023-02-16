import Link from 'next/link';
import Image from 'next/image';

import { BsArrowRightCircle } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';

interface ProductCategoryProps {
  title: string;
  products: CategoryProduct[];
  background?: string;
}

export default function ProductCategory({ title, products, background }: ProductCategoryProps) {
  const isMedium = useMediaQuery({ query: '(max-width: 1300px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="max-w-[600px] p-4 rounded-lg" style={{ background }}>
      <div className="flex-between">
        <h1 className="text-white text-lg ml-2 cursor-pointer hover:underline underline-offset-2">
          {title}
        </h1>
        <Link href="/">
          <BsArrowRightCircle className="w-6 h-6 cursor-pointer fill-white transition-[transform] duration-200 hover:fill-yellow hover:scale-110" />
        </Link>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-2 gap-2 p-1 lg:gap-4 mt-1.5 lg:p-1.5 rounded-lg">
        {/* eslint-disable-next-line no-nested-ternary */}
        {products?.slice(0, isMobile ? 6 : isMedium ? 4 : 6).map(({ id, image }, idx) => (
          <div key={id} className="product">
            <img
              src={image}
              alt={`Product ${idx}`}
              className="rounded-lg md:max-h-full lg:h-48 w-full cursor-pointer transition-[transform] duration-200 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
