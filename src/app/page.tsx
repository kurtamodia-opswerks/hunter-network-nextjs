import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Original Heading */}
      <h1 className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance text-teal-800">
        Welcome to Hunter Network
      </h1>
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
        Connect, collaborate, and conquer challenges together in the world of
        hunters.
      </h4>

      {/* Feature Cards */}
      <div className="flex flex-col gap-6 w-full max-w-5xl">
        {/* Hunters Card */}
        <Card className="flex flex-row items-center gap-6 p-4 hover:shadow-lg transition-shadow w-full">
          <Image
            src="/features/hunters.png"
            alt="View Hunters"
            width={160}
            height={160}
            className="rounded-md"
          />
          <div className="flex flex-col text-left">
            <CardHeader className="p-0 mb-2">
              <CardTitle>View Hunters</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              Explore fellow hunters, check their power levels, and track raid
              participation.
            </CardContent>
          </div>
        </Card>

        {/* Guilds Card */}
        <Card className="flex flex-row items-center gap-6 p-4 hover:shadow-lg transition-shadow w-full">
          <Image
            src="/features/guilds.png"
            alt="Join Guilds"
            width={160}
            height={160}
            className="rounded-md"
          />
          <div className="flex flex-col text-left">
            <CardHeader className="p-0 mb-2">
              <CardTitle>Join Guilds</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              Discover and join guilds, team up with other hunters, and
              participate in guild activities.
            </CardContent>
          </div>
        </Card>

        {/* Raids Card */}
        <Card className="flex flex-row items-center gap-6 p-4 hover:shadow-lg transition-shadow w-full">
          <Image
            src="/features/raids.jpg"
            alt="Raids"
            width={160}
            height={160}
            className="rounded-md"
          />
          <div className="flex flex-col text-left">
            <CardHeader className="p-0 mb-2">
              <CardTitle>Raids</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              Track and participate in raids, see leaderboards, and level up
              with your team.
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
