"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthState } from "@/store/useAuthStore";
import { getHunter } from "@/lib/api";
import { Hunter } from "@/types/hunter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function HunterPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthState();

  const [hunter, setHunter] = useState<Hunter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !user) return;

    const loadHunter = async () => {
      setLoading(true);
      try {
        const data = await getHunter(Number(id));
        setHunter(data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching hunter.");
      } finally {
        setLoading(false);
      }
    };

    loadHunter();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading hunter...</p>;
  if (!hunter) return <p className="text-center mt-20">Hunter not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{hunter.full_name}</h1>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Date Joined:</span>{" "}
          {hunter.date_joined}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {hunter.email}
        </p>
        <p>
          <span className="font-semibold">Rank:</span> {hunter.rank_display}
        </p>
        {hunter.skills.length > 0 && (
          <p>
            <span className="font-semibold">Skills:</span>{" "}
            {hunter.skills.join(", ")}
          </p>
        )}
        {hunter.guild_name && (
          <p>
            <span className="font-semibold">Guild:</span> {hunter.guild_name}
          </p>
        )}
        <p>
          <span className="font-semibold">Power Level:</span>{" "}
          {hunter.power_level}
        </p>
        <p>
          <span className="font-semibold">Raid Count:</span> {hunter.raid_count}
        </p>
      </div>

      <div className="mt-10">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
}
