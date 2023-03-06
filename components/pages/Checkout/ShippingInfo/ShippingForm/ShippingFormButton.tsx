import PropagateLoader from 'react-spinners/PropagateLoader';

interface ShippingFormButtonProps {
  disabled: boolean;
  loading: boolean;
  error: any;
}

export default function ShippingFormButton({ disabled, loading, error }: ShippingFormButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-[220px] h-12 text-white font-semibold bg-black-lighter transition-colors duration-300 ${
        disabled || !!error
          ? 'cursor-not-allowed bg-grey-lighter text-black-lighter'
          : 'hover:bg-transparent cursor-pointer rounded-sm hover:text-black-lighter border border-black-lighter'
      }`}
    >
      {loading ? (
        <PropagateLoader color="white" size={10} className="pb-[13px]" />
      ) : error ? (
        error.data.message
      ) : (
        'Save Address'
      )}
    </button>
  );
}
