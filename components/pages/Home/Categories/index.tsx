import { useMediaQuery } from 'react-responsive';
import { womenDresses, womenShoes, womenAccessories, womenSwiper } from '@data/home';

import ProductsSwiper from '@common/ProductsSwiper';
import Category from './ProductCategory';

interface CategoryListProps {
  heading: string;
}

export default function CategoryList({ heading }: CategoryListProps) {
  const isMedium = useMediaQuery({ query: '(max-width: 770px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 550px)' });

  return (
    <div className="bg-white-dark pb-2 px-4 rounded-xl">
      <h1 className="text-[1.65rem] font-bold text-white bg-grey-lighter px-2 rounded-b-md border-t-0 w-fit mb-2 ml-4">
        {heading}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Category title="Dresses" products={womenDresses} background="#5a31f4" />
        {!isMedium && <Category title="Shoes" products={womenShoes} background="#3c811f" />}
        {isMobile && <Category title="Shoes" products={womenShoes} background="#3c811f" />}
        <Category title="Accessories" products={womenAccessories} background="#000000" />
      </div>
      <ProductsSwiper products={womenSwiper} />
    </div>
  );
}
