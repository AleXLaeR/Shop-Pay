import { Form, Formik } from 'formik';
import { useState } from 'react';

import { z } from 'Zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const validationSchema = z.object({
  coupon: z.string({ required_error: 'Please enter a coupon first' }),
} as Record<keyof OrderSummaryFormValues, any>);

const initialValues: OrderSummaryFormValues = { coupon: '' };

interface SummaryProps {
  cart: CartModel;
  paymentMethod: string;
  selectedAddress: string;
}

export default function OrderSummary({ cart, paymentMethod, selectedAddress }: SummaryProps) {
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  const onFormSubmit = async ({ coupon }: OrderSummaryFormValues) => {};

  return (
    <div className="mt-4">
      <div className="w-full pb-1.5 border-b border-b-white-darker">
        <h3>Order Summary</h3>
      </div>
      <div className="mt-2.5">
        <Formik
          onSubmit={onFormSubmit}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(validationSchema)}
        >
          {({ handleSubmit, isSubmitting, isValid, dirty }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
              {true && <span className="error">Error</span>}
              <button
                type="submit"
                className="-mt-1.5 w-full h-10 bg-black-lighter text-white font-semibold"
              >
                Apply
              </button>
              <div className="mt-10 flex flex-col gap-1.5">
                <span className="bg-grey-lighter p-1.5 text-lg border border-greyish">
                  Total: <b>{0}$</b>
                </span>{' '}
                {1 > 0 && (
                  <span className="bg-success text-white p-1.5 text-lg border border-greyish">
                    Coupon applied: <b>-{0}%</b>
                  </span>
                )}
                {1 < 0 && (
                  <span>
                    New price: <b className="text-xl p-1.5 text-lg border border-greyish">{0}$</b>
                  </span>
                )}
              </div>
              <button
                type="button"
                className="mt-4 w-full h-11 bg-blue text-white font-semibold"
                onClick={() => {}}
              >
                Place Order
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
