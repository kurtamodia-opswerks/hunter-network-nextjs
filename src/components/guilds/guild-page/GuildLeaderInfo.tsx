interface GuildLeaderInfoProps {
  leader: {
    full_name?: string;
    rank_display?: string;
  } | null;
  foundedDate: string;
}

export default function GuildLeaderInfo({
  leader,
  foundedDate,
}: GuildLeaderInfoProps) {
  return (
    <div className="mb-6 space-y-2">
      <p>
        Leader:{" "}
        <span className="font-medium">{leader?.full_name || "Unassigned"}</span>{" "}
        ({leader?.rank_display || "N/A"})
      </p>
      <p>Founded: {foundedDate}</p>
    </div>
  );
}
