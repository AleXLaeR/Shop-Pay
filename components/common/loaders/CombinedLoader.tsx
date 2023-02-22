import BeatLoader from 'react-spinners/BeatLoader';
import BarLoader from 'react-spinners/ScaleLoader';

interface CombinedLoaderProps {
  content?: string;
  size?: number | string;
}

export default function CombinedLoader({
  content = 'Please hang on a little...',
  size = 20,
}: CombinedLoaderProps) {
  return (
    <div className="min-h-screen bg-grey flex-center flex-col text-center gap-2">
      <BeatLoader size={size} />
      <span className="text-lg text-grey-dark">{content}</span>
      <BarLoader />
    </div>
  );
}
