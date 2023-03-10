type BaseApiResponse = { message: string } | Record<string, string>;

type SuggestionsResponse = {
  categories?: CategoryModel[];
  products?: ProductModel[];
};

type ApplyCouponResponse = {
  discount: number;
  priceAfterDiscount: number;
};

type StripeOrderResponse = { id: string };

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

type EmailPayload = { email: string };

type ValidateEmailPayload = { userId: string };

type ResetPasswordPayload = {
  userId: string;
  password: string;
};

type PayPalOrderPayload = {
  id: string;
  status: PaymentStatus;
  email: string;
};

type StripeOrderPayload = {
  products: CartProductModel[];
  email: string;
};
