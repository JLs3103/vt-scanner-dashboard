"use client";

import Link from "next/link";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { activityFeed, historyPoints, integrations } from "@/lib/mock-data";

export default function SettingsPage() {
  const [lastSaved, setLastSaved] = useState("Sep 12, 2026 08:12");
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [apiKeyRevoked, setApiKeyRevoked] = useState(false);

  const saveProfile = () => setLastSaved("just now");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-slate-400">
        <p>AegisOSINT · Login / Auth · Main Dashboard · IP Investigation · Threat Timeline · Settings & Integrations</p>
        <span>Version 3.2.1</span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <section id="account" className="surface scroll-mt-4 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-xs text-slate-500">Manage account information</p>
              </div>
              <span className="text-xs text-slate-500">Last saved: {lastSaved}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs text-slate-400">
                Full name
                <input defaultValue="Dr. Evelyn Hayes" className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-transparent px-3 text-sm text-white" />
              </label>
              <label className="text-xs text-slate-400">
                Email address
                <input defaultValue="evelyn.hayes@sentinellabs.io" className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-transparent px-3 text-sm text-white" />
              </label>
            </div>
            <button type="button" onClick={saveProfile} className="mt-4 rounded-lg border border-white/10 px-3 py-1.5 text-xs transition-colors hover:border-white/30 hover:bg-white/5">
              Update Profile
            </button>
          </section>

          <section className="surface p-5">
            <h2 className="text-lg font-semibold">Security</h2>
            <p className="text-xs text-slate-500">Two-factor auth & API key management</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-[#0b1220] p-4">
                <p className="text-sm font-medium">Two-factor Authentication</p>
                <p className="mt-1 text-xs text-slate-500">Help protect account with TOTP</p>
                <span className="mt-3 inline-flex rounded-full bg-accent/20 px-2 py-0.5 text-[11px] text-accent">
                  Enabled
                </span>
                <button type="button" className="mt-4 block rounded-lg border border-white/10 px-3 py-1.5 text-xs">
                  Manage
                </button>
              </div>
              <div className="rounded-2xl bg-[#0b1220] p-4">
                <p className="text-sm font-medium">API Keys</p>
                <p className="mt-2 font-mono text-xs text-slate-400">{apiKeyRevoked ? "No active API key" : "Key: •••• •••• •••• 4A02"}</p>
                <p className="text-[11px] text-slate-500">{apiKeyRevoked ? "Revoked just now" : "Created: Jul 15, 2025"}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" disabled={apiKeyRevoked} onClick={() => setRevokeOpen(true)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40">
                    Revoke
                  </button>
                  <button type="button" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-slate-950">
                    Create API Key
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="surface p-5">
            <h2 className="text-sm font-semibold">Integration Health</h2>
            <dl className="mt-3 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between"><dt>Connected</dt><dd className="text-white">4 connectors</dd></div>
              <div className="flex justify-between"><dt>Disconnected</dt><dd className="text-white">3</dd></div>
              <div className="flex justify-between"><dt>Last sync</dt><dd className="text-white">Sep 13, 2026 08:18</dd></div>
              <div className="flex justify-between"><dt>Status</dt><dd className="text-accent">Success</dd></div>
            </dl>
          </section>
          <section className="surface p-5">
            <h2 className="text-sm font-semibold">Recent Sync Activity</h2>
            <ul className="mt-3 space-y-2 text-xs text-slate-400">
              <li className="flex justify-between"><span>VirusTotal</span><span>07:16 · 12 items</span></li>
              <li className="flex justify-between"><span>Cortex</span><span>03:02 · 8 items</span></li>
              <li className="flex justify-between"><span>SIEM</span><span>05:18 · 24 items</span></li>
            </ul>
          </section>
          <section className="surface p-5">
            <h2 className="mb-3 text-sm font-semibold">Sync History (Last 7 days)</h2>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyPoints}>
                  <Tooltip contentStyle={{ background: "#0e1626", border: "1px solid #334155" }} />
                  <Area type="monotone" dataKey="value" stroke="#2dd4bf" fill="#134e4a" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>

      <section className="surface p-5">
        <h2 className="text-lg font-semibold">Test Integration — VirusTotal</h2>
        <p className="text-xs text-slate-500">Recent test run logs (Sep 13, 2026 07:44)</p>
        <div className="mt-4 max-h-48 overflow-auto rounded-2xl bg-[#0b1220] p-4 font-mono text-[11px] leading-6 text-slate-300">
          {activityFeed.map((line) => (
            <p key={line.text}>
              [{line.time}] {line.text}
            </p>
          ))}
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="text-xs text-slate-500">Customize theme and typography</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-xs text-slate-400">
            Theme
            <select className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-transparent px-3 text-sm text-white">
              <option>Dark (pinned)</option>
            </select>
          </label>
          <label className="text-xs text-slate-400">
            Font family
            <select className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-transparent px-3 text-sm text-white">
              <option>Inter</option>
            </select>
          </label>
          <div className="rounded-2xl bg-[#0b1220] p-4 text-xs text-slate-400">
            Preview applied instantly
            <p className="mt-2 text-white">AegisOSINT — rapid analysis, secure collection.</p>
          </div>
        </div>
      </section>

      <section className="surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Data Retention</h2>
            <p className="text-xs text-slate-500">Store logs and artifacts for compliance</p>
          </div>
          <span className="text-xs text-slate-500">Default purge: 365 days</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-xs text-slate-400">
            Retention (days)
            <input defaultValue="365" className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-transparent px-3 text-sm text-white" />
          </label>
          <label className="text-xs text-slate-400">
            Policy
            <select className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-transparent px-3 text-sm text-white">
              <option>Keep all raw logs</option>
            </select>
          </label>
          <label className="flex items-center gap-2 pt-6 text-xs text-slate-300">
            <input type="checkbox" className="accent-teal-400" defaultChecked />
            Anonymize sensitive fields
          </label>
        </div>
      </section>

      <section className="surface flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h2 className="text-lg font-semibold">Alerting Rules</h2>
          <p className="text-xs text-slate-500">Manage alert conditions and delivery rules from the Alerts workspace.</p>
        </div>
        <Link href="/alerts" className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-white/30 hover:bg-white/5">
          Open Alerts
        </Link>
      </section>

      <section id="integrations" className="surface scroll-mt-4 p-5">
        <h2 className="text-lg font-semibold">Integrations</h2>
        <p className="text-xs text-slate-500">Connect external OSINT providers and SIEMs</p>
        <div className="mt-4 space-y-3">
          {integrations.map((item) => (
            <article key={item.name} className="grid gap-3 rounded-2xl bg-[#0b1220] p-4 sm:grid-cols-[1.4fr_0.7fr_1fr_auto] sm:items-center">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <div className="text-xs text-slate-400">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-slate-500">Status</p>
                <span className={`rounded-full px-2 py-0.5 ${item.status === "connected" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>
                  {item.status}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-slate-500">Last sync</p>
                <span>{item.last}</span>
              </div>
              <button type="button" className="justify-self-start rounded-lg border border-white/10 px-3 py-1 text-xs transition-colors hover:border-white/30 hover:bg-white/5 sm:justify-self-end">Test</button>
            </article>
          ))}
        </div>
      </section>

      {revokeOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="presentation">
          <div role="dialog" aria-modal="true" aria-labelledby="revoke-title" className="surface w-full max-w-md p-5 shadow-2xl">
            <h2 id="revoke-title" className="text-lg font-semibold">Revoke API key?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This action will immediately invalidate the key ending in 4A02. Any integration using it will stop working.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setRevokeOpen(false)} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-200">
                Cancel
              </button>
              <button type="button" onClick={() => { setApiKeyRevoked(true); setRevokeOpen(false); }} className="rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white">
                Revoke key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
