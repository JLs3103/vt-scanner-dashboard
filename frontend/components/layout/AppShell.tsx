"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  LayoutDashboard,
  Plug,
  Search,
  X,
} from "lucide-react";

const mobileItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/investigate", label: "Investigate IP", icon: Search },
  { href: "/vendors", label: "Vendors", icon: BarChart3 },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/timeline", label: "Reports", icon: Activity },
  { href: "/settings", label: "Settings", icon: Plug },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <TopBar onMenu={() => setMobileOpen(true)} />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <main className="min-w-0 flex-1 px-4 pb-8 md:px-6">{children}</main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div className="relative h-full w-72 bg-[#0e1626] p-4">
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {mobileItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                      active ? "border-l-2 border-accent bg-white/10 pl-2.5 text-white" : "text-slate-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
