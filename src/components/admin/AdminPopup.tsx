import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, Upload, X } from "lucide-react";

type Popup = {
  id: number;
  enabled: boolean;
  title_it: string;
  title_en: string;
  text_it: string;
  text_en: string;
  cta_it: string;
  cta_en: string;
  dismiss_it: string;
  dismiss_en: string;
  image_url: string | null;
  link_type: "whatsapp" | "url";
  link_value: string;
  delay_ms: number;
};

const SIGNED_URL_SECONDS = 60 * 60 * 24 * 365;

export function AdminPopup() {
  const [data, setData] = useState<Popup | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("popup_settings").select("*").eq("id", 1).maybeSingle();
    setData(data as Popup | null);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    const { error } = await supabase.from("popup_settings").update({
      enabled: data.enabled,
      title_it: data.title_it,
      title_en: data.title_en,
      text_it: data.text_it,
      text_en: data.text_en,
      cta_it: data.cta_it,
      cta_en: data.cta_en,
      dismiss_it: data.dismiss_it,
      dismiss_en: data.dismiss_en,
      image_url: data.image_url,
      link_type: data.link_type,
      link_value: data.link_value,
      delay_ms: data.delay_ms,
    }).eq("id", 1);
    setSaving(false);
    if (error) alert(error.message);
    else alert("Salvato!");
  };

  const uploadImage = async (file: File | null) => {
    if (!file || !data) return;
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `popup/${Date.now()}.${ext}`;
    const up = await supabase.storage.from("gallery").upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: true,
    });
    if (up.error) {
      alert(up.error.message);
      setUploading(false);
      return;
    }
    const signed = await supabase.storage.from("gallery").createSignedUrl(path, SIGNED_URL_SECONDS);
    setUploading(false);
    if (signed.error || !signed.data) return alert("Errore signed URL");
    setData({ ...data, image_url: signed.data.signedUrl });
  };

  if (loading || !data) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground">Popup del sito</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Il popup appare automaticamente ai visitatori dopo qualche secondo. Puoi disattivarlo, modificare i testi, cambiare
          l'immagine e scegliere se il pulsante porta al WhatsApp o a un link esterno.
        </p>
      </section>

      <section className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <label className="flex flex-1 items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.enabled}
            onChange={(e) => setData({ ...data, enabled: e.target.checked })}
            className="h-5 w-5"
          />
          <span className="font-semibold text-foreground">
            Popup {data.enabled ? "attivo" : "disattivato"}
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Ritardo (ms):
          <input
            type="number"
            value={data.delay_ms}
            onChange={(e) => setData({ ...data, delay_ms: Number(e.target.value) })}
            className="w-24 rounded-md border border-border bg-background px-2 py-1 text-sm"
          />
        </label>
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground">Immagine</h3>
        {data.image_url ? (
          <div className="relative inline-block">
            <img src={data.image_url} alt="" className="max-h-48 rounded-lg" />
            <button
              onClick={() => setData({ ...data, image_url: null })}
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nessuna immagine (verrà usata quella di default).</p>
        )}
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => uploadImage(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Cambia immagine
          </button>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
        <div>
          <h3 className="font-semibold text-foreground">Italiano</h3>
          <Field label="Titolo" value={data.title_it} onChange={(v) => setData({ ...data, title_it: v })} />
          <Field label="Testo" value={data.text_it} onChange={(v) => setData({ ...data, text_it: v })} multiline />
          <Field label="Testo pulsante" value={data.cta_it} onChange={(v) => setData({ ...data, cta_it: v })} />
          <Field label="Chiudi" value={data.dismiss_it} onChange={(v) => setData({ ...data, dismiss_it: v })} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Inglese</h3>
          <Field label="Title" value={data.title_en} onChange={(v) => setData({ ...data, title_en: v })} />
          <Field label="Text" value={data.text_en} onChange={(v) => setData({ ...data, text_en: v })} multiline />
          <Field label="Button" value={data.cta_en} onChange={(v) => setData({ ...data, cta_en: v })} />
          <Field label="Dismiss" value={data.dismiss_en} onChange={(v) => setData({ ...data, dismiss_en: v })} />
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground">Destinazione del pulsante</h3>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.link_type === "whatsapp"}
              onChange={() => setData({ ...data, link_type: "whatsapp" })}
            />
            WhatsApp (usa il numero del sito)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.link_type === "url"}
              onChange={() => setData({ ...data, link_type: "url" })}
            />
            Link personalizzato
          </label>
        </div>
        {data.link_type === "whatsapp" ? (
          <input
            placeholder="Messaggio precompilato (opzionale)"
            value={data.link_value}
            onChange={(e) => setData({ ...data, link_value: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        ) : (
          <input
            placeholder="https://..."
            value={data.link_value}
            onChange={(e) => setData({ ...data, link_value: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        )}
      </section>

      <div className="sticky bottom-4 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Salva
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="mt-3 block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      )}
    </label>
  );
}
