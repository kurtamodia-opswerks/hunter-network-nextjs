import { Badge } from "@/components/ui/badge";

interface GuildHeaderProps {
  name: string;
  memberCount: string;
}

export default function GuildHeader({ name, memberCount }: GuildHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">{name}</h1>
      <Badge>{memberCount} members</Badge>
    </div>
  );
}
