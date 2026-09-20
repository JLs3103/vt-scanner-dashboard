"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bug,
  Copy,
  Download,
  FileJson,
  Globe,
  Link2,
  Minus,
  Network,
  Plus,
  RotateCcw,
  Search,
  Shield,
} from "lucide-react";
import { CategoryPie } from "@/components/charts/CategoryPie";
import {
  hashes,
  observedIndicators,
  timelineEvents,
  trafficCategories,
  vendorVerdicts,
} from "@/lib/mock-data";
import { severityClass, statusClass, statusLabel } from "@/lib/status";

function EventIcon({ type }: { type: string }) {
  if (type === "alert") return <AlertTriangle className="h-4 w-4 text-amber-400" />;
  if (type === "bug") return <Bug className="h-4 w-4 text-rose-400" />;
  if (type === "network") return <Network className="h-4 w-4 text-sky-400" />;
  return <Shield className="h-4 w-4 text-fuchsia-400" />;
}

function truncateHash(value: string) {
  if (value.length <= 28) return value;
  return `${value.slice(0, 14)}...${value.slice(-10)}`;
}

export default function InvestigatePage() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(1);

  const copyHash = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedHash(value);
    window.setTimeout(() => setCopiedHash(null), 1600);
  };

  return (
    <div className="space-y-4">
      <section className="surface mb-2 flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-slate-400">Investigations / IPs / Detail</span>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Target</p>
            <p className="font-semibold">203.0.113.45</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-500">ASN</p>
            <p className="font-semibold">AS58367</p>
          </div>
          <div className="rounded-lg bg-rose-600 px-3 py-2 text-center">
            <p className="text-[10px] uppercase">Risk Score</p>
            <p className="text-lg font-bold">85</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
            <FileJson className="h-3.5 w-3.5" /> Export JSON
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 font-semibold text-slate-950">
            Create Alert
          </button>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
        <section className="surface p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Timeline</p>
              <h2 className="text-lg font-semibold">Events & Detections</h2>
            </div>
            <div className="flex gap-2 text-xs">
              <select className="rounded-lg border border-white/10 bg-transparent px-2 py-1.5">
                <option>Newest</option>
              </select>
              <input
                placeholder="Search events"
                className="rounded-lg border border-white/10 bg-transparent px-3 py-1.5"
              />
            </div>
          </div>
          <div className="space-y-3">
            {timelineEvents.map((event) => (
              <article key={event.title} className="rounded-2xl bg-[#0b1220] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <EventIcon type={event.icon} />
                    <div>
                      <h3 className="text-sm font-semibold">{event.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{event.body}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
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

        <section className="surface p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-500">Geolocation</p>
              <h2 className="text-lg font-semibold">IP Map</h2>
            </div>
            <span className="text-xs text-slate-400">Confidence: High</span>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[#d7c7a5]">
            <div className="absolute right-3 top-3 z-10 flex flex-col overflow-hidden rounded-lg border border-slate-900/20 bg-white/80 shadow-sm">
              <button
                type="button"
                onClick={() => setMapScale((scale) => Math.min(scale + 0.2, 2))}
                aria-label="Zoom in map"
                title="Zoom in"
                className="p-2 text-slate-800 transition-colors hover:bg-white"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMapScale((scale) => Math.max(scale - 0.2, 1))}
                aria-label="Zoom out map"
                title="Zoom out"
                className="border-t border-slate-900/10 p-2 text-slate-800 transition-colors hover:bg-white"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMapScale(1)}
                aria-label="Reset map zoom"
                title="Reset map"
                className="border-t border-slate-900/10 p-2 text-slate-800 transition-colors hover:bg-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
            <svg viewBox="0 0 800 420" className="h-56 w-full origin-center transition-transform duration-200" style={{ transform: `scale(${mapScale})` }}>
              <rect width="800" height="420" fill="#e4d5b1" />
              <path
                fill="#c4b48a"
                d="M80 90l90 10 40 40-20 50-70 10-50-40zM210 70l180 20 40 80-90 40-140-20zM470 90l160 30 20 70-80 30-120-20zM120 250l90 10 20 50-70 20-50-20zM520 250l140 10 30 40-90 20-90-20z"
              />
              <circle cx="620" cy="150" r="8" fill="#0f172a" />
              <circle cx="620" cy="150" r="16" fill="none" stroke="#0f172a" strokeWidth="2" />
            </svg>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Primary: Tokyo, Japan · 35.6895° N · 139.6917° E · ISP: NTT Communications · AS58367
          </p>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
        <section className="surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Indicators</p>
              <h2 className="text-lg font-semibold">Observed Domains, URLs & Certs</h2>
            </div>
            <span className="text-xs text-slate-500">Last updated: 2026-09-18 15:00 UTC</span>
          </div>
          <div className="space-y-3">
            {observedIndicators.map((item) => (
              <article key={item.title} className="flex items-center justify-between gap-3 rounded-2xl bg-[#0b1220] p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                    {item.kind === "url" ? <Link2 className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.meta}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-slate-400">
                  <Search className="h-4 w-4" />
                  <Copy className="h-4 w-4" />
                </div>
              </article>
            ))}
          </div>
        </section>
        <CategoryPie data={trafficCategories} title="Traffic Categories" subtitle="Summary" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
        <section className="surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Related Artifacts</p>
              <h2 className="text-lg font-semibold">Hashes</h2>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300">
              <input type="checkbox" className="accent-teal-400" /> Export Selected
            </label>
          </div>
          <div className="space-y-3">
            {hashes.map((hash) => (
              <article key={hash.value} className="rounded-2xl bg-[#0b1220] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="min-w-0 text-sm font-medium" title={`${hash.algo}: ${hash.value}`}>
                      <span className="font-bold text-slate-100">{hash.algo}:</span>{" "}
                      <span className="font-mono font-normal text-slate-300">{truncateHash(hash.value)}</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{hash.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(hash.status)}`}>
                      {statusLabel(hash.status)}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyHash(hash.value)}
                      aria-label={`Copy ${hash.algo} hash`}
                      title={copiedHash === hash.value ? "Copied" : `Copy ${hash.algo}`}
                      className="rounded-md p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Vendor Matrix</p>
              <h2 className="text-lg font-semibold">Telemetry & Verdicts</h2>
            </div>
            <span className="text-xs text-slate-400">Expanded</span>
          </div>
          <div className="space-y-3">
            {vendorVerdicts.map((item) => (
              <article key={item.name} className="rounded-2xl bg-[#0b1220] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.body}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-500">Last: {item.last}</p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClass(item.status)}`}>
                      {statusLabel(item.status)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span>Last scanned: 2026-09-18 15:02 UTC · Scan ID: scan-20260918-1532</span>
        <span>Notes: Review vendor telemetry before escalating to IR. · View Raw JSON</span>
      </div>
    </div>
  );
}
