import nc from 'next-connect';
import { NextApiResponse } from 'next';

import { OverrideNextReq } from 'types/general';
import { StatusCodes } from 'http-status-codes';

import { Product } from '@models/index';
import db from '@services/db.service';

const handler = nc<
  OverrideNextReq<CartProduct[]>,
  NextApiResponse<BaseApiResponse | CartProduct[]>
>();

handler.post(async ({ body: products }, res) => {
  try {
    await db.connectToDb();

    const productPromises = products.map(async (prod) => {
      const { size, color: variant } = prod;
      const updatedProduct = await Product.findById(prod._id).lean();

      const subProduct = updatedProduct!.subProducts[variant.idx];
      const { price, quantity } = subProduct.variants[size.idx];
      const discount = updatedProduct!.discount + subProduct.discount;

      return {
        ...prod,
        discount,
        startingPrice: price,
        discountedPrice: discount !== 0 ? price - (price * discount) / 100 : price,
        shippingPrice: updatedProduct!.shippingPrice,
        stockQuantity: quantity,
      };
    });

    const updatedProducts = await Promise.all(productPromises);
    // console.log(updatedProducts.length);
    await db.disconnectFromDb();

    return res.status(StatusCodes.OK).json(updatedProducts);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Fatal; Cart cannot be updated' });
  }
});

export default handler;
