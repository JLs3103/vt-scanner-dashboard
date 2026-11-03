"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Globe2, Shield } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createAccount = async (event: FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const password = String(form.get("password") || "");
    const confirmation = String(form.get("confirmation") || "");
    const email = String(form.get("email") || "");

    const fullName = String(form.get("name") || "").trim();
    const termsAccepted = form.get("terms") === "on";
    if (fullName.length < 2 || !email.includes("@") || password.length < 8 || password !== confirmation || !termsAccepted) {
      setFormError("Use a valid email, an 8-character password, and matching passwords.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email: email.trim(), password }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Unable to create account.");
      }
      router.push("/signin");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#070b14] text-slate-100">
      <div className="grid min-h-dvh w-full gap-4 lg:grid-cols-2">
        <section className="bg-[#0e1626] p-8 shadow-2xl lg:min-h-dvh">
          <div className="mb-8 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 text-white"><Shield className="h-5 w-5 text-accent" /><span className="font-semibold">AegisOSINT</span></div>
            <span>Threat Intelligence Platform</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Create your AegisOSINT account</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Request secure access to investigations, threat timelines, reports and integrations.</p>
          <form className="mt-7 space-y-3" onSubmit={createAccount} noValidate>
            <label className="block text-sm">Full name<input name="name" required placeholder="Sofia Laurent" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20" /></label>
            <label className="block text-sm">Work email<input name="email" type="email" required placeholder="you@domain.com" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20" /></label>
            <label className="block text-sm">Password<div className="relative mt-2"><input name="password" type={showPassword ? "text" : "password"} required placeholder="At least 8 characters" className="h-11 w-full rounded-xl border border-white/15 bg-transparent px-3 pr-11 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} title={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-100">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
            <label className="block text-sm">Confirm password<div className="relative mt-2"><input name="confirmation" type={showConfirmation ? "text" : "password"} required placeholder="Repeat your password" className="h-11 w-full rounded-xl border border-white/15 bg-transparent px-3 pr-11 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20" /><button type="button" onClick={() => setShowConfirmation((visible) => !visible)} aria-label={showConfirmation ? "Hide confirmation password" : "Show confirmation password"} title={showConfirmation ? "Hide confirmation password" : "Show confirmation password"} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-100">{showConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
            <label className="flex items-start gap-2 pt-1 text-xs text-slate-300"><input name="terms" type="checkbox" required className="mt-0.5 accent-teal-400" />I agree to the AegisOSINT Terms and Privacy Policy.</label>
            {formError && <p className="text-xs text-rose-300">{formError}</p>}
            <button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-full bg-accent text-sm font-semibold text-slate-950 transition-all hover:bg-accent-hover hover:shadow-[0_10px_30px_rgba(45,212,191,0.24)] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Creating account..." : "Create account"}</button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-white/10" />or continue with<span className="h-px flex-1 bg-white/10" /></div>
          <button type="button" onClick={() => router.push("/signin")} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 py-2 text-xs text-slate-200 transition-colors hover:border-white/40 hover:bg-white/5"><Globe2 className="h-3.5 w-3.5" /> Google</button>
          <p className="mt-6 text-center text-xs text-slate-400">Already have an account? <Link href="/signin" className="text-slate-300 hover:text-accent">Sign in</Link></p>
        </section>
        <section className="bg-[#0e1626] p-8 shadow-2xl lg:min-h-dvh"><div className="flex h-full flex-col justify-center"><p className="text-xs uppercase tracking-[0.2em] text-accent">Secure access request</p><h2 className="mt-3 text-3xl font-semibold">Built for focused threat investigations.</h2><p className="mt-4 max-w-md text-sm leading-6 text-slate-400">Keep IP intelligence, vendor telemetry, timelines and response workflows in one controlled workspace.</p><div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm font-medium">Protected workspace</p><p className="mt-1 text-xs text-slate-400">Role-aware access for security teams.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm font-medium">Actionable context</p><p className="mt-1 text-xs text-slate-400">Connect indicators with vendor verdicts.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm font-medium">Operational clarity</p><p className="mt-1 text-xs text-slate-400">Move from signal to response quickly.</p></div></div></div></section>
      </div>
    </div>
  );
}
