import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

type Category = {
  id: string;
  slug: string;
  title_it: string;
  title_en: string;
  sort_order: number;
};

export function AdminCategories() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ slug: "", title_it: "", title_en: "" });
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("gallery_categories")
      .select("*")
      .order("sort_order")
      .order("title_it");
    setItems((data ?? []) as Category[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!newItem.slug || !newItem.title_it) return;
    setCreating(true);
    const slug = newItem.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const { error } = await supabase.from("gallery_categories").insert({
      slug,
      title_it: newItem.title_it,
      title_en: newItem.title_en || newItem.title_it,
    });
    setCreating(false);
    if (error) return alert(error.message);
    setNewItem({ slug: "", title_it: "", title_en: "" });
    await load();
  };

  const update = async (item: Category) => {
    setSaving(item.id);
    const { error } = await supabase
      .from("gallery_categories")
      .update({
        title_it: item.title_it,
        title_en: item.title_en,
        sort_order: item.sort_order,
      })
      .eq("id", item.id);
    setSaving(null);
    if (error) alert(error.message);
  };

  const remove = async (id: string) => {
    if (!confirm("Eliminare questa categoria?")) return;
    const { error } = await supabase.from("gallery_categories").delete().eq("id", id);
    if (error) return alert(error.message);
    await load();
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground">Categorie della galleria</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Le categorie appaiono come filtri nella pagina Galleria e sono selezionabili quando carichi una foto.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground">Nuova categoria</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <input
            placeholder="Slug (es: matrimoni)"
            value={newItem.slug}
            onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            placeholder="Titolo IT"
            value={newItem.title_it}
            onChange={(e) => setNewItem({ ...newItem, title_it: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            placeholder="Titolo EN"
            value={newItem.title_en}
            onChange={(e) => setNewItem({ ...newItem, title_en: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={create}
          disabled={creating}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Aggiungi
        </button>
      </section>

      <section>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">Nessuna categoria ancora.</p>
        ) : (
          <div className="space-y-2">
            {items.map((it) => (
              <div key={it.id} className="rounded-xl border border-border bg-card p-4">
                <div className="grid gap-2 sm:grid-cols-[100px,1fr,1fr,80px,auto] sm:items-center">
                  <span className="rounded bg-muted px-2 py-1 text-center font-mono text-xs">{it.slug}</span>
                  <input
                    value={it.title_it}
                    onChange={(e) =>
                      setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, title_it: e.target.value } : p)))
                    }
                    className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                  <input
                    value={it.title_en}
                    onChange={(e) =>
                      setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, title_en: e.target.value } : p)))
                    }
                    className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                  <input
                    type="number"
                    value={it.sort_order}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((p) => (p.id === it.id ? { ...p, sort_order: Number(e.target.value) } : p)),
                      )
                    }
                    className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => update(it)}
                      disabled={saving === it.id}
                      className="rounded p-2 hover:bg-accent"
                      title="Salva"
                    >
                      {saving === it.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => remove(it.id)}
                      className="rounded p-2 text-destructive hover:bg-destructive/10"
                      title="Elimina"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
