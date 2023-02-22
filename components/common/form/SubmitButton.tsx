import { BiRightArrowAlt } from 'react-icons/bi';

interface SubmitButtonProps {
  type?: 'submit' | 'reset' | 'button';
  content: string;
  disabled?: boolean;
}

export default function SubmitButton({
  type = 'submit',
  content,
  disabled = true,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`relative w-56 h-14 rounded-3xl font-semibold md:text-lg text-white bg-blue block cursor-pointer ${
        disabled ? 'pointer-events-none bg-blue-darkish' : ''
      }`}
    >
      {content}
      <div className="w-10 h-10 rounded-full grid place-items-center absolute top-2 right-1.5 bg-grey transition-transform duration-700 hover:rotate-[270deg]">
        <BiRightArrowAlt className={`w-6 h-6 fill-blue ${disabled ? 'fill-blue-darkish' : ''}`} />
      </div>
    </button>
  );
}
