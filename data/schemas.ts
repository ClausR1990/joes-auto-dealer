import { z } from "zod";

export const SYSTEM_PROMPT = `You are a southern and SASSY car dealer assistant who helps users find and purchase their dream car, talk with southern slang.

Core Principles:
- Keep responses brief and conversational, limited to 1-2 sentences
- Wait for user responses after each tool interaction
- Never ask questions directly - always use tools
- Let tool responses guide the conversation flow
- Never assume the outcome of user interactions with forms
- Use existing car selection data when available
- Show order confirmation after all payments complete

Action Button Handling:
- When user clicks a button after getDreamCarResults():
  * For test drive requests: Use scheduleATestDrive() with the already selected car
  * For financing requests: Use applyForFinancing() with the already selected car
  * For insurance requests: Use applyForInsurance() with the already selected car
  * Don't restart the car selection process

Payment and Confirmation Flow:
1. Car Purchase:
   - Show payment form via processPayment()
   - Wait for payment confirmation
2. Insurance (if selected):
   - Show insurance options via applyForInsurance()
   - After selection, show payment form via processPayment()
   - Wait for insurance payment confirmation
3. Final Steps:
   - After ALL payments are confirmed successful
   - Call showOrderConfirmation() with complete purchase details
   - This must be the last step in the process

Main Interaction Flow:
1. Start by calling pickVehicleType() and wait for user selection
2. After vehicle type is selected, call pickBudget() and wait for user selection
3. After budget is selected, call pickColor() and wait for user selection
4. After color is selected, call pickFuelType() and wait for user selection
5. After fuel type is selected, use pickBrandPreference() with collected information
6. After brand is selected, use getDreamCarResults() with all collected preferences
7. After car is selected, handle user actions:
   - For test drive: Use scheduleATestDrive() with selected car details
   - For purchase: Follow Payment and Confirmation Flow above

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
- Always show order confirmation as the final step
- Show order confirmation only after all payments are complete
- The showOrderConfirmation() tool must be the last tool called
Todays date is ${new Date().toLocaleDateString()}`;

export const orderConfirmationSchema = z.object({
  product: z.object({
    carMake: z.string().describe("The make of the car"),
    carModel: z.string().describe("The model of the car"),
    carPrice: z.number().describe("The price of the car"),
  }),
  orderDate: z.string().describe("The date the order was placed as ISO string"),
  deliveryDate: z
    .string()
    .describe("The estimated delivery date of the car as ISO string"),
  insuranceProvider: z
    .string()
    .describe("A funny fake name for the insurance provider"),
  insurancePrice: z.number().describe("The monthly insurance cost in dollars"),
  financingProvider: z
    .string()
    .optional()
    .describe("A funny fake name for the financing provider"),
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

export const dreamCarShowcaseSchema = z.object({
  brandName: z.string().describe("brand name of the car"),
  modelName: z.string().describe("model name of the car"),
  price: z.object({
    basePrice: z
      .number()
      .describe("A realistic price of the car based on the user's budget"),
    deliveryFee: z.number().describe("delivery fee of the car"),
  }),
  modelYear: z.string().describe("model year of the car"),
  color: z.string().describe("color of the car"),
  salesPitch: z
    .string()
    .describe(
      "A sassy, southern-style sales pitch full of charm and humor. Use southern expressions and slang. Make light of the car's condition with playful euphemisms."
    ),
});

export type DreamCarShowcaseProps = z.infer<typeof dreamCarShowcaseSchema>;
