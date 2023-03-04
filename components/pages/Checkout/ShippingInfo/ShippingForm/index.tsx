import { Form, Formik } from 'formik';
import { checkoutInitialValues, checkoutValidationSchema } from '@lib/utils/formValidation';

import SingularSelect from './SingularSelect';
import ShippingFormInput from './ShippingFormInput';

export default function ShippingForm() {
  const onFormSubmit = (values: CheckoutFormValues) => {};

  return (
    <Formik
      onSubmit={onFormSubmit}
      initialValues={checkoutInitialValues}
      validationSchema={checkoutValidationSchema}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} className="w-full px-4 xl:w-[700px]">
          <div className="flex flex-col sm:flex-row gap-4">
            <ShippingFormInput type="text" name="firstName" placeholder="*Your First Name" />
            <ShippingFormInput type="text" name="lastName" placeholder="*Your Last Name" />
          </div>
          <div className="col">
            <ShippingFormInput type="text" name="state" placeholder="State/Province" />
            <ShippingFormInput type="text" name="city" placeholder="*City Name" />
          </div>
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
          <ShippingFormInput type="text" name="contactNumber" placeholder="*Contact Number" />
          <ShippingFormInput type="text" name="zipCode" placeholder="*Postal code" />
          <ShippingFormInput type="text" name="primaryAddress" placeholder="*Delivery address" />
          <ShippingFormInput type="text" name="secondaryAddress" placeholder="Fallback address" />
          <button type="submit" disabled={!isValid || !dirty || isSubmitting}>
            Save Address
          </button>
        </Form>
      )}
    </Formik>
  );
}
