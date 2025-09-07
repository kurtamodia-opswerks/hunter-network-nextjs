import GuildCard from "@/components/guilds/GuildCard";
import { Guild } from "@/types/guild";

interface GuildListProps {
  guilds: Guild[];
  isAdmin: boolean;
}

export default function GuildList({ guilds, isAdmin }: GuildListProps) {
  return (
    <div className="space-y-4">
      {guilds.map((g) => (
        <GuildCard key={g.id} guild={g} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
