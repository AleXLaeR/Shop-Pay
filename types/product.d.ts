interface Product {
  title: string;
  description?: string;
  price: number;
}

interface FlashDealProduct {
  id: number;
  image: string;
  price: number;
  discount: number;
  link: string;
  amountSold: number;
}
