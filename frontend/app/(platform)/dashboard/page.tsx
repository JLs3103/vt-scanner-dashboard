"use client";

import { useState } from "react";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { DetectionGauge } from "@/components/dashboard/DetectionGauge";
import { StatusCards } from "@/components/dashboard/StatusCards";
import { VendorTable } from "@/components/dashboard/VendorTable";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { CategoryPie } from "@/components/charts/CategoryPie";
import { threatCategories } from "@/lib/mock-data";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  const simulateScan = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="space-y-4">
      <div className="cursor-pointer" onClick={simulateScan}>
        <SearchBar />
      </div>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="grid gap-4 xl:grid-cols-[1.05fr_1.25fr_0.9fr]">
            <DetectionGauge />
            <CategoryPie data={threatCategories} />
            <StatusCards />
          </div>
          <VendorTable />
        </>
      )}
    </div>
  );
}
