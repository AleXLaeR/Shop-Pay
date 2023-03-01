import { useRef } from 'react';
import { useFormikContext } from 'formik';
import { useClickOutside, useToggle } from '@hooks/index';

import { IoArrowDown } from 'react-icons/io5';

interface ReviewFormSelectProps {
  label: string;
  items: string[];
  name: keyof ReviewFormValues;
}

export default function ReviewFormSelect({ label, name, items }: ReviewFormSelectProps) {
  const {
    toggleState: isVisible,
    handlers: { off, on, toggle },
  } = useToggle();

  const selectRef = useRef<HTMLDivElement>(null);
  const { setFieldValue } = useFormikContext<ReviewFormValues>();

  useClickOutside(selectRef, off);

  return (
    <div ref={selectRef} className="flex items-center gap-2.5">
      <span className="font-semibold capitalize min-w-[45px]">{name}:</span>
      <div
        role="presentation"
        className="min-w-[70px] cursor-pointer hover:bg-black-lighter hover:text-white transition-colors duration-300 relative border-grey-light rounded-sm border flex-center gap-1.5 px-2.5 font-bold min-h-[40px]"
        onClick={toggle}
        onFocus={on}
      >
        <span className="flex items-center headerWrap gap-1">
          {label || `${name === 'fit' ? 'How does it' : 'Select'} ${name}`}
          <IoArrowDown />
        </span>
        {isVisible && (
          <ul className="absolute z-10 top-12 -left-30 flex flex-col shadow-md bg-white w-fit">
            {items.map((item) => (
              <li
                key={item}
                className="h-12 hover:bg-grey grid items-center border-b-greyish border-b"
              >
                <button
                  type="button"
                  onClick={() => setFieldValue(name, item)}
                  className="w-full h-12 flex-center gap-5 pl-2 pr-4"
                >
                  <span className="text-black-lighter min-w-[65px]">{item}</span>
                  {name === 'color' && (
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
