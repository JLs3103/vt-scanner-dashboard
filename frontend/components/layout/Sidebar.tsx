"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  LayoutDashboard,
  Plug,
  Search,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/investigate", label: "Investigate IP", icon: Search },
  { href: "/vendors", label: "Vendors", icon: BarChart3 },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/timeline", label: "Reports", icon: Activity },
  { href: "/settings", label: "Settings", icon: Plug },
];

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 flex-col overflow-y-auto bg-[#070b14] p-4 md:flex ${collapsed ? "w-23" : "w-62.5"}`}
    >
      <div className="mb-4 flex justify-end px-1">
        <button
          type="button"
          onClick={onToggle}
          className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-slate-400 hover:text-white"
        >
          {collapsed ? "Open" : "Collapse"}
        </button>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "border-l-2 border-accent bg-white/10 pl-2.5 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
