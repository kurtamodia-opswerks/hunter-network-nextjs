"use client";

import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface HuntersFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  ordering: string;
  setOrdering: (val: string) => void;
  loading: boolean;
  firstLoad: boolean;
}

export default function HuntersFilters({
  search,
  setSearch,
  ordering,
  setOrdering,
  loading,
  firstLoad,
}: HuntersFiltersProps) {
  return (
    <div className="flex gap-4 mb-6 justify-center items-center">
      <input
        type="text"
        placeholder="Search hunters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded-lg w-64"
      />

      <Select value={ordering} onValueChange={(val) => setOrdering(val)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="power_level_annotated">Power Level ↑</SelectItem>
          <SelectItem value="-power_level_annotated">Power Level ↓</SelectItem>
          <SelectItem value="raid_count_annotated">Raid Count ↑</SelectItem>
          <SelectItem value="-raid_count_annotated">Raid Count ↓</SelectItem>
          <SelectItem value="first_name">Name ↑</SelectItem>
          <SelectItem value="-first_name">Name ↓</SelectItem>
        </SelectContent>
      </Select>

      {loading && !firstLoad && (
        <Loader2 className="animate-spin text-gray-500 w-5 h-5" />
      )}
    </div>
  );
}
