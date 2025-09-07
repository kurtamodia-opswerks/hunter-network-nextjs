import { memo } from "react";
import GuildCard from "@/components/guilds/GuildCard";
import { Guild } from "@/types/guild";

interface GuildListProps {
  guilds: Guild[];
  isAdmin: boolean;
}

const GuildList = memo(({ guilds, isAdmin }: GuildListProps) => {
  return (
    <div className="space-y-4">
      {guilds.map((g) => (
        <GuildCard key={g.id} guild={g} isAdmin={isAdmin} />
      ))}
    </div>
  );
});

GuildList.displayName = "GuildList";

export default GuildList;
