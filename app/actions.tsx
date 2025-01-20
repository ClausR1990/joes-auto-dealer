"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import OpenAI from "openai";
import { getPlaiceholder } from "plaiceholder";
import { z } from "zod";

const openaiInstance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type CarImagePrompt = {
  carType: string;
  carColor: string;
  carMake: string;
};

export const generateCarImage = async ({
  carColor,
  carMake,
  carType,
}: CarImagePrompt) => {
  const car = await openaiInstance.images.generate({
    model: "dall-e-3",
    prompt: `A detailed and realistic photo of a ${carColor} colored ${carMake} ${carType} with significant visible damage from a full angled view.
    The ${carType} has a cracked front bumper, dent.,`,
    n: 1,
    quality: "standard",
    size: "1024x1024",
  });
  const fileUrl = car.data[0].url;

  if (!fileUrl)
    return {
      base64: "",
      url: "",
    };

  const buffer = await fetch(fileUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);

  return {
    base64,
    url: fileUrl,
  };
};

export const generateBudgetRanges = async () => {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        budgets: z
          .array(
            z.object({
              label: z.enum(["Economy", "Mid-Range", "Luxury", "Premium"]),
              min: z.number().min(20000).max(200000),
              max: z.number().min(20000).max(200000),
              color: z
                .string()
                .describe('tailwind color class (e.g. "bg-green-500")'),
            })
          )
          .min(4)
          .describe(
            '4 budget ranges (e.g. "Economy", "Mid-Range", "Luxury", "Premium")'
          ),
      }),
      prompt: `Create a list of 4 budget ranges with the label, min, max, and color.`,
    });

    return object;
  } catch (error) {
    console.error("Error generating budget ranges", error);
    return [];
  }
};

export const generateCarBrands = async () => {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        carBrands: z
          .array(
            z.object({
              id: z.string().describe('brand id (e.g. "bmw") in lowercase'),
              name: z
                .string()
                .describe('brand name (e.g. "BMW") in title case'),
              origin: z.string().describe('brand origin (e.g. "Germany")'),
            })
          )
          .min(15)
          .max(25)
          .describe("15-25 car brands"),
      }),
      prompt: `Create a list of 15-25 car brands with their id, name, and origin.
      The id should be in lowercase, the name should be in title case, and the origin should be the country of origin of the brand.
      The list should include brands like BMW, Toyota, and Ford.`,
    });

    return object;
  } catch (error) {
    console.error("Error generating car brands", error);
    return [];
  }
};

type DreamCarPayload = {
  vehicleType: string;
  brandNames: string[];
  budget: string;
  color: string;
  fuelType: string;
};

export const generateDreamCar = async (props: DreamCarPayload) => {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        brandName: z.string().describe("brand name of the car"),
        modelName: z.string().describe("model name of the car"),
        price: z
          .string()
          .describe("A realistic price of the car based on the user's budget"),
        modelYear: z.string().describe("model year of the car"),
        color: z.string().describe("color of the car"),
        salesPitch: z
          .string()
          .describe(
            "A funny sales pitch for the car. The car is really damaged, so the sales pitch should be about how the damage is a good thing."
          ),
      }),
      prompt: `Pick the dream car for the user based on their preferences. The user wants a car with the following preferences: ${JSON.stringify(
        { props }
      )}`,
    });

    const image = await generateCarImage({
      carColor: object.color,
      carMake: object.brandName,
      carType: `${object.modelYear} ${object.modelName} ${props.vehicleType}`,
    });

    return { ...props, ...object, image };
  } catch (error) {
    console.error("Error generating dream car", error);
    return null;
  }
};
