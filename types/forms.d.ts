type ReviewFormValues = {
  size: string;
  color: string;
  fit: string;
  rating: string;
  review: string;
  files: string[];
};

type OrderSummaryFormValues = {
  coupon: string;
};

type CheckoutFormValues = Omit<UserAddress, 'wasUsedBefore'>;
