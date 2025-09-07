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
import { SquarePen, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Guild } from "@/types/guild";

interface GuildCardProps {
  guild: Guild;
  isAdmin?: boolean;
  onEdit?: (guild: Guild) => void;
  onDelete?: (id: number) => void;
  setDeletingGuild?: (guild: Guild) => void;
}

export default function GuildCard({
  guild,
  isAdmin,
  onEdit,
  onDelete,
  setDeletingGuild,
}: GuildCardProps) {
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
        <p>
          Leader:{" "}
          <span className="font-medium">
            {guild.leader_display?.full_name || "Unassigned"}
          </span>{" "}
          ({guild.leader_display?.rank_display})
        </p>

        <Button
          variant="outline"
          onClick={() => router.push(`/guilds/${guild.id}`)}
        >
          View Guild Page
        </Button>

        {isAdmin && (
          <div className="flex space-x-2 mt-3 items-center justify-end">
            <Button variant="outline" size="sm" onClick={() => onEdit?.(guild)}>
              <SquarePen />
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeletingGuild?.(guild)}
                >
                  <Trash />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Guild</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{guild.name}</span>? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete?.(guild.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
