"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

const chips = ["192.168.0.1", "198.51.100.0/24", "malicious.example"];

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/investigate?q=${encodeURIComponent(query || "203.0.113.45")}`);
  };

  return (
    <form onSubmit={submit} className="surface p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search IP, domain, CIDR, or hash"
            className="h-11 w-full rounded-xl border border-white/10 bg-[#0b1220] pl-10 pr-20 text-sm outline-none placeholder:text-slate-500 focus:border-accent"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Scan
          </button>
        </label>
        <button
          type="button"
          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200"
        >
          Advanced
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setQuery(chip)}
            className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
          >
            {chip}
          </button>
        ))}
      </div>
    </form>
  );
}
