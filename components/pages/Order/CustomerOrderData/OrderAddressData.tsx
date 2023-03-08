interface OrderAddressDataProps {
  address: UserAddress;
  title: string;
}

export default function OrderAddressData({ address, title }: OrderAddressDataProps) {
  const { firstName, lastName, primaryAddress, secondaryAddress, state, city } = address;

  return (
    <div className="border-t border-t-greyish">
      <h2 className="text-blue-darker text-lg font-semibold mb-1.5 mt-2.5">{title} address</h2>
      <div className="flex flex-col">
        <span>
          {firstName} {lastName}
        </span>
        <span>{primaryAddress}</span>
        {secondaryAddress && <span>{secondaryAddress}</span>}
        <span>
          {state}, {city}
        </span>
        <span>
          {address.zipCode}, {address.country}
        </span>
      </div>
    </div>
  );
}
