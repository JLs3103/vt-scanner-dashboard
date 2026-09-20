"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { VendorTable } from "@/components/dashboard/VendorTable";
import { vendorFeed } from "@/lib/mock-data";

export default function VendorsPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredVendors = vendorFeed.filter((vendor) =>
    [vendor.vendor, vendor.family].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );

  return (
    <div className="space-y-4">
      <section className="surface p-5">
        <h1 className="text-2xl font-semibold">Vendors</h1>
        <p className="mt-2 text-sm text-slate-400">
          Security vendor verdicts and malware feed intelligence.
        </p>
      </section>
      <div className="surface flex flex-wrap items-center justify-between gap-3 p-3">
        <label className="relative min-w-0 flex-1 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Vendor or Malware"
            aria-label="Search Vendor or Malware"
            className="h-10 w-full rounded-xl border border-white/10 bg-[#0b1220] pl-10 pr-3 text-sm outline-none placeholder:text-slate-500 focus:border-accent"
          />
        </label>
        <span className="text-xs text-slate-400">
          {filteredVendors.length} of {vendorFeed.length} vendors
        </span>
      </div>
      <VendorTable rows={filteredVendors} />
    </div>
  );
}
