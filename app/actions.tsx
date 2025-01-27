"use server";

import { dreamCarShowcaseSchema } from "@/data/schemas";
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
  carModel: string;
  carYear: string;
};

export const generateCarImageLocal = async ({
  carColor,
  carMake,
  carType,
  carModel,
  carYear,
}: CarImagePrompt) => {
  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `ultra-detailed photograph of ${carColor} ${carYear} ${carMake} ${carModel} ${carType} in a showroom, professional automotive lighting, unedited raw photo, photorealistic`,
      }),
    });

    const data = await response.json();

    if (!data.image) {
      return {
        base64: "",
        url: "",
      };
    }

    return {
      base64: data.image.trimEnd(),
      url: `data:image/jpeg;base64,${data.image.trimEnd()}`,
    };
  } catch (error) {
    console.error("Error generating car image:", error);
    return {
      base64: "",
      url: "",
    };
  }
};

export const generateCarImage = async ({
  carColor,
  carMake,
  carType,
  carModel,
  carYear,
}: CarImagePrompt) => {
  console.log("Generating car image with OpenAI API");
  const car = await openaiInstance.images.generate({
    model: "dall-e-3",
    prompt: `Create a professional, high-quality automotive photograph of a ${carColor} ${carMake} ${carType} at a car dealership.

    Main subject:
    - Vehicle: ${carMake} ${carModel} ${carType} from ${carYear} in ${carColor} metallic paint
    - Angle: 3/4 front view, slightly elevated
    - Setting: Clean, well-lit dealership showroom or outdoor lot

    Key details:
    - Natural lighting with subtle reflections on the metallic paint
    - Sharp focus on the vehicle with slight background blur
    - Professional car photography style with attention to highlights and shadows
    - Clean, uncluttered background typical of dealership environments
    - Visible dealership elements like price tags or promotional materials
    - Pristine condition showcasing the vehicle's design features

    Technical specifications:
    - Photorealistic style
    - High contrast and sharp details
    - Professional automotive photography lighting
    - High dynamic range to capture metallic paint effects

    Do not include: people, text overlays, watermarks, or unrealistic modifications.`,
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

  console.log("Car image generated successfully", fileUrl);

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

type CarModelPayload = {
  vehicleType: string;
  fuelType: string;
  budget: string;
};

export const generateCarBrands = async (props: CarModelPayload) => {
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
      prompt: `You are a car dealership expert. Generate a curated list of car manufacturers that match these specific criteria:

Vehicle Type: ${props.vehicleType}
Fuel Type: ${props.fuelType}
Budget Range: ${props.budget}

Rules:
1. Only include manufacturers that actively produce ${props.vehicleType}s
2. Focus on brands that offer ${props.fuelType} vehicles
3. Prioritize manufacturers within the ${props.budget} price range
4. Include a mix of mainstream and premium brands if appropriate for the budget

Requirements:
- Generate between 15-25 relevant car brands
- Each brand must be a legitimate automobile manufacturer
- No duplicates or subsidiaries of the same parent company
- No discontinued or defunct brands
- Include origin country for each brand
- Format brand IDs in lowercase (e.g., "bmw")
- Format brand names in title case (e.g., "BMW")

Example format:
{
  id: "bmw",
  name: "BMW",
  origin: "Germany"
}`,
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
      temperature: 0.5,
      schema: dreamCarShowcaseSchema,
      prompt: `As a southern car dealer, suggest a car matching:
      Vehicle: ${props.vehicleType}
      Brands: ${props.brandNames.join(", ")}
      Budget: ${props.budget}
      Color: ${props.color}
      Fuel: ${props.fuelType}

      Keep the sales pitch short, sassy, and southern-styled.`,
    });

    return { ...props, ...object };
  } catch (error) {
    console.error("Error generating dream car", error);
    return null;
  }
};

export const getTestDriveTimeSlots = async () => {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        timeSlots: z
          .array(z.string())
          .min(3)
          .max(5)
          .describe("3-5 time slots, eg. 10:00 AM"),
      }),
      prompt: `Create a list of 3-5 time slots for test drives.`,
    });

    return object;
  } catch (error) {
    console.error("Error generating test drive time slots", error);
    return [];
  }
};
