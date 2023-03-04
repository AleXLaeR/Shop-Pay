import nc from 'next-connect';
import { NextApiResponse } from 'next';

import { OverrideNextReq } from 'types/general';
import { StatusCodes } from 'http-status-codes';

import { Product, User, Cart } from '@models/index';
import db from '@services/db.service';

const handler = nc<OverrideNextReq<PostCartPayload>, NextApiResponse<BaseApiResponse>>();

handler.post(async ({ body: { cart, userId } }, res) => {
  try {
    await db.connectToDb();

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Cannot find an associated user.' });
    }

    const cartProductPromises = cart.map(async (prod) => {
      const { size, color: variant, quantity, name, discountedPrice } = prod;

      const updatedProduct = await Product.findById(prod._id).lean();
      const subProduct = updatedProduct!.subProducts[variant.idx];

      return {
        product: prod._id as any,
        name,
        quantity,
        color: variant.color,
        size: size.size,
        price: discountedPrice,
        imageUri: subProduct.images[0].uri,
      } as CartProductModel;
    });

    const products = await Promise.all(cartProductPromises);
    const totalPrice = products.reduce((acc, pr) => acc + pr.price * pr.quantity, 0);
    const subTotal = products.reduce((acc, pr) => acc + pr.quantity, 0);

    await Cart.create({
      products,
      user: userId,
      totalPrice,
      subTotal,
    });
    await db.disconnectFromDb();

    res
      .status(StatusCodes.OK)
      .json({ message: 'Cart was successfully connected with associated user.' });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Cart cannot be added.' });
  }
});

export default handler;
