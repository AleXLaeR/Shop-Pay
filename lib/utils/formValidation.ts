import { z } from 'Zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const checkoutValidationSchema = toFormikValidationSchema(
  z.object({
    firstName: z
      .string({ required_error: 'First name is required.' })
      .min(3, { message: 'First name must be at least 3 characters long.' })
      .max(20, { message: 'First name must be at most 20 characters long.' }),
    lastName: z
      .string({ required_error: 'Last name is required.' })
      .min(3, { message: 'Last name must be at least 3 characters long.' })
      .max(20, { message: 'Last name must be at most 20 characters long.' }),
    state: z
      .string()
      .min(2, { message: 'State name must be at least 3 characters long.' })
      .max(60, { message: 'State name must be at most 60 characters long.' })
      .optional(),
    city: z
      .string({ required_error: 'City name is required.' })
      .min(3, { message: 'City name must be at least 3 characters long.' })
      .max(40, { message: 'City name must be at most 40 characters long.' }),
    country: z
      .string({ required_error: 'Country name is required.' })
      .min(2, { message: 'Country name must be at least 3 characters long.' })
      .max(30, { message: 'Country name must be at most 30 characters long.' }),
    zipCode: z
      .string({ required_error: 'Postal code name is required.' })
      .min(3, { message: 'Postal code must be at least 3 characters long.' })
      .max(30, { message: 'Postal code must be at most 30 characters long.' }),
    contactNumber: z
      .string({ required_error: 'Your contact number is required.' })
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im),
    primaryAddress: z
      .string({ required_error: 'Primary address is required.' })
      .min(5, { message: 'Address must be at least 3 characters long.' })
      .max(100, { message: 'Address must be at most 20 characters long.' }),
    secondaryAddress: z
      .string()
      .min(5, { message: 'Address must be at least 3 characters long.' })
      .max(100, { message: 'Address must be at most 20 characters long.' })
      .optional(),
  } as Record<keyof CheckoutFormValues, any>),
);

export const checkoutInitialValues: CheckoutFormValues = {
  firstName: '',
  lastName: '',
  primaryAddress: '',
  secondaryAddress: '',
  city: '',
  country: '',
  zipCode: '',
  contactNumber: '',
};
