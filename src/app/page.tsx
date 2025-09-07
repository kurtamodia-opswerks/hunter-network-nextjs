import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Original Heading */}
      <h1 className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance text-teal-800">
        Welcome to Hunter Network
      </h1>
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Connect, collaborate, and conquer challenges together in the world of
        hunters.
      </h4>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Hunters Card */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-col items-center gap-2">
            <Image
              src="/features/hunters.png"
              alt="View Hunters"
              width={160}
              height={160}
              className="w-auto h-auto"
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
              width={160}
              height={160}
              className="w-auto h-auto"
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
              src="/features/raids.jpg"
              alt="Raids"
              width={160}
              height={160}
              className="w-auto h-auto"
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
