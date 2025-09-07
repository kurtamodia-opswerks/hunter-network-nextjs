"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "@/store/useAuthStore";
import { getHunters } from "@/lib/api";
import { Hunter } from "@/types/hunter";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2 } from "lucide-react";
import HunterList from "@/components/hunters/HunterList";
import HunterFilters from "@/components/hunters/HunterFilters";

export default function HuntersPage() {
  const { isLoggedIn, user } = useAuthState();

  const [mounted, setMounted] = useState(false);
  const [hunters, setHunters] = useState<Hunter[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-power_level_annotated");
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isLoggedIn || !mounted) return;

    const loadHunters = async () => {
      setLoading(true);
      try {
        const data = await getHunters({ search: debouncedSearch, ordering });
        setHunters(data);
      } catch (err) {
        console.error("Failed to fetch hunters:", err);
      } finally {
        setLoading(false);
        setFirstLoad(false);
      }
    };

    loadHunters();
  }, [isLoggedIn, mounted, debouncedSearch, ordering]);

  if (!isLoggedIn || !mounted) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">You are not logged in</h2>
        <p className="text-lg">Please log in to view the Hunters section.</p>
      </div>
    );
  }

  // show full-page loader only for the very first load
  if (firstLoad && loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg">Loading hunters...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Hunter Rankings</h1>

      <HunterFilters
        search={search}
        setSearch={setSearch}
        ordering={ordering}
        setOrdering={setOrdering}
        loading={loading}
        firstLoad={firstLoad}
      />

      {/* subtle loader for subsequent loads */}
      {loading && !firstLoad && (
        <div className="flex justify-center mb-4">
          <Loader2 className="animate-spin text-gray-500 w-5 h-5" />
        </div>
      )}

      <HunterList hunters={hunters} />
    </div>
  );
}
