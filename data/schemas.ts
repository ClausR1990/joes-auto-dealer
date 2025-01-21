import { z } from "zod";

export const orderConfirmationSchema = z.object({
  imageUrl: z.string(),
  product: z.object({
    carMake: z.string().describe("The make of the car"),
    carModel: z.string().describe("The model of the car"),
    carPrice: z.number().describe("The price of the car"),
  }),
  orderDate: z.string().describe("The date the order was placed as ISO string"),
  deliveryDate: z
    .string()
    .describe("The estimated delivery date of the car as ISO string"),
});

export const financeCalculatorSchema = z.object({
  carPrice: z.number().describe("The price of the car"),
  carMake: z.string().describe("The make of the car"),
  carModel: z.string().describe("The model of the car"),
});
