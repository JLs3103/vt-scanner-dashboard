"use client";

import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, FileDown, Printer } from "lucide-react";
import { CategoryPie } from "@/components/charts/CategoryPie";
import { historyPoints, threatCategories, timelineEvents } from "@/lib/mock-data";
import { severityClass } from "@/lib/status";

export default function TimelinePage() {
  const [range, setRange] = useState("7 days");

  const exportCsv = () => {
    const rows = [
      ["Event", "Time", "Severity"],
      ...timelineEvents.map((event) => [event.title, event.time, event.severity]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `aegisosint-report-${range.replaceAll(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => window.print();

  return (
    <div className="space-y-4">
      <section className="surface flex flex-wrap items-end justify-between gap-4 p-5">
        <div>
          <p className="text-xs text-slate-500">Reports</p>
          <h1 className="text-2xl font-semibold">Threat Timeline & Charts</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Comprehensive detection timelines and historical threat trends.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-400">
            Range
            <select
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#0b1220] px-2.5 py-2 text-slate-200 outline-none focus:border-accent"
            >
              <option>24 hours</option>
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </label>
          <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-200 transition-colors hover:border-white/30 hover:bg-white/5">
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          <button type="button" onClick={exportPdf} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-200 transition-colors hover:border-white/30 hover:bg-white/5">
            <Printer className="h-3.5 w-3.5" /> PDF
          </button>
        </div>
      </section>
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <section className="surface p-5">
          <h2 className="mb-4 text-lg font-semibold">Detection timeline</h2>
          <div className="space-y-3">
            {timelineEvents.map((event) => (
              <article key={event.title} className="rounded-2xl bg-[#0b1220] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">{event.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">{event.body}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-500">{event.time}</p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${severityClass(event.severity)}`}>
                      {event.severity}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="space-y-4">
          <section className="surface p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Sync History ({range})</h2>
              <FileDown className="h-4 w-4 text-slate-500" />
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyPoints}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#0e1626",
                      border: "1px solid rgba(148,163,184,0.2)",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2dd4bf" fill="#134e4a" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
          <CategoryPie
            data={threatCategories}
            subtitle={range}
            summary="Malware remains the dominant category at 45%, while benign traffic accounts for 10% of observed activity."
          />
        </div>
      </div>
    </div>
  );
}
