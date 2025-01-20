import {
  generateBudgetRanges,
  generateCarBrands,
  generateDreamCar,
  getTestDriveTimeSlots,
} from "@/app/actions";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0
  );

  const result = streamText({
    model: openai("gpt-4o"),
    system: `\n
    You are a car dealer assistant.
      - You help the user find their dream car.
      - keep resposes limited to a sentence or two.
      - DO NOT output lists or tables.
      - after every tool call, pretend you're showing the result to the user and keep your response limited to a phrase.
      - today's date is ${new Date().toLocaleDateString()}.
      - ask for any details you don't know.
      - The user doesn't have an input field unless you call showInputField.
      - IMPORTANT use tools rather than asking for user input.
      - IMPORTANT If you ask a question after calling getDreamCarResults, show the input field.
      - When the user is ready to pay show the payment form.
      - here's the optimal flow:
        - Get the vehicle type from the user.
        - Get the budget from the user.
        - Get the color preference from the user.
        - Get the fuel type from the user.
        - Get the brand preference from the user.
        - Choose a dream car for the user by calling getDreamCarResults.
        - call showInputField
        - call paymentForm
    `,
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
        parameters: z.object({}),
        execute: async () => {
          const data = await generateCarBrands();
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
        description: "Show the input field",
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
      paymentForm: tool({
        description: "Show the payment form",
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
    },
  });

  return result.toDataStreamResponse();
}
