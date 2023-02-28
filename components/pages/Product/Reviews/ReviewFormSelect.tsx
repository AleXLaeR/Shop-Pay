import { useRef } from 'react';
import { useClickOutside, useToggle } from '@hooks/index';

import { IoArrowDown } from 'react-icons/io5';
import { FormSelectState } from './ReviewForm';

interface ReviewFormSelectProps {
  label: string;
  dropItems: string[];
  property: keyof FormSelectState;
  handleChange: (state: Partial<FormSelectState>) => void;
}

export default function ReviewFormSelect({
  label,
  property,
  dropItems,
  handleChange,
}: ReviewFormSelectProps) {
  const {
    toggleState: isVisible,
    handlers: { toggle, off, on },
  } = useToggle();
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, off);

  return (
    <div ref={selectRef} className="mt-4 flex items-center gap-2.5">
      <span className="font-semibold capitalize">{property}:</span>
      <div
        role="presentation"
        className="min-w-[70px] cursor-pointer hover:bg-black-lighter hover:text-white transition-colors duration-300 relative border-grey-light rounded-sm border flex-center gap-1.5 px-2.5 font-bold min-h-[40px]"
        onClick={toggle}
        onFocus={on}
      >
        <span className="flex items-center headerWrap gap-1">
          {label || `Select ${property}`}
          <IoArrowDown />
        </span>
        {isVisible && (
          <ul className="absolute z-10 top-11 -left-30 flex flex-col shadow-md bg-white w-fit">
            {dropItems.map((item) => (
              <li
                key={item}
                className="h-12 hover:bg-grey grid items-center border-b-greyish border-b"
              >
                <button
                  type="button"
                  onClick={() => handleChange({ [property]: item })}
                  className="w-full h-12 flex-center gap-5 pl-2 pr-4"
                >
                  <span className="text-black-lighter min-w-[65px]">{item}</span>
                  {property === 'color' && (
                    <span className="w-5 h-5 rounded-full" style={{ backgroundColor: item }} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
