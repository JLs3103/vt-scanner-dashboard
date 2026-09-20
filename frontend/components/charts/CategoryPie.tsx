"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Slice = { name: string; value: number; color: string };

export function CategoryPie({
  data,
  title = "Threat Categories",
  subtitle = "Last 24h",
  summary,
}: {
  data: Slice[];
  title?: string;
  subtitle?: string;
  summary?: string;
}) {
  return (
    <section className="surface flex min-h-full flex-col p-5">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="h-44 w-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={0} outerRadius={80} stroke="none">
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0e1626",
                  border: "1px solid rgba(148,163,184,0.2)",
                  borderRadius: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="grid w-full min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-2 text-xs">
          {data.map((item) => (
            <li key={item.name} className="flex min-w-0 items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2 truncate text-slate-300">
                <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                {item.name}
              </span>
              <span className="shrink-0 text-slate-200">{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
      {summary && <p className="mt-5 border-t border-white/5 pt-4 text-xs leading-5 text-slate-400">{summary}</p>}
    </section>
  );
}
