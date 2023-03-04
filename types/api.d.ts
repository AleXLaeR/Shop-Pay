type BaseApiResponse = { message: string } | Record<string, string>;

type SuggestionsResponse = {
  categories?: CategoryModel[];
  products?: ProductModel[];
};

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

type PostCartPayload = {
  cart: CartProduct[];
  userId: string;
};
