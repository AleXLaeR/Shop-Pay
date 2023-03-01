/* eslint-disable react/jsx-no-useless-fragment */
interface FormErrorListProps {
  errors: [string, string | string[]][];
}

export default function ValidationErrorList({ errors }: FormErrorListProps) {
  return (
    <>
      {errors.length !== 0 && (
        <ul className="flex gap-9 md:gap-12 flex-wrap w-full p-4 pb-0 mt-2 list-disc">
          {errors.map(([key, value]) => (
            <li key={key} className="w-full sm:w-auto">
              <span className="text-red font-bold text-lg">{value}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
