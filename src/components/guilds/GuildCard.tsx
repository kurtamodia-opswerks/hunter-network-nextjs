import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Guild } from "@/types/guild";

interface GuildCardProps {
  guild: Guild;
}

export default function GuildCard({ guild }: GuildCardProps) {
  const router = useRouter();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{guild.name}</CardTitle>
          <Badge>{guild.member_count} members</Badge>
        </div>
        <CardDescription>Founded: {guild.founded_date}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col space-y-2">
        <Button
          variant="outline"
          onClick={() => router.push(`/guilds/${guild.id}`)}
        >
          View Guild Page
        </Button>
      </CardContent>
    </Card>
  );
}
