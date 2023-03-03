import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface SummaryLabelProps {
  slug: string;
  color: { color: string; idx: number };
  size: { size: string; idx: number };
  price: number;
}

export default function SummaryLabel({ slug, price, size, color }: SummaryLabelProps) {
  return (
    <Link
      href={`/product/${slug}?variant=${color.idx}&size=${size.idx}`}
      className="flex items-center hover:bg-grey-light [&>svg]:hover:translate-x-1 gap-1.5 bg-grey rounded-md w-fit p-1.5 my-2.5 text-sm cursor-pointer"
    >
      <span className="w-7 h-7 rounded-full" style={{ backgroundColor: color.color }} />
      <span className="font-semibold">{size.size}</span>
      <span className="font-semibold">{price.toFixed(2)} $</span>
      <MdOutlineKeyboardArrowRight className="transition-transform scale-110" />
    </Link>
  );
}
