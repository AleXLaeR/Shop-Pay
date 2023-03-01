import Link from 'next/link';
import { useRouter } from 'next/router';

import SocialsShare from './SocialsShare';
import ProductAccordion from './ProductAccordion';
import ProductInfoHeader from './ProductInfoHeader';
import ProductInfoPricing from './ProductInfoPricing';
import ProductInfoButtons from './ProductInfoButtons';

interface ProductInfoProps {
  product: PageProduct;
  setActiveImage: (img: ProductImage) => void;
}

export default function ProductInfo({ product, setActiveImage }: ProductInfoProps) {
  const { slug, variants, quantity, colors, subProducts, details, description, faq } = product;

  const { query } = useRouter();
  const variant = parseInt(query.variant as string, 10);

  return (
    <div className="text-grey-dark bg-white pt-4 md:pt-0 sm:max-w-full rounded-lg">
      <div className="container !min-h-0 flex flex-col gap-1">
        <ProductInfoHeader product={product} />
        <ProductInfoPricing product={product} />
        <div className="mt-4">
          <h4 className="text-lg font-medium">Select a Size : </h4>
          <div className="mt-2.5 flex items-center flex-wrap gap-4">
            {variants.map(({ size }, idx) => (
              <Link
                key={size}
                href={`${slug}?variant=${variant}&size=${idx}`}
                className="p-2 rounded-full border border-dark-grey transition-transform hover:scale-110 duration-500 cursor-pointer hover:text-blue-dark"
                style={{
                  backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
                }}
              >
                <button type="button" className="w-8 h-8">
                  {size}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <h4 className="text-lg font-medium mt-4">Select a Color : </h4>
        <div className="mt-2.5 flex items-center gap-4">
          {colors.map((color, idx) => (
            <button
              key={color}
              type="button"
              className={`grid w-[50px] h-[50px] rounded-full transition-transform hover:scale-110 duration-500 cursor-pointer hover:text-blue-dark ${
                variant === idx ? 'activeColor' : ''
              }`}
              onClick={() => setActiveImage(subProducts[idx].images[0])}
            >
              <Link href={`${slug}?variant=${idx}`} className="w-full h-full">
                <p
                  className="w-full h-full rounded-full border border-grey-dark"
                  style={{ backgroundColor: color }}
                />
              </Link>
            </button>
          ))}
        </div>
        <ProductInfoButtons productQuantity={quantity} />
        <SocialsShare />
        <ProductAccordion desc={description} details={details} faq={faq} />
      </div>
    </div>
  );
}
