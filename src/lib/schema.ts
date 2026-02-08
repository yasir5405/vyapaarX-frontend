import { z } from "zod";
export const productValidationSchema = z.object({
  name: z
    .string({ error: "Product name is required" })
    .min(3, { error: "Product name should be at least 3 characters long" })
    .max(150, { error: "Product name should be less than 150 characters" }),
  description: z
    .string()
    .max(2000, { error: "Description must not exceed 2000 characters" })
    .optional()
    .refine(
      (val) => !val || val.length >= 10,
      "Description must be at least 10 characters long if provided",
    ),
  price: z.number({ error: "Price of the product is required" }),
  companyName: z
    .string({ error: "Company name is required" })
    .min(3, { error: "Company name should be at least 3 characters long" })
    .max(150, { error: "Company name should be less than 150 characters" }),
  highlights: z
    .array(
      z
        .string({ error: "Highlight is required" })
        .min(3, { error: "Highlight should be at least 3 characters long" })
        .max(150, { error: "Highlight should be less than 150 characters" }),
    )
    .min(1, "At least one highlight is required"),
});

export const updateProductValidationSchema = productValidationSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  });

export const addAddressValidationSchema = z.object({
  addressLine: z
    .string({ error: "Address line is required" })
    .min(10, { error: "Address line should be at least 10 characters long" })
    .max(255, {
      error: "Address line should be less than 255 characters long",
    }),
  city: z
    .string({ error: "City is required" })
    .min(2, { error: "City must be at least 2 characters long" })
    .max(100, { error: "City should be less than 100 characters long" }),
  state: z
    .string({ error: "State is required" })
    .min(2, { error: "State must be at least 2 characters long" })
    .max(100, { error: "State should be less than 100 characters long" }),
  postalCode: z
    .string({ error: "Postal code is required" })
    .regex(/^[1-9][0-9]{5}$/, {
      message: "Enter a valid 6-digit PIN code.",
    }),
  country: z
    .string({ error: "Country is required" })
    .min(2, { error: "Country must be at least 2 characters long" })
    .max(100, { error: "Country should be less than 100 characters long" }),
});

export const updateAddressValidationSchema =
  addAddressValidationSchema.partial();
