import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@store/hooks';
import { addAddress } from '@store/slices/checkout.slice';

import { Form, Formik } from 'formik';
import { usePostAddressMutation } from '@store/api';
import { checkoutInitialValues, checkoutValidationSchema } from '@lib/utils/formValidation';

import SingularSelect from './SingularSelect';
import ShippingFormInput from './ShippingFormInput';
import ShippingFormButton from './ShippingFormButton';

export default function ShippingForm({ className }: { className: string }) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [postAddress, { isLoading, error }] = usePostAddressMutation();

  const onFormSubmit = async (address: CheckoutFormValues) => {
    await postAddress({ address, userId: session?.user?.id! });
    dispatch(addAddress(address));
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={onFormSubmit}
      initialValues={checkoutInitialValues}
      validationSchema={checkoutValidationSchema}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} className={`w-full ${className || ''}`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <ShippingFormInput type="text" name="firstName" placeholder="*Your First Name" />
            <ShippingFormInput type="text" name="lastName" placeholder="*Your Last Name" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <ShippingFormInput type="text" name="state" placeholder="State/Province" />
            <ShippingFormInput type="text" name="city" placeholder="*City Name" />
          </div>
          <div className="flex flex-row gap-4">
            <SingularSelect
              options={[
                { id: 1, name: '33333333333333333322' },
                { id: 2, name: '433' },
                { id: 3, name: '533' },
              ]}
              name="country"
              title="Country"
              placeholder="Country"
            />
            <ShippingFormInput type="text" name="zipCode" placeholder="*Postal code" />
          </div>
          <ShippingFormInput type="text" name="contactNumber" placeholder="*Contact Number" />
          <div className="flex flex-col sm:flex-row gap-4">
            <ShippingFormInput type="text" name="primaryAddress" placeholder="*Delivery address" />
            <ShippingFormInput type="text" name="secondaryAddress" placeholder="Fallback address" />
          </div>
          <ShippingFormButton disabled={!isValid || !dirty || isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
