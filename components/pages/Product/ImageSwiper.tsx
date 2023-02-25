import Image from 'next/image';
import { useState } from 'react';

import ReactImageMagnify from 'react-image-magnify';
import { useMediaQuery } from 'react-responsive';

interface MainSwiperProps {
  images: ProductImage[];
  activeImage?: ProductImage;
}

export default function ImageSwiper({ images, activeImage }: MainSwiperProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const isMediumOrSmall = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <div className="flex flex-col sm:flex-row-reverse sm:gap:2.5 md:flex-col md:gap-0 lg:flex-row-reverse lg:gap-2.5">
      {isMediumOrSmall ? (
        <Image
          src={images[activeSlideIdx].uri}
          alt={images[activeSlideIdx].publicUri}
          height={750}
          width={500}
          className="min-h-[750px] rounded-md"
          loading="lazy"
        />
      ) : (
        <ReactImageMagnify
          className="!min-h-[750px] z-10"
          enlargedImageContainerClassName="!border-0"
          imageClassName="rounded-md !h-[750px]"
          smallImage={{
            isFluidWidth: true,
            alt: images[activeSlideIdx].publicUri,
            src: images[activeSlideIdx].uri,
          }}
          largeImage={{
            alt: images[activeSlideIdx].publicUri,
            src: images[activeSlideIdx].uri,
            width: 1000,
            height: 1400,
          }}
          enlargedImageContainerDimensions={{
            width: '150%',
            height: '100%',
          }}
          isHintEnabled
          shouldHideHintAfterFirstActivation={false}
        />
      )}
      <div className="mt-2 flex gap-2.5 h-32 sm:mt-0 sm:pr-2 md:mt-2 sm:flex-col sm:h-full md:flex-row md:gap-2.5 md:h-32 lg:mt-0 lg:flex-col lg:h-full">
        {images.map(({ uri, publicUri }, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSlideIdx(idx)}
            className={`block listItem hover:outline hover:outline-black rounded-md transition-transform duration-300 hover:scale-105 outline-2 ${
              idx === activeSlideIdx ? 'outline outline-black' : ''
            }`}
          >
            <Image
              className="w-full h-full sm:w-24 md:w-full lg:w-24 lg:h-[7.3rem] rounded-md hover:outline-black outline-2 cursor-pointer"
              src={uri}
              alt={publicUri}
              width={100}
              height={100}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
