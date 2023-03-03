import ReviewTable from '@components/pages/Product/Reviews/ReviewTable';
import { useMemo } from 'react';
import { useSession, signIn } from 'next-auth/react';

import Rating from '@mui/material/Rating';
import ReviewForm from './ReviewForm';

interface ReviewsProps {
  reviews: [string, ReviewModel[]][];
  productRating: number;
  sizes: string[];
  colors: string[];
}

export default function Reviews({ reviews, productRating, sizes, colors }: ReviewsProps) {
  const { data: session } = useSession();

  const totalAmount = useMemo(
    () => reviews.reduce((acc, [_, revs]) => acc + revs.length, 0),
    [reviews],
  );

  const allReviews = useMemo(
    () => reviews.reduce((allRevs, [_, revs]) => allRevs.concat(revs), [] as ReviewModel[]),
    [reviews],
  );

  return (
    <div className="mt-4">
      <div className="container !min-h-fit pr-0">
        <h1 className="text-xl md:text-2xl text-black-light font-bold">
          Customer Reviews ({totalAmount})
        </h1>
        {reviews.length !== 0 && (
          <div className="flex justify-end items-center mt-4 rounded-md w-full h-full bg-white-dark p-4 lg:px-12 lg:py-10 lg:pl-4 flex-col md:flex-row gap-6">
            <div className="overview xl:ml-20 mb-4">
              <span className="text-xl font-semibold italic">Average rating</span>
              <div className="mt-4 flex items-center gap-2.5 font-bold text-xl">
                <Rating
                  className="!text-yellow-light [&_svg]:w-10 [&_svg]:h-10"
                  name="review-average-rating"
                  defaultValue={productRating}
                  precision={0.5}
                  readOnly
                />
                {productRating}
              </div>
            </div>
            <div className="flex items-end flex-grow flex-col gap-4 lg:ml-12">
              {reviews.map(([rating, revs]) => (
                <div key={rating} className="flex items-center gap-3">
                  <Rating
                    name="review-single-rating"
                    defaultValue={parseInt(rating, 10)}
                    className="!text-yellow-light [&_svg]:-mr-1 md:[&_svg]:mr-2 [&_svg]:w-8 [&_svg]:h-8"
                    readOnly
                  />
                  <div className="relative w-[30vw] max-w-[600px] h-1.5 bg-grey-light rounded-md overflow-hidden">
                    <span
                      className="max-w-full absolute left-0 h-full bg-red-dark"
                      style={{ width: `${(revs.length / totalAmount) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold">{(revs.length / totalAmount) * 100}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {session ? (
          <ReviewForm sizes={sizes} colors={colors} />
        ) : (
          <button
            type="button"
            onClick={() => signIn()}
            className="rounded-sm transition-colors duration-300 hover:bg-orange w-full text-white h-12 bg-yellow text-lg font-bold mt-4"
          >
            Login to add a review!
          </button>
        )}
        <ReviewTable reviews={allReviews} sizes={sizes} colors={colors} />
      </div>
    </div>
  );
}
