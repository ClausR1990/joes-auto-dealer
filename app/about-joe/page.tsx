import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Car,
  Cigarette,
  SparkleIcon as Firework,
  HandshakeIcon,
  DogIcon as HotDog,
  Timer,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import type React from "react"; // Import React

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-12 space-y-4">
        <Avatar className="size-32">
          <AvatarImage src="/ai_avatar.webp" alt="Joe 'Big Deal' Johnson" />
          <AvatarFallback>JJ</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Joe &quot;Big Deal&quot; Johnson
          </h1>
          <p className="text-muted-foreground mt-2">
            The South&apos;s Most Charismatic Auto Dealer
          </p>
        </div>
      </div>

      <div className="aspect-video overflow-hidden rounded-xl w-full mb-8 max-w-3xl mx-auto">
        <Image
          className="size-full object-center object-cover"
          src="/joe-county-fair.webp"
          alt="Joe's at the County Fair"
          width={800}
          height={600}
        />
      </div>

      {/* Timeline Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8">The Legend Begins</h2>
        <div className="space-y-8">
          <TimelineItem
            icon={<Firework className="h-5 w-5" />}
            title="The Fireworks Era"
            description="Started selling fireworks from an '89 Buick at county fairs"
          />
          <TimelineItem
            icon={<Cigarette className="h-5 w-5" />}
            title="The Great Mishap"
            description="One Roman candle + one cigarette = unexpected grand finale"
          />
          <TimelineItem
            icon={<Car className="h-5 w-5" />}
            title="The Revelation"
            description='"Why sell things that explode when I can sell things that just barely run?"'
          />
          <TimelineItem
            icon={<HandshakeIcon className="h-5 w-5" />}
            title="Joe's Auto Dealer Opens"
            description="Armed with a broken neon sign and industrial-strength hairspray"
          />
        </div>
      </div>

      {/* Sales Tactics Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Joe&apos;s Famous Sales Tactics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HotDog className="h-5 w-5" />
                The Hot Dog Deal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                A free hot dog with every test drive
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                The Oil Special
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                &quot;She don&apos;t leak oil—she just marks her
                territory!&quot;
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Custom Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Selling cars with &quot;custom ventilation&quot; (missing
                windows)
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-2xl mx-auto text-center">
        <blockquote className="text-2xl italic mb-4">
          &quot;Trust me, she&apos;ll get you there&quot;
        </blockquote>
        <p className="text-muted-foreground">
          (He just never specifies where) 🚗💨
        </p>
        <div className="mt-8">
          <Badge variant="secondary" className="text-sm">
            Now Available in AI Form
          </Badge>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-muted p-2 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 w-px bg-muted my-2" />
      </div>
      <div className="pb-8">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
