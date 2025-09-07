"use client";

import { Loader2 } from "lucide-react";

interface GuildsFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  ordering: string;
  setOrdering: (val: string) => void;
  loading: boolean;
  firstLoad: boolean;
}

export default function GuildFilters({
  search,
  setSearch,
  ordering,
  setOrdering,
  loading,
  firstLoad,
}: GuildsFiltersProps) {
  return (
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
        <option value="name">Name ↑</option>
        <option value="-name">Name ↓</option>
        <option value="created_at">Created At ↑</option>
        <option value="-created_at">Created At ↓</option>
      </select>

      {loading && !firstLoad && (
        <Loader2 className="animate-spin text-gray-500 w-5 h-5" />
      )}
    </div>
  );
}
