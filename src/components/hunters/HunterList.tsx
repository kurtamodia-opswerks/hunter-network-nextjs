import HunterCard from "@/components/hunters/HunterCard";
import { Hunter } from "@/types/hunter";

interface HunterListProps {
  hunters: Hunter[];
  isAdmin: boolean;
}

export default function HunterList({ hunters, isAdmin }: HunterListProps) {
  if (hunters.length === 0) {
    return <p className="text-center text-gray-500">No hunters found.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {hunters.map((h) => (
        <HunterCard key={h.id} hunter={h} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
