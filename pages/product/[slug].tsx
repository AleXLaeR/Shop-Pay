import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import SEO from '@common/SEO';
import { Header, Footer } from '@components/layout';
import { Reviews, ImageSwiper, ProductInfo, RelatedSwiper } from '@components/pages/Product';

import db from '@services/db.service';
import { Product } from '@models/index';

import { BiHome } from 'react-icons/bi';

interface ProductPageProps {
  product: PageProduct;
  relatedProducts: ProductModel[];
}

export default function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const { category, subCategories, images } = product;
  const [activeImage, setActiveImage] = useState<ProductImage>();

  console.log(product._id);

  return (
    <>
      <SEO title="Product Page | ShopPay" desc="Single Product Page" />
      <Header />
      <div className="min-h-screen bg-grey">
        <div className="container">
          <div className="text-grey-dark text-xl flex items-center font-semibold">
            <BiHome className="inline mr-1" /> Home <span className="mx-2">/</span>{' '}
            <Link href="/" className="text-red-dark link">
              {category.name}
            </Link>
            {subCategories?.map(({ _id, name }) => (
              <span key={_id}>{name}</span>
            ))}
          </div>
          <div className="relative grid gap-y-5 lg:justify-end items-start mt-4 md:gap-8 md:grid-col-350 xl:grid-cols-2">
            <ImageSwiper images={images} activeImage={activeImage} />
            <ProductInfo product={product} setActiveImage={setActiveImage} />
          </div>
          <Reviews
            reviews={product.reviews}
            productRating={product.rating}
            sizes={product.sizes}
            colors={product.colors}
          />
          {relatedProducts.length !== 0 && <RelatedSwiper products={relatedProducts} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const { slug, variant = '0', size = '0' } = query;
  await db.connectToDb();

  const product = await Product.findOne({ slug })
    .populate({ path: 'category', model: 'Category' })
    .populate({ path: 'subCategories', model: 'SubCategory' })
    .populate({ path: 'reviews.by', model: 'User' })
    .lean();

  if (!product) {
    return { notFound: true };
  }
  const subProduct = product.subProducts[parseInt(variant as string, 10)];
  const subProductVariant = subProduct.variants[parseInt(size as string, 10)];
  const cummulatedDiscount = product.discount + subProduct.discount;

  const relatedProducts = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id },
  }).lean();

  res.setHeader('Cache-Control', 'max-age=31536000');

  await db.disconnectFromDb();
  return {
    props: {
      product: JSON.parse(
        JSON.stringify({
          ...subProduct,
          ...product,
          rating: product.reviews
            ? product.reviews.reduce((acc, { rating }) => acc + rating, 0) / product.reviews.length
            : 0,
          reviews: Object.entries(
            product.reviews?.reduce((grouped, review) => {
              const ratingInteger = Math.round(review.rating);
              grouped[ratingInteger] = [...(grouped[ratingInteger] ?? []), review];
              return grouped;
            }, {} as Record<string, ReviewModel[]>) ?? [],
          ).reverse(),
          prices: subProduct.variants.map(({ price }) => price).sort((a, b) => a - b),
          colors: product.subProducts.map(({ color }) => color),
          sizes: Array.from(
            new Set(
              product.subProducts
                .map(({ variants }) => variants.map(({ size: varSize }) => varSize))
                .flat()
                .sort((a, b) => a.localeCompare(b)),
            ),
          ),
          discount: cummulatedDiscount,
          startingPrice: subProductVariant.price,
          discountedPrice:
            cummulatedDiscount !== 0
              ? subProductVariant.price - (subProductVariant.price * cummulatedDiscount) / 100
              : subProductVariant.price,
          quantity: subProductVariant.quantity,
        }),
      ),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
    },
  };
};
