"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const features = [
  {
    title: "View Hunters",
    description:
      "Explore fellow hunters, check their power levels, and track raid participation.",
    image: "/features/hunters.png",
    alt: "View Hunters",
  },
  {
    title: "Join Guilds",
    description:
      "Discover and join guilds, team up with other hunters, and participate in guild activities.",
    image: "/features/guilds.png",
    alt: "Join Guilds",
  },
  {
    title: "Raids",
    description:
      "Track and participate in raids, see leaderboards, and level up with your team.",
    image: "/features/raids.jpg",
    alt: "Raids",
  },
];

export default function FeatureCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <div className="w-full">
      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem key={index}>
              <Card className="relative flex flex-col md:flex-row items-center gap-6 p-6 w-full">
                {/* Left Arrow */}
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100" />

                {/* Feature Image */}
                <div className="flex-1 w-full md:w-auto">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={600} // larger image width
                    height={400}
                    className="rounded-md w-full h-auto object-cover"
                  />
                </div>

                {/* Feature Info */}
                <div className="flex flex-col text-left w-full md:w-1/3">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-3xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-gray-600 text-lg">
                    {feature.description}
                  </CardContent>
                </div>

                {/* Right Arrow */}
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100" />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
