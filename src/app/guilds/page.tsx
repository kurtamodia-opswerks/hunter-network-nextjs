"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "@/store/useAuthStore";
import { useGuildState, useGuildActions } from "@/store/useGuildStore";
import GuildList from "@/components/guilds/GuildList";
import { useDebounce } from "@/hooks/useDebounce";

import { Loader2 } from "lucide-react";

export default function GuildsPage() {
  const { isLoggedIn, user } = useAuthState();
  const { guilds } = useGuildState();
  const { getGuilds } = useGuildActions();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("name");
  const [firstLoad, setFirstLoad] = useState(true);

  // debounce search by 1s
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

  // show full-page loader only for the very first load
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

      <div className="flex gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search guilds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-64"
        />
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="name">Name</option>
          <option value="created_at">Created At</option>
        </select>

        {/* subtle loading indicator for subsequent loads */}
        {loading && !firstLoad && (
          <Loader2 className="animate-spin text-gray-500 w-5 h-5" />
        )}
      </div>

      <GuildList guilds={guilds} isAdmin={!!user?.is_admin} />
    </div>
  );
}
