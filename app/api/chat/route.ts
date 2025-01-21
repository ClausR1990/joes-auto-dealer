import {
  generateBudgetRanges,
  generateCarBrands,
  generateDreamCar,
  getTestDriveTimeSlots,
} from "@/app/actions";
import {
  financeCalculatorSchema,
  insuranceCalculatorSchema,
  orderConfirmationSchema,
  SYSTEM_PROMPT,
} from "@/data/schemas";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const coreMessages = convertToCoreMessages(messages);

  const result = streamText({
    model: openai("gpt-4o"),
    system: SYSTEM_PROMPT,
    messages: coreMessages,
    toolChoice: "auto",
    maxSteps: 4,
    tools: {
      pickVehicleType: tool({
        description: "Get the vehicle type",
        parameters: z.object({}),
        execute: async () => {
          return {};
        },
      }),
      pickBudget: tool({
        description: "Pick a budget, from economy to premium",
        parameters: z.object({}),
        execute: async () => {
          const data = await generateBudgetRanges();
          return data;
        },
      }),
      pickColor: tool({
        description: "Pick a color of the car",
        parameters: z.object({}),
        execute: async () => {
          return {};
        },
      }),
      pickFuelType: tool({
        description: "Pick a fuel type",
        parameters: z.object({}),
        execute: async () => {
          return {};
        },
      }),
      pickBrandPreference: tool({
        description: "Pick a brand preference",
        parameters: z.object({
          vehicleType: z.string().describe("type of the vehicle"),
          fuelType: z.string().describe("fuel type of the car"),
          budget: z.string().describe("The users budget"),
        }),
        execute: async (props) => {
          const data = await generateCarBrands(props);
          return data;
        },
      }),
      getDreamCarResults: tool({
        description:
          "Picks the dream car for the user based on user preferences",
        parameters: z.object({
          vehicleType: z.string().describe("type of the vehicle"),
          brandNames: z
            .array(z.string())
            .describe("List of the user's brand preferences"),
          budget: z.string().describe("The users budget"),
          color: z.string().describe("THe color of the car"),
          fuelType: z.string().describe("fuel type of the car"),
        }),
        execute: async (props) => {
          const data = await generateDreamCar(props);

          return data;
        },
      }),
      showInputField: tool({
        description: "Show the input field when you need user input",
        parameters: z.object({}),
        execute: async () => {
          return {};
        },
      }),
      scheduleATestDrive: tool({
        description: "Schedule a test drive",
        parameters: z.object({
          vehicleName: z
            .string()
            .describe("The full name of the vehicle, eg. Tesla Model S"),
          vehicleType: z.string().describe("The type of the vehicle"),
        }),
        execute: async (props) => {
          const data = await getTestDriveTimeSlots();
          return {
            ...props,
            ...data,
          };
        },
      }),
      processPayment: tool({
        description:
          "Process the payment for the car, results successful or failed",
        parameters: z.object({
          amount: z
            .number()
            .optional()
            .describe("The amount to charge for the car"),
        }),
        execute: async ({ amount }) => {
          return { amount };
        },
      }),
      showOrderConfirmation: tool({
        description: "Show the order confirmation after payment",
        parameters: orderConfirmationSchema,
        execute: async (props) => {
          return props;
        },
      }),
      applyForFinancing: tool({
        description: "Show the finance calculator to apply for financing",
        parameters: financeCalculatorSchema,
        execute: async (props) => {
          return props;
        },
      }),
      applyForInsurance: tool({
        description: "Show the insurance calculator to apply for insurance",
        parameters: insuranceCalculatorSchema,
        execute: async (props) => {
          return props;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
