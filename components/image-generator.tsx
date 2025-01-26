"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImage(`data:image/jpeg;base64,${data.image}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-6 space-y-6">
      <div className="flex gap-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="flex-1"
        />
        <Button onClick={generateImage} disabled={loading || !prompt}>
          Generate
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <Skeleton className="w-full aspect-square" />
          ) : image ? (
            <img
              src={image}
              alt={prompt}
              className="w-full aspect-square object-cover object-top"
              width={800}
              height={800}
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center text-gray-400">
              Generated image will appear here
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
