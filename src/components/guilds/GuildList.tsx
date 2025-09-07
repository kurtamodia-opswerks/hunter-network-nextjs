import GuildCard from "@/components/guilds/GuildCard";
import { Guild } from "@/types/guild";

interface GuildListProps {
  guilds: Guild[];
}

export default function GuildList({ guilds }: GuildListProps) {
  return (
    <div className="space-y-4">
      {guilds.map((g) => (
        <GuildCard key={g.id} guild={g} />
      ))}
    </div>
  );
}
