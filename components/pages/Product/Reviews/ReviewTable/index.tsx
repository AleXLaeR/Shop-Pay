import { useClientPagination } from '@hooks/index';
import Pagination from '@mui/material/Pagination';

import TableHeader from './TableHeader';
import ReviewEntry from './ReviewEntry';

interface ReviewTableProps {
  reviews: ReviewModel[];
  limitPerPage?: number;
  sizes: string[];
  colors: string[];
}

export default function ReviewTable({
  reviews,
  sizes,
  colors,
  limitPerPage = 4,
}: ReviewTableProps) {
  const {
    curPage,
    pageCount,
    handlers: { goTo, getBatch },
  } = useClientPagination(reviews, limitPerPage);

  const totalReviews = Math.ceil(reviews.length / limitPerPage);

  return (
    <div className="mt-4">
      <TableHeader />
      <div className="tableData">
        {getBatch().map((review) => (
          <ReviewEntry key={review._id} review={review} />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          count={pageCount}
          page={curPage}
          variant="outlined"
          shape="rounded"
          className="mt-4 pt-4 flex justify-end"
          onChange={(_, page) => goTo(page)}
        />
      </div>
    </div>
  );
}
