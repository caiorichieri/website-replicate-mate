import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/use-admin";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Accesso — Alla Nazionale" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAdminSession();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) setError(error.message);
      else navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      setBusy(false);
      if (error) setError(error.message);
      else setInfo("Account creato. Comunica la tua email per ricevere i permessi admin.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="font-display text-2xl font-bold text-foreground">Area riservata</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Accedi per gestire il sito." : "Crea il tuo account."}
        </p>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        {info && <p className="mt-3 text-sm text-emerald-700">{info}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {busy ? "..." : mode === "login" ? "Accedi" : "Crea account"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
            setInfo(null);
          }}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
        </button>
      </form>
    </div>
  );
}
