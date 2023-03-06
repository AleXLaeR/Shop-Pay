import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@store/hooks';
import countryList from '@data/countries';

import { usePostAddressMutation } from '@store/api';
import { addAddress } from '@store/slices/checkout.slice';

import { Form, Formik, FormikHelpers } from 'formik';
import { checkoutInitialValues, checkoutValidationSchema } from '@lib/utils/formValidation';

import CheckoutFormInput from '@components/pages/Checkout/CheckoutFormInput';
import ShippingFormButton from './ShippingFormButton';
import SingularSelect from './SingularSelect';

export default function ShippingForm({ className }: { className: string }) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [postAddress, { isLoading, error }] = usePostAddressMutation();

  const onFormSubmit = async (address: CheckoutFormValues, { resetForm }: FormikHelpers<any>) => {
    dispatch(addAddress(address));
    await postAddress({ address, userId: session?.user?.id! });
    resetForm();
  };

  return (
    <Formik
      onSubmit={onFormSubmit}
      initialValues={checkoutInitialValues}
      validationSchema={checkoutValidationSchema}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} className={`w-full ${className || ''}`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <CheckoutFormInput type="text" name="firstName" placeholder="*Your First Name" />
            <CheckoutFormInput type="text" name="lastName" placeholder="*Your Last Name" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <CheckoutFormInput type="text" name="state" placeholder="State/Province" />
            <CheckoutFormInput type="text" name="city" placeholder="*City Name" />
          </div>
          <div className="flex flex-row gap-4">
            <SingularSelect
              options={countryList}
              name="country"
              title="Country"
              placeholder="Country"
            />
            <CheckoutFormInput type="text" name="zipCode" placeholder="*Zip/Postal code" />
          </div>
          <CheckoutFormInput type="text" name="contactNumber" placeholder="*Contact Number" />
          <div className="flex flex-col sm:flex-row gap-4">
            <CheckoutFormInput type="text" name="primaryAddress" placeholder="*Delivery address" />
            <CheckoutFormInput type="text" name="secondaryAddress" placeholder="Fallback address" />
          </div>
          <ShippingFormButton
            disabled={!isValid || !dirty || isSubmitting}
            loading={isLoading}
            error={error}
          />
        </Form>
      )}
    </Formik>
  );
}
