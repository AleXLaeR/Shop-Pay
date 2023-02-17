import Link from 'next/link';
import styles from '@styles/home-page.module.scss';

type HeaderLink = {
  id: number;
  href: string;
  title: string;
};

const links: HeaderLink[] = [
  {
    id: 1,
    href: '/',
    title: 'Store',
  },
  {
    id: 2,
    href: '/',
    title: 'Electronics',
  },
  {
    id: 3,
    href: '/',
    title: 'Clothing',
  },
  {
    id: 4,
    href: '/',
    title: 'Dresses',
  },
  {
    id: 5,
    href: '/',
    title: 'Accessories',
  },
  {
    id: 6,
    href: '/',
    title: 'Watches',
  },
  {
    id: 7,
    href: '/',
    title: 'Cuisine',
  },
  {
    id: 8,
    href: '/',
    title: 'Cuisine',
  },
  {
    id: 9,
    href: '/',
    title: 'Cuisine',
  },
  {
    id: 10,
    href: '/',
    title: 'Cuisine',
  },
];

export default function HomeHeader() {
  return (
    <div className={`h-10 pl-2 overflow-hidden items-center flex ${styles.header}`}>
      <ul className="flex items-center gap-4">
        {links.map(({ id, href, title }, idx) => (
          <li key={id} className="h-full flex items-center text-lg text-blue">
            <Link
              href={href}
              className={`text-sm font-semibold md:text-base hover:underline underline-offset-2 ${
                idx >= 3 ? 'hidden md:block' : ''
              } ${idx >= 6 ? 'md:hidden lg:block' : ''}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
