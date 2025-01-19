"use server";

import PickBrand from "@/components/pick-brand";
import PickBudget from "@/components/pick-budget";
import PickColor from "@/components/pick-color";
import { PickFuelType } from "@/components/pick-fuel-type";
import { PickVehicleType } from "@/components/pick-vehicle-type";
import { openai } from "@ai-sdk/openai";
import { generateId, generateObject } from "ai";
import { getMutableAIState, streamUI } from "ai/rsc";
import { Loader2 } from "lucide-react";
import OpenAI from "openai";
import { ReactNode } from "react";
import { z } from "zod";

export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
};

const openaiInstance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type CarImagePrompt = {
  carType: string;
  carColor: string;
  carMake: string;
};

const generateCarImage = async ({
  carColor,
  carMake,
  carType,
}: CarImagePrompt) => {
  const car = await openaiInstance.images.generate({
    model: "dall-e-3",
    prompt: `A detailed and realistic image of a ${carColor} ${carMake} ${carColor} with significant visible damage from a full angled view.
    The ${carType} has a cracked front bumper, dent. High quality and should be 1024x1024 pixels in size. HD,`,
    n: 1,
    quality: "standard",
    size: "1024x1024",
  });
  const fileUrl = car.data[0].url;

  return fileUrl;
};

export const sendMessage = async (input: string): Promise<ClientMessage> => {
  "use server";

  const history = getMutableAIState();

  history.update([...history.get(), { role: "user", content: input }]);

  const response = await streamUI({
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
        - Display the results to the user by calling getDreamCarResults.
    `,
    messages: history.get(),
    toolChoice: "required",
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      pickVehicleType: {
        description: "Pick a vehicle type",
        parameters: z.object({}),
        generate: async function* () {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing vehicle types options`,
            },
          ]);
          yield <></>;

          return <PickVehicleType />;
        },
      },
      pickBudget: {
        description: "Pick a budget",
        parameters: z.object({}),
        generate: async function* () {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing budget options`,
            },
          ]);
          yield <></>;
          return <PickBudget />;
        },
      },
      pickColor: {
        description: "Pick a color of the car",
        parameters: z.object({}),
        generate: async function* () {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing color options`,
            },
          ]);
          yield <></>;
          return <PickColor />;
        },
      },
      pickFuelType: {
        description: "Pick a fuel type of the car",
        parameters: z.object({}),
        generate: async function* () {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing fuel type options`,
            },
          ]);
          yield <Loader2 className="animate-spin" />;
          return <PickFuelType />;
        },
      },
      pickBrandPreference: {
        description: "Pick a brand preference",
        parameters: z.object({}),
        generate: async function* () {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing brand options`,
            },
          ]);
          yield <Loader2 className="animate-spin" />;
          return <PickBrand />;
        },
      },
      getDreamCarResults: {
        description: "Get dream car results",
        parameters: z.object({
          vehicleType: z
            .string()
            .describe("type of the vehicle the user wants"),
          budget: z.string().describe("budget of the user"),
          color: z.string().describe("color the user wants"),
          fuelType: z
            .string()
            .describe("fuel type of the vehicle the user wants"),
          brand: z
            .array(z.string())
            .describe("brand preferences for the vehicle the user wants"),
        }),
        generate: async function* (props) {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing dream car results based on preferences: ${JSON.stringify(
                props
              )}`,
            },
          ]);
          console.log("props", props);
          const { object } = await generateObject({
            model: openai("gpt-4o"),
            prompt: `Pick the perfect dream car for the user based on their preferences. 
            DO NOT output lists or tables. DO NOT ask for any details. 
            DO NOT ask for any preferences. ${JSON.stringify(props)}`,
            schema: z.object({
              brandName: z.string().describe("brand name of the car"),
              modelName: z.string().describe("model name of the car"),
              price: z
                .string()
                .describe(
                  "A realistic price of the car based on the user's budget"
                ),
              modelYear: z.string().describe("model year of the car"),
              color: z.string().describe("color of the car"),
              fuelType: z.string().describe("fuel type of the car"),
              salesPitch: z.string().describe("a sales pitch for the car"),
            }),
          });
          const image = await generateCarImage({
            carColor: object.color,
            carMake: object.brandName,
            carType: object.modelName,
          });
          yield <Loader2 className="animate-spin" />;
          return (
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(
                {
                  ...object,
                  image,
                },
                null,
                2
              )}
            </pre>
          );
        },
      },
    },
  });

  console.log("😆", history.get());

  return {
    id: generateId(),
    role: "assistant",
    display: response.value,
  };
};
