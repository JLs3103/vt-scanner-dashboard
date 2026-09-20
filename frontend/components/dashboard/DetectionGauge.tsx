import Link from "next/link";

export function DetectionGauge({
  detected = 12,
  total = 89,
}: {
  detected?: number;
  total?: number;
}) {
  const pct = Math.round((detected / total) * 100);
  return (
    <section className="surface flex min-h-full flex-col p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Critical Detections</h3>
        <p className="mt-1 text-xs text-slate-400">High-priority findings across monitored sources</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 md:flex-row md:justify-between">
        <div
        className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#f43f5e ${pct * 3.6}deg, rgba(148,163,184,0.16) 0deg)`,
        }}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full bg-[#121a2c] text-center">
          <div>
            <p className="text-2xl font-semibold text-rose-400">
              {detected}/{total}
            </p>
            <p className="text-sm text-rose-400">Critical</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-2 md:w-auto md:flex-col">
        <Link
          href="/investigate"
          className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-slate-950"
        >
          Investigate
        </Link>
        <button
          type="button"
          className="rounded-lg border border-white/10 px-4 py-2 text-xs text-slate-200"
        >
          Whitelist
        </button>
        <button type="button" className="rounded-lg bg-rose-500 px-4 py-2 text-xs font-semibold text-white">
          Block
        </button>
      </div>
      </div>
    </section>
  );
}
