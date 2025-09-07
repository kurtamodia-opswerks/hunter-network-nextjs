import HunterCard from "@/components/hunters/HunterCard";
import { Hunter } from "@/types/hunter";

interface HunterListProps {
  hunters: Hunter[];
}

export default function HunterList({ hunters }: HunterListProps) {
  if (hunters.length === 0) {
    return <p className="text-center text-gray-500">No hunters found.</p>;
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {hunters.map((h) => (
        <HunterCard key={h.id} hunter={h} />
      ))}
    </div>
  );
}
