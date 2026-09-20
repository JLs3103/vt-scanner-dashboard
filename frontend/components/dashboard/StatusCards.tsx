import { vendorBars } from "@/lib/mock-data";

export function StatusCards() {
  return (
    <div className="flex flex-col gap-4">
      <section className="surface p-4">
        <div className="flex items-start justify-between text-xs text-slate-400">
          <span>Active Alerts</span>
          <span>Severity: High</span>
        </div>
        <p className="mt-3 text-3xl font-semibold text-rose-400">27</p>
      </section>
      <section className="surface p-4">
        <p className="text-xs text-slate-400">Last Scan</p>
        <p className="mt-2 text-lg font-semibold">2026-09-18 14:32 UTC</p>
        <p className="mt-1 text-xs text-slate-400">Completed: 1h 12m ago</p>
      </section>
      <section className="surface p-4">
        <p className="mb-3 text-sm font-medium">Vendor Summary</p>
        <div className="space-y-3">
          {vendorBars.map((item) => (
            <div key={item.name}>
              <div className="mb-1 flex justify-between text-xs text-slate-300">
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.value}%`, background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
