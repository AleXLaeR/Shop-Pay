import Image from 'next/image';
import { useFormikContext } from 'formik';
import { MdOutlineRemoveCircle } from 'react-icons/md';

interface ImagePreviewsProps {
  files: string[];
}

export default function ImagePreviews({ files }: ImagePreviewsProps) {
  const { setFieldValue } = useFormikContext<ReviewFormValues>();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {files.length !== 0 &&
        files.map((file, idx) => (
          <span key={file} className="relative">
            <MdOutlineRemoveCircle
              className="absolute -top-2 transition-transform duration-300 hover:scale-110 -right-2 w-7 h-7 fill-red cursor-pointer"
              onClick={() =>
                setFieldValue(
                  'files',
                  files.filter((f) => f !== file),
                )
              }
            />
            <Image
              src={file}
              className="w-[120px] h-[150px] rounded-sm shadow-sm object-cover"
              alt={idx.toString()}
              width={120}
              height={150}
              loading="lazy"
            />
          </span>
        ))}
    </div>
  );
}
