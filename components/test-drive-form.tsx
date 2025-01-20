"use client";

import { format } from "date-fns";
import { CalendarIcon, Car, Clock, Loader2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";

const timeSlotsSAMPLE = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

interface TestDriveFormProps {
  vehicleName?: string;
  vehicleType?: string;
  timeSlots?: string[];
  onSuccess?: (date: Date, time: string) => void;
}

export function TestDriveForm({
  vehicleName,
  vehicleType,
  timeSlots = timeSlotsSAMPLE,
  onSuccess,
}: TestDriveFormProps) {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasScheduled, setHasScheduled] = React.useState(false);
  const { append } = useChat({
    id: "auto-dealer",
  });

  const handleSchedule = async () => {
    if (!date || !time) {
      toast.error("Please select all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate scheduling process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setHasScheduled(true);
      toast.success("Test drive scheduled successfully!", {
        description: `Your test drive of the ${vehicleName} is scheduled for ${format(
          date,
          "MMMM d, yyyy"
        )} at ${time}`,
      });

      append({
        role: "system",
        content: `Test drive scheduled successfully! Your test drive of the ${vehicleName} is scheduled for ${format(
          date,
          "MMMM d, yyyy"
        )} at ${time}`,
      });

      onSuccess?.(date, time);
    } catch {
      toast.error("Scheduling failed. Please try again.", {
        description: "There was an error scheduling your test drive.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg skeleton-bg">
      <CardHeader>
        <CardTitle>Schedule a Test Drive</CardTitle>
        <CardDescription>Select your preferred date and time</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
          <div className="p-2 rounded-full bg-primary/10">
            <Car className="h-5 w-5 text-primary" />
          </div>
          <div className="grid gap-0.5">
            <span className="font-medium">{vehicleName}</span>
            <span className="text-sm text-muted-foreground">{vehicleType}</span>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Select Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 skeleton-bg">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) =>
                  date < new Date() ||
                  date < new Date("1900-01-01") ||
                  hasScheduled
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Select Time
          </label>
          <Select value={time} onValueChange={setTime} disabled={hasScheduled}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots?.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {slot}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {date && time && (
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="grid gap-1">
              <div className="text-sm font-medium">Booking Summary</div>
              <div className="text-sm text-muted-foreground">
                {vehicleName} • {format(date, "MMMM d, yyyy")} • {time}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full skeleton-div"
          size="lg"
          onClick={handleSchedule}
          disabled={isLoading || !date || !time || hasScheduled}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scheduling...
            </>
          ) : (
            "Schedule Test Drive"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
