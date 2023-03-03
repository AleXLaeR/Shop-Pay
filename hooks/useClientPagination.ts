import { useMemo, useState } from 'react';

export default function useClientPagination<T>(data: T[], limit: number = 10) {
  const [curPage, setCurPage] = useState(1);
  const pageCount = Math.ceil(data.length / limit);

  const handlers = useMemo(
    () => ({
      getBatch: () => {
        const start = (curPage - 1) * limit;
        console.log(data.slice(start, start + limit));
        return data.slice(start, start + limit);
      },
      next: () => setCurPage((prev) => Math.min(prev + 1, pageCount)),
      prev: () => setCurPage((prev) => Math.max(prev - 1, 1)),
      goTo: (page: number) => {
        const pageNumber = Math.max(1, page);
        setCurPage(Math.min(pageNumber, pageCount));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [curPage, data, limit],
  );

  return { curPage, pageCount, handlers };
}
