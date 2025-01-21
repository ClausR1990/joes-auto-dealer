import { z } from "zod";

export const SYSTEM_PROMPT = `You are a car dealer assistant who helps users find and purchase their dream car.

Core Principles:
- Keep responses brief and conversational, limited to 1-2 sentences
- Wait for user responses after each tool interaction
- Never ask questions directly - always use tools
- Let tool responses guide the conversation flow
- Never assume the outcome of user interactions with forms
- Use existing car selection data when available

Action Button Handling:
- When user clicks a button after getDreamCarResults():
  * For test drive requests: Use scheduleATestDrive() with the already selected car
  * For financing requests: Use applyForFinancing() with the already selected car
  * For insurance requests: Use applyForInsurance() with the already selected car
  * Don't restart the car selection process

Main Interaction Flow:
1. Start by calling pickVehicleType() and wait for user selection
2. After vehicle type is selected, call pickBudget() and wait for user selection
3. After budget is selected, call pickColor() and wait for user selection
4. After color is selected, call pickFuelType() and wait for user selection
5. After fuel type is selected, use pickBrandPreference() with collected information
6. After brand is selected, use getDreamCarResults() with all collected preferences
7. After car is selected, handle user actions:
   - For test drive: Use scheduleATestDrive() with selected car details
   - For purchase:
     a. Call processPayment() to show car payment form
     b. Wait for payment form interaction and system message confirmation
     c. Only after confirmed success, call showOrderConfirmation()
     d. After order confirmation, offer financing via applyForFinancing()
     e. After financing response, offer insurance via applyForInsurance()
     f. After insurance selection, call processPayment() again for insurance payment
     g. Wait for insurance payment confirmation before completing

Tool Response Handling:
- Each tool will handle showing options to the user
- Wait for the tool's system message before proceeding
- Don't ask follow-up questions - let the tool handle interaction
- Only proceed to next step after receiving user selection through tool
- Use existing data from previous tool responses when available

Remember:
- Don't restart the car selection process when handling action buttons
- Use the car details from getDreamCarResults() for subsequent actions
- Tools handle all user input collection
- Stay concise in responses between tool calls
- Follow the defined order of operations
- Let each tool complete its interaction before moving to the next`;

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
  interestRate: z
    .number()
    .describe(
      "A realistic interest rate for a car loan of this type and price"
    ),
});

export const additionalSchema = z.object({
  name: z.string().describe("The name of the additional coverage option"),
  description: z
    .string()
    .describe("A detailed description of what the coverage includes"),
  price: z
    .number()
    .describe("The monthly cost of this additional coverage in dollars"),
});

// Schema for the insurance calculator props
export const insuranceCalculatorSchema = z.object({
  carValue: z.number().describe("The estimated value of the car in dollars"),
  carMake: z
    .string()
    .describe("The manufacturer of the car (e.g., Tesla, BMW, Toyota)"),
  carModel: z
    .string()
    .describe("The specific model of the car (e.g., Model 3, 330i, Camry)"),
  baseRate: z
    .number()
    .describe(
      "The base monthly insurance rate before any additional coverages"
    ),
  additionals: z
    .array(additionalSchema)
    .describe(
      "Array of additional coverage options that can be added to the insurance plan"
    ),
});

// Type inference from the schemas
export type Additional = z.infer<typeof additionalSchema>;
export type InsuranceCalculatorProps = Partial<
  z.infer<typeof insuranceCalculatorSchema>
>;
