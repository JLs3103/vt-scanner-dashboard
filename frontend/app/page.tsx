"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GitFork, Globe2, Monitor, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("you@domain.com");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [previewEnabled, setPreviewEnabled] = useState(true);

  const enter = (event?: FormEvent) => {
    event?.preventDefault();

    if (!email.includes("@") || !password) {
      setFormError("Enter a valid email and password to continue.");
      return;
    }

    setFormError("");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-dvh bg-[#070b14] text-slate-100">
      <div className="grid min-h-dvh w-full gap-4 lg:grid-cols-2">
        <section className="bg-[#0e1626] p-8 shadow-2xl lg:min-h-dvh">
          <div className="mb-8 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-accent" />
              <span className="font-semibold">AegisOSINT</span>
            </div>
            <span>Threat Intelligence Platform</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back to AegisOSINT</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Sign in to access IP investigations, threat timelines, charts and integrations.
          </p>
          <form className="mt-7 space-y-3" onSubmit={enter} noValidate>
            <label className="block text-sm">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(formError && !email.includes("@"))}
                className={`mt-2 h-11 w-full rounded-xl border bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20 ${formError && !email.includes("@") ? "border-rose-400/80 focus:border-rose-400 focus:ring-rose-400/20" : "border-white/15"}`}
              />
            </label>
            <label className="block text-sm">
              Password
              <div className="relative mt-2">
                <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(formError && !password)}
                className={`h-11 w-full rounded-xl border bg-transparent px-3 pr-11 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20 ${formError && !password ? "border-rose-400/80 focus:border-rose-400 focus:ring-rose-400/20" : "border-white/15"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition-colors hover:text-slate-100"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" className="accent-teal-400" />
                Remember me
              </label>
              <button type="button" className="cursor-pointer text-slate-400 transition-colors hover:text-accent">
                Forgot password?
              </button>
            </div>
            {formError && <p className="text-xs text-rose-300">{formError}</p>}
            <button
              type="submit"
              className="h-11 w-full cursor-pointer rounded-full bg-accent text-sm font-semibold text-slate-950 shadow-[0_8px_24px_rgba(45,212,191,0.12)] transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_10px_30px_rgba(45,212,191,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1626]"
            >
              Sign in
            </button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            or continue with
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["GitHub", "Google", "Microsoft"].map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => enter()}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 py-2 text-xs text-slate-200 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                {provider === "GitHub" && <GitFork className="h-3.5 w-3.5 text-slate-100" />}
                {provider === "Google" && <Globe2 className="h-3.5 w-3.5 text-slate-100" />}
                {provider === "Microsoft" && <Monitor className="h-3.5 w-3.5 text-slate-100" />}
                {provider}
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <button type="button" className="cursor-pointer text-slate-300 transition-colors hover:text-accent" onClick={() => enter()}>
              Request access
            </button>
          </p>
          <p className="mt-4 text-center text-xs text-slate-500">
            By signing in you agree to AegisOSINT&apos;s{" "}
            <span className="text-slate-300">Terms</span> and{" "}
            <span className="text-slate-300">Privacy Policy</span>
          </p>
          <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
            <span>© 2026 AegisOSINT · All rights reserved</span>
            <span>Privacy · Terms</span>
          </div>
        </section>

        <section className="bg-[#0e1626] p-8 shadow-2xl lg:min-h-dvh">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Dashboard Preview</h2>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                A quick preview of the interface you&apos;ll enter: a left sidebar and top header
                with quick actions.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-[#0a1220]">
            <div className="grid h-44 place-items-center bg-[radial-gradient(circle_at_30%_20%,#134e4a,transparent_35%),radial-gradient(circle_at_80%_80%,#1e293b,transparent_40%)]">
              <div className="grid grid-cols-3 gap-3 opacity-80">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-16 w-12 rounded-lg border border-white/10 bg-white/5 shadow-inner"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div className="h-3 w-2/3 rounded bg-white/10" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 rounded-xl bg-white/5" />
                <div className="h-16 rounded-xl bg-white/5" />
                <div className="h-16 rounded-xl bg-white/5" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm">
            <div>
              <p className="font-medium">Preview Dashboard Layout</p>
              <p className="text-xs text-slate-400">Sidebar + Header</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={previewEnabled}
                aria-label="Toggle dashboard preview"
                title={previewEnabled ? "Dashboard preview enabled" : "Dashboard preview disabled"}
                onClick={() => setPreviewEnabled((enabled) => !enabled)}
                className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${previewEnabled ? "bg-accent hover:bg-accent-hover" : "bg-slate-600 hover:bg-slate-500"}`}
              >
                <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${previewEnabled ? "translate-x-4" : "translate-x-0"}`} />
              </button>
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                Open demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
