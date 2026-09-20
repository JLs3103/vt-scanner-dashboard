"use client";

import { useState } from "react";
import { BellPlus, Pencil, Plus, Trash2 } from "lucide-react";
import { alertRules } from "@/lib/mock-data";
import { severityClass } from "@/lib/status";

export default function AlertsPage() {
  const [rules, setRules] = useState(alertRules);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");

  const createRule = () => {
    const name = `New alert rule ${rules.length + 1}`;
    setRules((current) => [
      ...current,
      { name, meta: "Configure trigger conditions and delivery channels", severity: "Medium", enabled: false },
    ]);
  };

  const toggleRule = (name: string) => {
    setRules((current) => current.map((rule) => (rule.name === name ? { ...rule, enabled: !rule.enabled } : rule)));
  };

  const startEditing = (name: string) => {
    setEditingRule(name);
    setDraftName(name);
  };

  const saveEdit = (name: string) => {
    const trimmedName = draftName.trim();
    if (!trimmedName) return;
    setRules((current) => current.map((rule) => (rule.name === name ? { ...rule, name: trimmedName } : rule)));
    setEditingRule(null);
  };

  const deleteRule = (name: string) => {
    setRules((current) => current.filter((rule) => rule.name !== name));
  };

  return (
    <div className="space-y-4">
      <section className="surface flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h1 className="text-2xl font-semibold">Alerts</h1>
          <p className="mt-2 text-sm text-slate-400">Alert rules and notification delivery status.</p>
        </div>
        <button
          type="button"
          onClick={createRule}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          New Rule
        </button>
      </section>

      <section className="surface overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/5 px-5 py-4">
          <BellPlus className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold">Alert Rules</h2>
          <span className="text-xs text-slate-500">{rules.length} configured</span>
        </div>
        <div className="divide-y divide-white/5">
          {rules.map((rule) => (
            <article key={rule.name} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                {editingRule === rule.name ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      value={draftName}
                      onChange={(event) => setDraftName(event.target.value)}
                      aria-label="Alert rule name"
                      className="h-9 min-w-48 rounded-lg border border-white/15 bg-[#0b1220] px-3 text-sm outline-none focus:border-accent"
                      autoFocus
                    />
                    <button type="button" onClick={() => saveEdit(rule.name)} className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-slate-950">
                      Save
                    </button>
                    <button type="button" onClick={() => setEditingRule(null)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p className="text-sm font-medium">{rule.name}</p>
                )}
                <p className="mt-1 text-xs text-slate-500">{rule.meta}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${severityClass(rule.severity)}`}>
                  {rule.severity}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={rule.enabled}
                  aria-label={`${rule.enabled ? "Disable" : "Enable"} ${rule.name}`}
                  onClick={() => toggleRule(rule.name)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${rule.enabled ? "bg-accent hover:bg-accent-hover" : "bg-slate-600 hover:bg-slate-500"}`}
                >
                  <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${rule.enabled ? "translate-x-4" : "translate-x-0"}`} />
                </button>
                <button type="button" onClick={() => startEditing(rule.name)} aria-label={`Edit ${rule.name}`} title="Edit rule" className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => deleteRule(rule.name)} aria-label={`Delete ${rule.name}`} title="Delete rule" className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
