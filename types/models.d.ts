/* interface CategoryModel {
  name: string;
}

interface SubCategoryModel {
  name: string;
}
 */

interface ProductModel {
  name: string;
  slug: string;
  description?: string;
  category: CategoryModel;
  brand?: string;
  subCategories?: SubCategoryModel[];
  details?: Record<string, string>[];
  faq?: Record<string, string>[];
  refundPolicy: string;
  rating: number;
  reviewCount: number;
  reviews?: ReviewModel[];
  shipping: number;
  subProducts?: SubProduct[];
}

interface ReviewModel {
  by: UserModel;
  rating: number;
  content: string;
  fit: string;
  images?: string[];
  popularity: ReviewPopularity[];
  pros?: string[];
  cons?: string[];
  // replies?: any[];
}

interface UserModel {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  image: string;
  isEmailVerified: boolean;
  defaultPaymentMethod: string;
  addresses: UserAddress[];
}

type ReviewPopularity = {
  likeAmount: number;
  dislikeAmount: number;
};

type UserRole = 'buyer' | 'admin' | 'seller';

type PaymentMethod = '' | 'PayPal' | 'Visa' | 'Mastercard';

type ProductRefundPolicy = '7d' | '1w' | '30d' | '1m' | '3m' | '6m' | '1y' | 'never';

type SubProduct = {
  stock: ProductStock;
  imageUri?: string;
  descriptionImage?: string;
  color: string;
  discount: number;
  amountSold: number;
};

type ProductStock = {
  sku: string;
  quantity: number;
  price: number;
};

type UserAddress = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  primaryAddress: string;
  secondaryAddress?: string;
  city: string;
  zipCode: string;
  state?: string;
  country: string;
  wasUsedBefore: boolean;
};
