"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthState } from "@/store/useAuthStore";
import { getGuild } from "@/lib/api";
import { Guild } from "@/types/guild";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import GuildHeader from "@/components/guilds/guild-page/GuildHeader";
import GuildLeaderInfo from "@/components/guilds/guild-page/GuildLeaderInfo";
import GuildMembers from "@/components/guilds/guild-page/GuildMembers";

export default function GuildPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthState();

  const [mounted, setMounted] = useState(false);

  const [guild, setGuild] = useState<Guild | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!id || !user) return;

    const loadGuild = async () => {
      setLoading(true);
      try {
        const data = await getGuild(Number(id));
        setGuild(data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching guild.");
      } finally {
        setLoading(false);
      }
    };

    loadGuild();
  }, [id]);

  if (!isLoggedIn || !mounted) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">You are not logged in</h2>
        <p className="text-lg">Please log in to view the Guild Page.</p>
      </div>
    );
  }
  if (loading) return <p className="text-center mt-20">Loading guild...</p>;
  if (!guild) return <p className="text-center mt-20">Guild not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <GuildHeader name={guild.name} memberCount={guild.member_count} />

      <GuildLeaderInfo
        leader={guild.leader_display}
        foundedDate={guild.founded_date}
      />

      <GuildMembers guild={guild} user={user} setGuild={setGuild} />

      <div className="mt-10">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
}
