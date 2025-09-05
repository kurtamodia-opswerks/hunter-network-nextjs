"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HunterCard from "@/components/hunters/HunterCard";
import useAuthStore from "@/store/useAuthStore";

interface Hunter {
  id: number;
  full_name: string;
  email: string;
  rank: string;
  rank_display: string;
  guild_name?: string;
  power_level: number;
  raid_count: number;
}

export default function HuntersPage() {
  // States
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [mounted, setMounted] = useState(false);

  // Data
  const [hunters, setHunters] = useState<Hunter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllPower, setShowAllPower] = useState(false);
  const [showAllRaid, setShowAllRaid] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return; // only run if logged in

    const loadHunters = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/hunters", { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to fetch hunters");

        const data = await res.json();
        setHunters(data);
      } catch (err) {
        console.error("Failed to fetch hunters:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHunters();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">You are not logged in</h2>
        <p className="text-lg">Please log in to view the Hunters section.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg">Loading hunters...</p>
      </div>
    );
  }

  const powerRankings = [...hunters].sort(
    (a, b) => b.power_level - a.power_level
  );
  const raidLeaders = [...hunters].sort((a, b) => b.raid_count - a.raid_count);

  const displayedPower = showAllPower
    ? powerRankings
    : powerRankings.slice(0, 5);
  const displayedRaid = showAllRaid ? raidLeaders : raidLeaders.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Hunter Rankings</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Power Rankings */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Power Rankings
          </h2>
          <div className="space-y-4">
            {displayedPower.map((h) => (
              <HunterCard key={h.id} hunter={h} isAdmin={false} />
            ))}
          </div>
          {!showAllPower && powerRankings.length > 5 && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setShowAllPower(true)}>
                View Full List
              </Button>
            </div>
          )}
        </section>

        {/* Raid Leaders */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Raid Leaders
          </h2>
          <div className="space-y-4">
            {displayedRaid.map((h) => (
              <HunterCard key={h.id} hunter={h} isAdmin={false} />
            ))}
          </div>
          {!showAllRaid && raidLeaders.length > 5 && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setShowAllRaid(true)}>
                View Full List
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
