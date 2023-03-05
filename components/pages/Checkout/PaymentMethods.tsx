import Image from 'next/image';

type PaymentMethod = {
  id: string;
  name: string;
  description?: string;
  images: string[];
};

const paymentMethods: PaymentMethod[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    description:
      "If you don't have a paypal account, you can also pay via paypal with your credit card or bank debit card. Payment can be submitted in a currency!",
    images: [],
  },
  {
    id: 'credit_card',
    name: 'Credit Card',
    images: ['visa', 'mastercard', 'paypal'],
  },
  {
    id: 'cash',
    name: 'Cash',
    description:
      "If you don't have a paypal account,you can also pay via paypal with your credit card or bank debit card. Payment can be submitted in any currency!",
    images: [],
  },
];

interface PaymentProps {
  paymentMethod: string;
  setPaymentMethod: (state: string) => void;
}

export default function PaymentMethods({ paymentMethod, setPaymentMethod }: PaymentProps) {
  return (
    <div className="payment">
      <div className="font-bold text-lg pt-1 w-full pb-1.5 border-b border-b-white-darker">
        <h3>Payment method</h3>
      </div>
      {paymentMethods.map(({ id, name, description, images }) => (
        <label
          key={id}
          htmlFor={id}
          role="presentation"
          className={`p-4 flex items-center gap-2.5 cursor-pointer rounded-md mt-4 hover:bg-white-dark transition-colors duration-200 ${
            paymentMethod === id ? 'bg-white-darker' : ''
          }`}
          onClick={() => setPaymentMethod(id)}
        >
          <input
            type="radio"
            name="payment"
            id={id}
            defaultChecked={paymentMethod === id}
            title={name}
          />
          <Image
            src={`/images/payments/${id.toLocaleLowerCase()}.webp`}
            className="rounded-md border-greyish border"
            alt={name}
            width={60}
            height={40}
            loading="lazy"
          />
          <div className="col">
            <span className="flex-between text-sm">Pay with {name}</span>
            <p className="text-grey-lighter text-xs flex flex-wrap gap-2.5">
              {images.map((img) => (
                <Image
                  key={img}
                  src={`/images/payments/${img.toLocaleLowerCase()}.webp`}
                  alt={`Pay with ${name}`}
                  width={44}
                  height={36}
                  loading="lazy"
                  className="rounded-md border-black-lighter border"
                />
              ))}
              {images.length === 0 && description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}
