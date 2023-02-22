import Loader from 'react-spinners/DotLoader';

interface DotLoaderProps {
  content?: string;
}

export default function DotLoader({ content }: DotLoaderProps) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-dimmed z-10 grid place-items-center">
      <Loader color="#2f82ff" />
      {content && <span className="text-lg text-grey-dark">{content}</span>}
    </div>
  );
}
