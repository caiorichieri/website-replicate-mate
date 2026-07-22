import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, Loader2, Star } from "lucide-react";

type Photo = {
  id: string;
  storage_path: string;
  url: string;
  alt_it: string;
  alt_en: string;
  category_slugs: string[];
  featured: boolean;
  sort_order: number;
};

type Category = { slug: string; title_it: string };

// URL firmato con durata lunga (~1 anno)
const SIGNED_URL_SECONDS = 60 * 60 * 24 * 365;

export function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      supabase.from("gallery_photos").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("gallery_categories").select("slug,title_it").order("title_it"),
    ]);
    setPhotos((p.data ?? []) as Photo[]);
    setCats((c.data ?? []) as Category[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const up = await supabase.storage.from("gallery").upload(path, file, {
        contentType: file.type,
        cacheControl: "31536000",
      });
      if (up.error) {
        alert(up.error.message);
        continue;
      }
      const signed = await supabase.storage.from("gallery").createSignedUrl(path, SIGNED_URL_SECONDS);
      if (signed.error || !signed.data) {
        alert(signed.error?.message ?? "Errore signed URL");
        continue;
      }
      const ins = await supabase.from("gallery_photos").insert({
        storage_path: path,
        url: signed.data.signedUrl,
        alt_it: "",
        alt_en: "",
        category_slugs: [],
      });
      if (ins.error) alert(ins.error.message);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    await load();
  };

  const patch = async (id: string, changes: Partial<Photo>) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
    const { error } = await supabase.from("gallery_photos").update(changes).eq("id", id);
    if (error) {
      alert(error.message);
      await load();
    }
  };

  const remove = async (photo: Photo) => {
    if (!confirm("Eliminare questa foto?")) return;
    await supabase.storage.from("gallery").remove([photo.storage_path]);
    await supabase.from("gallery_photos").delete().eq("id", photo.id);
    await load();
  };

  const toggleCat = (photo: Photo, slug: string) => {
    const has = photo.category_slugs.includes(slug);
    const next = has ? photo.category_slugs.filter((s) => s !== slug) : [...photo.category_slugs, slug];
    patch(photo.id, { category_slugs: next });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground">Foto della galleria</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Le foto qui aggiunte compaiono nella pagina Galleria del sito. Assegna una o più categorie a ogni foto.
        </p>
      </section>

      <section className="rounded-xl border-2 border-dashed border-border bg-card p-6 text-center">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Caricamento..." : "Carica foto"}
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          Puoi selezionare più foto insieme. JPG/PNG/WEBP.
        </p>
      </section>

      {cats.length === 0 && (
        <p className="rounded-lg bg-yellow-500/10 p-3 text-sm text-yellow-800">
          Suggerimento: crea prima le categorie nella scheda "Categorie" per poterle assegnare alle foto.
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : photos.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">Nessuna foto ancora.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {photos.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-video bg-muted">
                <img src={p.url} alt={p.alt_it} className="h-full w-full object-cover" />
                <button
                  onClick={() => patch(p.id, { featured: !p.featured })}
                  className={`absolute right-2 top-2 rounded-full p-1.5 backdrop-blur ${
                    p.featured ? "bg-primary text-primary-foreground" : "bg-black/50 text-white"
                  }`}
                  title="In evidenza"
                >
                  <Star className={`h-4 w-4 ${p.featured ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="space-y-3 p-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    placeholder="Descrizione IT"
                    value={p.alt_it}
                    onChange={(e) => setPhotos((prev) => prev.map((x) => (x.id === p.id ? { ...x, alt_it: e.target.value } : x)))}
                    onBlur={(e) => patch(p.id, { alt_it: e.target.value })}
                    className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                  <input
                    placeholder="Description EN"
                    value={p.alt_en}
                    onChange={(e) => setPhotos((prev) => prev.map((x) => (x.id === p.id ? { ...x, alt_en: e.target.value } : x)))}
                    onBlur={(e) => patch(p.id, { alt_en: e.target.value })}
                    className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Categorie <span className="font-normal normal-case tracking-normal text-muted-foreground/70">— clicca per aggiungere o rimuovere</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cats.map((c) => {
                      const active = p.category_slugs.includes(c.slug);
                      return (
                        <button
                          key={c.slug}
                          onClick={() => toggleCat(p, c.slug)}
                          title={active ? "Rimuovi da questa categoria" : "Aggiungi a questa categoria"}
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                            active
                              ? "border-primary bg-primary text-primary-foreground hover:bg-destructive hover:border-destructive"
                              : "border-border text-muted-foreground hover:border-primary"
                          }`}
                        >
                          {c.title_it}
                          {active && <span aria-hidden className="text-[10px] leading-none">✕</span>}
                        </button>
                      );
                    })}
                  </div>
                  {p.category_slugs.length > 0 && (
                    <button
                      onClick={() => patch(p.id, { category_slugs: [] })}
                      className="mt-2 text-xs text-destructive hover:underline"
                    >
                      Rimuovi da tutte le categorie
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    Ordine:
                    <input
                      type="number"
                      value={p.sort_order}
                      onChange={(e) => setPhotos((prev) => prev.map((x) => (x.id === p.id ? { ...x, sort_order: Number(e.target.value) } : x)))}
                      onBlur={(e) => patch(p.id, { sort_order: Number(e.target.value) })}
                      className="w-16 rounded-md border border-border bg-background px-2 py-1 text-sm"
                    />
                  </label>
                  <button
                    onClick={() => remove(p)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Elimina
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
