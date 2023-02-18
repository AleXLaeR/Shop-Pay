import Image from 'next/image';
import Link from 'next/link';

import { userSwiperArray } from '@data/home';
import ROUTES from '@services/routes';

import styles from '@styles/home-page.module.scss';
import HeaderFooterImg from '@assets/images/home/user_header.jpg';
import UserProfileImg from '@assets/images/home/user_profile.png';
import NewBannerImg from '@assets/images/home/new_banner.png';

import { AiOutlineMessage } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';

import { EffectCards, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function RightSidebar() {
  const session: any = false;

  return (
    <div className={styles.rightSidebar}>
      <Image src={HeaderFooterImg} alt="wavy header" />
      <div className="p-4 !min-h-[21rem]">
        {session ? (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Image
              src={session.user?.image ?? 'DEF_IMG_SRC'}
              alt={`${session.user.name} profile`}
              className="w-24 h-24 rounded-full shadow-md"
            />
            <h4 className="mt-6 capitalize underline decoration-2 underline-offset-4 font-bold text-lg">
              {session.user.name}
            </h4>
          </div>
        ) : (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Image
              src={UserProfileImg}
              alt="profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
            <div className="mt-4 flex items-center gap-5">
              <button type="button" className="btn-primary px-6">
                Register
              </button>
              <button type="button" className="btn-outlined px-6">
                Login
              </button>
            </div>
          </div>
        )}
        <ul className="flex-center gap-4 mt-9">
          <li className="w-12 h-12 bg-grey grid place-items-center duration-500 transition-[background] hover:bg-blue rounded-full hover:[&_svg]:stroke-white">
            <Link href={ROUTES.PROFILE.BASE}>
              <IoSettingsOutline className="w-8 h-8 stroke-blue" />
            </Link>
          </li>
          <li className="w-12 h-12 bg-grey grid place-items-center duration-500 transition-[background] hover:bg-blue rounded-full hover:[&_svg]:stroke-white">
            <Link href={ROUTES.PROFILE.ORDERS}>
              <HiOutlineClipboardList className="w-8 h-8 stroke-blue" />
            </Link>
          </li>
          <li className="w-12 h-12 bg-grey grid place-items-center duration-500 transition-[background] hover:bg-blue rounded-full hover:[&_svg]:stroke-white">
            <Link href={ROUTES.PROFILE.MESSAGES}>
              <AiOutlineMessage className="w-8 h-8 stroke-blue fill-blue hover:fill-white" />
            </Link>
          </li>
          <li className="w-12 h-12 bg-grey grid place-items-center duration-500 transition-[background] hover:bg-blue rounded-full hover:[&_svg]:stroke-white">
            <Link href={ROUTES.PROFILE.WISHLIST}>
              <BsHeart className="w-8 h-8 stroke-blue fill-blue hover:fill-white" />
            </Link>
          </li>
        </ul>
        <div className="flex flex-col items-center mt-10">
          <Image
            src={NewBannerImg}
            alt="brand news products"
            className="absolute -top-2 -left-2 w-20 z-20"
          />
          <Swiper
            effect="cards"
            loop
            grabCursor
            navigation
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: '180px',
              height: '240px',
              marginTop: '1rem',
            }}
          >
            {userSwiperArray.map(({ id, image, link }) => (
              <SwiperSlide key={id}>
                <Link href={link}>
                  <img src={image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Image src={HeaderFooterImg} alt="wavy footer" className="rotate-180 absolute bottom-0" />
    </div>
  );
}
