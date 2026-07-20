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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message);
    else navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="font-display text-2xl font-bold text-foreground">Area riservata</h1>
        <p className="mt-1 text-sm text-muted-foreground">Accedi per gestire il sito.</p>
        <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {busy ? "..." : "Accedi"}
        </button>
      </form>
    </div>
  );
}
