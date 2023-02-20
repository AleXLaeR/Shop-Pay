import { BiRightArrowAlt } from 'react-icons/bi';

interface SubmitButtonProps {
  type?: 'submit' | 'reset' | 'button';
  content: string;
}

export default function SubmitButton({ type = 'submit', content }: SubmitButtonProps) {
  return (
    <button
      type={type}
      className="relative w-56 h-14 rounded-3xl font-semibold md:text-lg text-white bg-blue block cursor-pointer"
    >
      {content}
      <div className="w-10 h-10 rounded-full grid place-items-center absolute top-2 right-1.5 bg-grey transition-transform duration-700 hover:rotate-[270deg]">
        <BiRightArrowAlt className="w-6 h-6 fill-blue" />
      </div>
    </button>
  );
}
