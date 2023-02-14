import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';

import styles from '@styles/footer.module.scss';

type AuthLink = {
  id: number;
  name: string;
  href: string;
};

const links: AuthLink[] = [
  {
    id: 1,
    name: 'Privacy Center',
    href: '',
  },
  {
    id: 2,
    name: 'Privacy & Cookie Policy',
    href: '',
  },
  {
    id: 3,
    name: 'Manage Cookies',
    href: '',
  },
  {
    id: 4,
    name: 'Terms & Conditions',
    href: '',
  },
  {
    id: 5,
    name: 'Copyright Notice',
    href: '',
  },
];

export default function Copyright() {
  return (
    <div className={`text-grey-dark mr-6 ${styles.copyright}`}>
      <p className="text-sm pb-1.5">©2022 - 2023 SHOPPAY ALL RIGHT RESERVED.</p>
      <ul className="flex items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {links.map(({ id, name, href }) => (
            <li key={id}>
              <Link href={href} className="link">
                {name}
              </Link>
            </li>
          ))}
        </div>
        <li>
          <Link href="/" className="flex items-center gap-1">
            <IoLocationSharp className="fill-green" />
            <span className="underline underline-offset-2">Ukraine</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
