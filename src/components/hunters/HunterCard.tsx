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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Hunter } from "@/types/hunter";

interface HunterCardProps {
  hunter: Hunter;
}

export default function HunterCard({ hunter }: HunterCardProps) {
  const router = useRouter();

  return (
    <Card className="shadow-md w-xl">
      <div className="flex items-center gap-4 p-4">
        {/* Avatar Section */}
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={`/avatars/${hunter.id}.png`}
            alt={hunter.full_name}
          />
          <AvatarFallback>
            {hunter.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Right Side Info */}
        <div className="flex-1">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <CardTitle>{hunter.full_name}</CardTitle>
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

          <CardContent className="p-0 mt-3">
            <Button
              variant="outline"
              onClick={() => router.push(`/hunters/${hunter.id}`)}
            >
              View Hunter Page
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
