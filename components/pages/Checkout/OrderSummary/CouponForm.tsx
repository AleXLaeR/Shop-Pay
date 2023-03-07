import { useState } from 'react';
import { useApplyCouponMutation } from '@store/api';

import { Form, Formik } from 'formik';
import { couponValidationSchema, couponInitialValues } from '@lib/utils/formValidation';

import PropagateLoader from 'react-spinners/PropagateLoader';
import CheckoutFormInput from '@components/pages/Checkout/CheckoutFormInput';

interface CouponFormProps {
  appliedCoupon?: string;
  setDiscountedPrice: (state: DiscountedPrice) => void;
}

export default function CouponForm({ appliedCoupon, setDiscountedPrice }: CouponFormProps) {
  const [postCoupon, { error }] = useApplyCouponMutation();
  const [wasCouponEntered, setWasCouponEntered] = useState(false);

  const onFormSubmit = async ({ coupon }: OrderSummaryFormValues) => {
    const response: any = await postCoupon(coupon);
    setDiscountedPrice({ ...response.data, couponName: coupon });
    setWasCouponEntered(true);
  };

  return (
    <Formik
      onSubmit={onFormSubmit}
      initialValues={couponInitialValues}
      validationSchema={couponValidationSchema}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
          <CheckoutFormInput
            disabled={wasCouponEntered || !!appliedCoupon}
            name="coupon"
            placeholder="Enter the coupon"
            type="text"
          />
          <button
            type="submit"
            className={`-mt-1.5 w-full hover:bg-black-light h-10 bg-black-lighter text-white font-semibold ${
              !isValid || !dirty || isSubmitting || wasCouponEntered || !!appliedCoupon
                ? 'bg-grey-lighter pointer-events-none'
                : ''
            }`}
          >
            {isSubmitting ? (
              <PropagateLoader color="white" size={10} className="pb-[13px]" />
            ) : (
              (error as any)?.data.message || 'Apply'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
