import {
  generateBudgetRanges,
  generateCarBrands,
  generateDreamCar,
} from "@/app/actions";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

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
      - IMPORTATN DO NOT use the same tool twice.
      - here's the optimal flow:
        - Get the vehicle type from the user.
        - Get the budget from the user.
        - Get the color preference from the user.
        - Get the fuel type from the user.
        - Get the brand preference from the user.
        - Choose a dream car for the user by calling getDreamCarResults.
    `,
    messages,
    toolChoice: "required",
    tools: {
      pickVehicleType: tool({
        description: "Pick a vehicle type",
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
    },
  });

  return result.toDataStreamResponse();
}
