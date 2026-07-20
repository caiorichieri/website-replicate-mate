import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/use-admin";
import { LogOut, Loader2 } from "lucide-react";
import { AdminPhotos } from "@/components/admin/AdminPhotos";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminPopup } from "@/components/admin/AdminPopup";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Alla Nazionale" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Tab = "photos" | "categories" | "popup";

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAdminSession();
  const [tab, setTab] = useState<Tab>("photos");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Accesso non autorizzato</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Il tuo account non ha i permessi di amministratore.
          </p>
          <button
            onClick={signOut}
            className="mt-6 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Esci
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "photos", label: "Foto" },
    { id: "categories", label: "Categorie" },
    { id: "popup", label: "Popup" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Admin</p>
            <h1 className="font-display text-xl font-bold text-foreground">Alla Nazionale</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Vai al sito
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent"
            >
              <LogOut className="h-4 w-4" /> Esci
            </button>
          </div>
        </div>
        <div className="container mx-auto flex gap-1 px-4 md:px-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {tab === "photos" && <AdminPhotos />}
        {tab === "categories" && <AdminCategories />}
        {tab === "popup" && <AdminPopup />}
      </main>
    </div>
  );
}
