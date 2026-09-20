export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1.2fr_0.9fr]">
      <div className="skeleton h-80 rounded-2xl" />
      <div className="skeleton h-80 rounded-2xl" />
      <div className="space-y-4">
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
      </div>
      <div className="skeleton h-72 rounded-2xl lg:col-span-3" />
    </div>
  );
}
