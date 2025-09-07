"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "@/store/useAuthStore";
import { useGuildState, useGuildActions } from "@/store/useGuildStore";
import { useDebounce } from "@/hooks/useDebounce";
import GuildList from "@/components/guilds/GuildList";
import GuildFilters from "@/components/guilds/GuildFilters";

export default function GuildsPage() {
  const { isLoggedIn, user } = useAuthState();
  const { guilds } = useGuildState();
  const { getGuilds } = useGuildActions();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("name");
  const [firstLoad, setFirstLoad] = useState(true);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isLoggedIn || !mounted) return;

    const loadGuilds = async () => {
      setLoading(true);
      try {
        await getGuilds({ search: debouncedSearch, ordering });
      } catch (err) {
        console.error("Failed to load guilds:", err);
      } finally {
        setLoading(false);
        setFirstLoad(false);
      }
    };

    loadGuilds();
  }, [isLoggedIn, mounted, debouncedSearch, ordering]);

  if (!isLoggedIn || !mounted) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">You are not logged in</h2>
        <p className="text-lg">Please log in to view the Guilds section.</p>
      </div>
    );
  }

  if (firstLoad && loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg">Loading guilds...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Guilds</h1>

      <GuildFilters
        search={search}
        setSearch={setSearch}
        ordering={ordering}
        setOrdering={setOrdering}
        loading={loading}
        firstLoad={firstLoad}
      />

      <GuildList guilds={guilds} />
    </div>
  );
}
