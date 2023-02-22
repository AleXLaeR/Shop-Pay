type BaseApiResponse = { message: string } | Record<string, string>;

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};
