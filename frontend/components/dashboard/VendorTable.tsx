"use client";

import { useState } from "react";
import { vendorFeed } from "@/lib/mock-data";
import { statusClass, statusLabel } from "@/lib/status";
import { Check, Download, Flag, MoreHorizontal } from "lucide-react";

export function VendorTable({ rows = vendorFeed }: { rows?: typeof vendorFeed }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState("10");

  const toggle = (vendor: string) => {
    setSelected((current) =>
      current.includes(vendor)
        ? current.filter((item) => item !== vendor)
        : [...current, vendor],
    );
  };

  const allSelected = rows.length > 0 && selected.length === rows.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : rows.map((row) => row.vendor));
  };

  const exportTable = () => {
    window.print();
  };

  return (
    <section className="surface overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
            aria-label="Select all vendor rows"
            className="print-checkbox h-4 w-4 cursor-pointer rounded accent-teal-400"
          />
          <h3 className="text-sm font-semibold">Vendor Malware Feed</h3>
          <span className="text-xs text-slate-400">
            Showing {rows.length ? `1-${rows.length}` : "0"} of {rows.length}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportTable}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200"
          >
            Export
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200"
          >
            Bulk Actions
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs text-slate-200">
            <tr>
                {["", "Vendor", "Malware Family", "First Seen", "Last Seen", "Detections", "Confidence", "Status", ""].map(
                  (col, index) => (
                    <th key={`vendor-header-${index}`} className="px-4 py-3 font-medium">
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.vendor} className="border-t border-white/5">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Select ${row.vendor}`}
                    className="print-checkbox h-4 w-4 cursor-pointer rounded accent-teal-400"
                    checked={selected.includes(row.vendor)}
                    onChange={() => toggle(row.vendor)}
                  />
                </td>
                <td className="px-4 py-3 font-medium">{row.vendor}</td>
                <td className="px-4 py-3 text-slate-300">{row.family}</td>
                <td className="px-4 py-3 text-slate-300">{row.firstSeen}</td>
                <td className="px-4 py-3 text-slate-300">{row.lastSeen}</td>
                <td className="px-4 py-3">{row.detections}</td>
                <td className="px-4 py-3">{row.confidence}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(row.status)}`}>
                    {row.status === "clean" ? "Verified / Clean" : statusLabel(row.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2 text-slate-400">
                    <MoreHorizontal className="h-4 w-4" />
                    {row.status === "clean" ? <Check className="h-4 w-4" /> : <Flag className="h-4 w-4" />}
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-slate-500">
                  No vendors match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-white/5 px-5 py-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <button type="button" className="rounded-lg border border-white/10 px-3 py-1.5 text-slate-200 transition-colors hover:border-white/30 hover:bg-white/5">
            Bulk Actions
          </button>
          <span>{selected.length} selected</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="vendor-page-size">Rows per page</label>
          <select
            id="vendor-page-size"
            value={pageSize}
            onChange={(event) => setPageSize(event.target.value)}
            className="rounded-md border border-white/10 bg-[#0b1220] px-2 py-1 text-slate-200"
          >
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          <span>{rows.length ? `1-${rows.length}` : "0"} of {rows.length}</span>
          <div className="flex gap-1" aria-label="Vendor pagination">
            <button type="button" disabled aria-label="Previous page" className="cursor-not-allowed rounded-md border border-white/10 px-2 py-1 opacity-40">
              ‹
            </button>
            <button type="button" disabled aria-label="Next page" className="cursor-not-allowed rounded-md border border-white/10 px-2 py-1 opacity-40">
              ›
            </button>
          </div>
        </div>
        <Download className="hidden h-4 w-4 md:block" />
      </div>
    </section>
  );
}
