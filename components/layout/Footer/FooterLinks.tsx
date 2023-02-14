import Link from 'next/link';
import styles from '@styles/footer.module.scss';
import Image from 'next/image';
import Logo from '@assets/images/logo.png';

type FooterLink = {
  id: number;
  name: string;
  src: string;
};

interface LinkGroup {
  id: number;
  heading: string;
  links: FooterLink[];
}

const linkGroups: LinkGroup[] = [
  {
    id: 1,
    heading: 'SHOPPAY',
    links: [
      {
        id: 1,
        name: 'About us',
        src: '',
      },
      {
        id: 2,
        name: 'Contact us',
        src: '',
      },
      {
        id: 3,
        name: 'Social Responsibility',
        src: '',
      },
      {
        id: 4,
        name: 'Buyer Protection',
        src: '',
      },
    ],
  },
  {
    id: 2,
    heading: 'HELP & SUPPORT',
    links: [
      {
        id: 1,
        name: 'Shipping Info',
        src: '',
      },
      {
        id: 2,
        name: 'Returns',
        src: '',
      },
      {
        id: 3,
        name: 'How To Order',
        src: '',
      },
      {
        id: 4,
        name: 'How To Track',
        src: '',
      },
    ],
  },
  {
    id: 3,
    heading: 'Customer service',
    links: [
      {
        id: 1,
        name: 'Customer service',
        src: '',
      },
      {
        id: 2,
        name: 'Terms and Conditions',
        src: '',
      },
      {
        id: 3,
        name: 'Consumers (Transactions)',
        src: '',
      },
      {
        id: 4,
        name: 'Take our feedback survey',
        src: '',
      },
    ],
  },
];

export default function FooterLinks() {
  return (
    <div className={`grid grid-cols-3 gap-4 ${styles.links}`}>
      {linkGroups.map(({ id, heading, links }, idx) => (
        <ul key={id} className="p-1 text-xs md:text-base">
          {idx === 0 ? (
            <Image src={Logo} alt="Logo" className="w-28 md:w-36" />
          ) : (
            <b className="uppercase">{heading}</b>
          )}
          {links.map(({ id: linkId, name, src }) => (
            <li key={linkId} className="text-xs md:text-base">
              <Link href={src} className="text-black-light hover:underline underline-offset-2">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
