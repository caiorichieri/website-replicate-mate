import { useI18n, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  const buttonBase =
    "px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors rounded";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {(["it", "en"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-label={`Switch language to ${code.toUpperCase()}`}
          className={cn(
            buttonBase,
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
