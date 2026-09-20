"use client";

import Link from "next/link";
import { Bell, Menu, Moon, Shield } from "lucide-react";

export function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-white/5 bg-[#070b14]/95 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-sm font-semibold">AegisOSINT</span>
        </Link>
        <button
          type="button"
          className="hidden rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 sm:inline-flex"
        >
          Quick Filter
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <Link
          href="/investigate"
          className="hidden rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-accent-hover sm:inline-flex"
        >
          New Investigation
        </Link>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-slate-300 lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Org: Sentinel Labs
        </div>
        <button
          type="button"
          className="hidden items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-slate-300 sm:flex"
        >
          <Moon className="h-3.5 w-3.5" />
          Theme
        </button>
        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-slate-300"
          aria-label="Alerts"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 pl-1">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[11px] font-semibold">
            SL
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-medium">Sofia Laurent</p>
            <p className="text-[10px] text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
