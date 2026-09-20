import type { VendorStatus } from "./mock-data";

export function statusLabel(status: VendorStatus) {
  if (status === "malicious") return "Malicious";
  if (status === "suspicious") return "Suspicious";
  return "Verified / Clean";
}

export function statusClass(status: VendorStatus) {
  if (status === "malicious") return "bg-rose-500 text-white";
  if (status === "suspicious") return "bg-yellow-400 text-slate-900";
  return "bg-emerald-500 text-white";
}

export function severityClass(severity: string) {
  const key = severity.toLowerCase();
  if (key === "critical") return "bg-rose-500 text-white";
  if (key === "high") return "bg-amber-400 text-slate-900";
  if (key === "medium") return "bg-yellow-400 text-slate-900";
  return "bg-emerald-500 text-white";
}
