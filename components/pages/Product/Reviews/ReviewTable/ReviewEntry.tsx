import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

interface ReviewEntryProps {
  review: ReviewModel;
}

export default function ReviewEntry({ review }: ReviewEntryProps) {
  const { content, by, rating, fit, size, color, images, updatedAt } = review;
  const userName = by?.name ?? 'AleXLaeR';
  const userImage =
    by?.image ??
    'https://lh3.googleusercontent.com/a/AGNmyxYuyyDO9feeSaamRTbaJlcjc2GbAHbq-BNPGImV=s96-c';

  return (
    <div className="pl-3 relative py-4 flex flex-col shadow-sm sm:flex-row gap-4 border-b-grey border-b">
      <div className="w-full flex gap-4">
        <div className="mt-1.5 flex items-center flex-col gap-2">
          <h3>
            {userName.slice(0, 2)}***{userName.slice(userName.length - 2, userName.length)}
          </h3>
          <Image
            src={userImage}
            alt={userName}
            className="w-12 h-12 rounded-full blur-[1px]"
            width={40}
            height={40}
            loading="lazy"
          />
        </div>
        <div className="text-grey-dark pr-4 flex flex-col">
          <Rating
            name="established-review-rating"
            value={rating}
            precision={0.5}
            readOnly
            className="text-yellow-light !text-lg"
          />
          <p>{content}</p>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">Overall fit: {fit}</span>
            <span className="font-semibold">Size: {size}</span>
            <div className="flex items-center">
              <span className="font-semibold">Color:</span>
              <span style={{ background: color }} className="ml-2 rounded-full w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-wrap gap-2.5">
          {images &&
            images.length !== 0 &&
            images.map(({ uri, publicUri }, idx) => (
              <Image
                key={idx}
                src={uri}
                alt={publicUri}
                className="-mt-2 min-w-[120px] h-[150px] rounded-md shadow-md"
                width={120}
                height={120}
                loading="lazy"
              />
            ))}
        </div>
        <div className="flex-center flex-col gap-12 text-lg h-full">
          <div className="flex gap-2">
            <span className="text-center italic">
              {0}{' '}
              <AiOutlineLike className="w-6 h-6 cursor-pointer transition-colors duration-300 hover:fill-green" />
            </span>
            <span className="text-center italic">
              {0}{' '}
              <AiOutlineDislike className="w-6 h-6 cursor-pointer transition-colors duration-300 hover:fill-red" />
            </span>
          </div>
          <div className="w-[90px] text-grey-lighter text-sm">{updatedAt.slice(0, 10)}</div>
        </div>
      </div>
    </div>
  );
}
