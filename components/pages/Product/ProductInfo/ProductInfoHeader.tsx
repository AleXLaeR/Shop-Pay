import Rating from '@mui/material/Rating';

interface ProductInfoHeaderProps {
  product: PageProduct;
}

export default function ProductInfoHeader({ product }: ProductInfoHeaderProps) {
  const { name, sku, reviews, rating } = product;

  return (
    <>
      <h1 className="text-2xl font-semibold">{name}</h1>
      <h2 className="text-lg text-grey-lighter">#{sku}</h2>
      <div className="flex items-center gap-2">
        <Rating
          className="!text-yellow-light"
          title={`${name}'s Rating`}
          name="product-rating"
          defaultValue={rating}
          precision={0.5}
          readOnly
        />
        <span>
          {reviews
            ? `${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`
            : 'No reviews here yet!'}
        </span>
      </div>
    </>
  );
}
