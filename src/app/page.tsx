import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Original Heading */}
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        <span className="text-teal-800">Hunter Network:</span> The Joke Tax
        Chronicles
      </h1>

      <Separator className="w-24 border-t-2 border-teal-800" />

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Hunters Card */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-col items-center gap-2">
            <Image
              src="/features/hunters.png"
              alt="View Hunters"
              width={80}
              height={80}
              className="rounded-full"
            />
            <CardTitle>View Hunters</CardTitle>
          </CardHeader>
          <CardContent>
            Explore fellow hunters, check their power levels, and track raid
            participation.
          </CardContent>
        </Card>

        {/* Guilds Card */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-col items-center gap-2">
            <Image
              src="/features/guilds.png"
              alt="Join Guilds"
              width={80}
              height={80}
              className="rounded-full"
            />
            <CardTitle>Join Guilds</CardTitle>
          </CardHeader>
          <CardContent>
            Discover and join guilds, team up with other hunters, and
            participate in guild activities.
          </CardContent>
        </Card>

        {/* Raids Card */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-col items-center gap-2">
            <Image
              src="/features/raids.png"
              alt="Raids"
              width={80}
              height={80}
              className="rounded-full"
            />
            <CardTitle>Raids</CardTitle>
          </CardHeader>
          <CardContent>
            Track and participate in raids, see leaderboards, and level up with
            your team.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
