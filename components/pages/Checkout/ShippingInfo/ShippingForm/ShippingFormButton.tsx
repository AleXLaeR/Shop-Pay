interface ShippingFormButtonProps {
  disabled: boolean;
}

export default function ShippingFormButton({ disabled }: ShippingFormButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-[200px] h-12 text-white font-semibold bg-black-lighter transition-colors duration-300 ${
        disabled
          ? 'cursor-not-allowed bg-grey-lighter text-black-lighter'
          : 'hover:bg-transparent cursor-pointer rounded-sm hover:text-black-lighter border border-black-lighter'
      }`}
    >
      Save Address
    </button>
  );
}
