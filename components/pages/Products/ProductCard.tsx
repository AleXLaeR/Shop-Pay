import Link from 'next/link';
import { useState, useMemo } from 'react';

import ImageSwiper from './ImageSwiper';

interface ProductCardProps {
  product: ProductModel;
  controllableSize?: boolean;
}

export default function ProductCard({ product, controllableSize = true }: ProductCardProps) {
  const { name, slug, subProducts } = product;
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  const activeVariant = useMemo(
    () => subProducts[activeVariantIdx],
    [subProducts, activeVariantIdx],
  );
  const productPriceDiff = useMemo(() => {
    const priceRange = activeVariant.variants?.map(({ price }) => price).sort((a, b) => a - b);

    if (priceRange && priceRange.length !== 1) {
      return [priceRange[0], priceRange[priceRange.length - 1]];
    }
    return priceRange?.[0] ?? NaN;
  }, [activeVariant.variants]);

  return (
    <div className={`relative ${controllableSize ? 'w-72 h-[34rem]' : ''}`}>
      <Link href={`/product/${slug}?variant=${activeVariantIdx}`} target="_blank">
        <ImageSwiper items={activeVariant.images} />
      </Link>
      {activeVariant.discount !== 0 && (
        <div className="absolute -top-2.5 -right-2.5 z-10 text-lg italic bg-yellow text-black-lighter w-12 h-12 rounded-full grid place-items-center font-semibold">
          -{activeVariant.discount}%
        </div>
      )}
      <div className="w-full mt-0.5">
        <h1 className="line-clamp-1 text-lg lg:line-clamp-2 text-black-light font-semibold">
          {name}
        </h1>
        <span className="text-red text-lg font-bold">
          Price Range:{' '}
          <span className="underline underline-offset-2">
            {Array.isArray(productPriceDiff)
              ? `USD ${productPriceDiff[0]}$ - ${productPriceDiff[1]}$`
              : `USD ${productPriceDiff}$`}
          </span>
        </span>
        <div className="relative flex items-center gap-2.5 mt-1">
          {subProducts.map(({ sku, color }, idx) => (
            <button
              key={sku}
              type="button"
              onClick={() => setActiveVariantIdx(idx)}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-full cursor-pointer shadow-md outline-2 hover:outline outline-grey-dark ${
                idx === activeVariantIdx ? '!outline' : ''
              } transition-transform hover:scale-105 duration-[400]`}
              aria-label="select"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
