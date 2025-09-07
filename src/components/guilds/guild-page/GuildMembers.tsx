import { Guild } from "@/types/guild";

interface GuildMembersProps {
  guild: Guild;
  user: any;
  setGuild: (guild: Guild) => void;
}

export default function GuildMembers({
  guild,
  user,
  setGuild,
}: GuildMembersProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Members</h2>
      {guild.members?.length ? (
        <ul className="space-y-2">
          {guild.members.map((member) => (
            <li key={member.id} className="border p-3 rounded-lg">
              {member.full_name} ({member.rank_display})
            </li>
          ))}
        </ul>
      ) : (
        <p>No members yet.</p>
      )}
    </div>
  );
}
