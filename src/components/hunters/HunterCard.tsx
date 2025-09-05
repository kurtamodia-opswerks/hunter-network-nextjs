import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Hunter {
  id: number;
  full_name: string;
  email: string;
  rank: string;
  rank_display: string;
  guild_name?: string;
  power_level: number;
  raid_count: number;
}

interface HunterCardProps {
  hunter: Hunter;
  isAdmin?: boolean;
}

export default function HunterCard({
  hunter,
  isAdmin = false,
}: HunterCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle>{hunter.full_name}</CardTitle>
          {hunter.guild_name && <Badge>{hunter.guild_name}</Badge>}
          <Badge
            variant={
              hunter.rank === "S"
                ? "destructive"
                : hunter.rank === "A"
                ? "secondary"
                : "outline"
            }
          >
            {hunter.rank_display}
          </Badge>
        </div>
        <CardDescription>{hunter.email}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        {isAdmin ? (
          <div className="grid grid-cols-2 gap-4">
            <p>
              <span className="font-semibold">Power Level:</span>{" "}
              {hunter.power_level}
            </p>
            <p>
              <span className="font-semibold">Raid Count:</span>{" "}
              {hunter.raid_count}
            </p>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center">
            <p>
              Power Level:{" "}
              <span className="font-medium">{hunter.power_level}</span>
            </p>
            <p>
              Raid Count:{" "}
              <span className="font-medium">{hunter.raid_count}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
