import { FaFacebookF, FaTiktok } from 'react-icons/fa';
import {
  BsArrowDown,
  BsInstagram,
  BsPinterest,
  BsSnapchat,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';

import styles from '@styles/footer.module.scss';

interface SocialLink {
  id: number;
  href: string;
  icon?: JSX.Element;
}

const socialLinks: SocialLink[] = [
  {
    id: 1,
    href: '/',
    icon: <FaFacebookF />,
  },
  {
    id: 2,
    href: '/',
    icon: <BsInstagram />,
  },
  {
    id: 3,
    href: '/',
    icon: <BsTwitter />,
  },
  {
    id: 4,
    href: '/',
    icon: <BsYoutube />,
  },
  {
    id: 5,
    href: '/',
    icon: <BsPinterest />,
  },
  {
    id: 6,
    href: '/',
    icon: <BsSnapchat />,
  },
  {
    id: 7,
    href: '/',
    icon: <FaTiktok />,
  },
];

export default function FooterSocials() {
  return (
    <div className={styles.socials}>
      <div className="flex items-center gap-2">
        <b className="md:text-xl">STAY CONNECTED</b>
        <BsArrowDown className="w-5 h-5" />
      </div>
      <ul className="flex items-center mt-3 gap-4">
        {socialLinks.map(({ id, href, icon }) => (
          <li
            key={id}
            className="text-3xl xl:transition text-grey-dark transition-[color] duration-300 hover:text-blue"
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
