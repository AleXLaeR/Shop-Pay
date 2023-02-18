import Link from 'next/link';
import styles from '@styles/home-page.module.scss';

import {
  GiLargeDress,
  GiWatch,
  GiClothes,
  GiHeadphones,
  GiHealthCapsule,
  GiBigDiamondRing,
  GiSportMedal,
  Gi3DHammer,
  GiBallerinaShoes,
} from 'react-icons/gi';
import { BiCategory, BiCameraMovie, BiGift } from 'react-icons/bi';
import { HiOutlineHome } from 'react-icons/hi';
import { FaBaby } from 'react-icons/fa';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { MdOutlineSportsEsports, MdOutlineSmartToy } from 'react-icons/md';
import { BsPhoneVibrate } from 'react-icons/bs';

type MenuCategory = {
  id: number;
  title: string;
  link: string;
  subMenu?: MenuCategory[];
  icon: JSX.Element;
  brands?: string[];
  images?: string[];
};

const categories: MenuCategory[] = [
  {
    id: 1,
    icon: <GiLargeDress />,
    title: "Women's Fashion",
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 2,
    icon: <GiClothes />,
    title: "Men's Fashion",
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 3,
    icon: <GiHeadphones />,
    title: 'Electronics',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 4,
    icon: <GiWatch />,
    title: 'Jewelery & Watches',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 5,
    icon: <HiOutlineHome />,
    title: 'Home, Pet & Appliances',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 6,
    icon: <GiHealthCapsule />,
    title: 'Beauty, Health & Hair',
    link: '',
    brands: [],
    images: [],
  },

  {
    id: 7,
    icon: <GiBallerinaShoes />,
    title: 'Shoes, Sneakers & Heels',
    link: '',
    brands: [],
    images: [],
  },

  {
    id: 8,
    icon: <GiBigDiamondRing />,
    title: 'Accessories',
    link: '',
    brands: [],
    images: [],
  },

  {
    id: 9,
    icon: <GiSportMedal />,
    title: 'Sports & Entertainment',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 10,
    icon: <FaBaby />,
    title: 'Kids & Babies',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 11,
    icon: <BiCameraMovie />,
    title: 'Movies & Television',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 12,
    icon: <MdOutlineSportsEsports />,
    title: 'Gaming & Video Games',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 13,
    icon: <BsPhoneVibrate />,
    title: 'Telecommunications',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 14,
    icon: <MdOutlineSmartToy />,
    title: 'Toys & Hobbies',
    link: '',
    subMenu: [],
    brands: [],
    images: [],
  },
  {
    id: 15,
    icon: <BiGift />,
    title: 'Gifts & Crafts',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 16,
    icon: <Gi3DHammer />,
    title: 'Machinery',
    link: '',
    brands: [],
    images: [],
  },
  {
    id: 17,
    icon: <AiOutlineSecurityScan />,
    title: 'Security & Safety',
    link: '',
    brands: [],
    images: [],
  },
];

export default function LeftSidebar() {
  return (
    <div className={styles.leftSidebar}>
      <div className="rounded-t-xl text-black-lighter items-center pt-1 gap-2 pl-5 w-full h-8 bg-grey flex md:justify-center md:pl-0 lg:pl-5 lg:justify-start">
        <BiCategory className="w-6 h-6" />
        <b className="md:hidden lg:flex">Categories</b>
      </div>
      <ul className="bg-white mt-1 rounded-b-xl overflow-hidden">
        {categories.map(({ id, title, link, icon }) => (
          <li
            key={id}
            className="h-8 flex cursor-pointer hover:bg-grey border-dashed rounded-md hover:border-[1px]"
          >
            <Link
              href={link}
              className="px-6 flex items-center gap-2 text-[#424141] [&>svg]:fill-[#8c8484] [&>svg]:stroke-[#8c8484] [&>svg]:hover:fill-black-lighter"
            >
              {icon}
              <span className="inline md:hidden lg:inline text-base md:text-xs xl:text-base">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
