import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LangSwitcher } from "./LangSwitcher";
import { whatsappUrl } from "@/lib/contact";

const NAV_ITEMS = [
  { to: "/", key: "nav.home" },
  { to: "/chi-siamo", key: "nav.about" },
  { to: "/eventi", key: "nav.events" },
  { to: "/spazi", key: "nav.spaces" },
  { to: "/galleria", key: "nav.gallery" },
  { to: "/contatti", key: "nav.contact" },
] as const;

export function Header() {
  const { t } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container relative mx-auto flex h-16 items-center px-4 md:h-20 md:px-6">
        {/* Left slot (desktop nav) */}
        <nav className="hidden flex-1 items-center gap-1 lg:flex" aria-label="Main">
          {NAV_ITEMS.slice(0, 3).map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-foreground/80 hover:text-primary",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Center: Logo / Brand */}
        <Link
          to="/"
          className="group absolute left-1/2 -translate-x-1/2 flex items-center gap-2 lg:static lg:translate-x-0"
          aria-label="Alla Nazionale — Home"
        >
          <div className="flex flex-col items-center leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-foreground md:text-2xl">
              Alla Nazionale
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.25em] text-gold md:text-xs">
              Dal 1912
            </span>
          </div>
        </Link>

        {/* Right slot (desktop nav + CTA) */}
        <nav className="hidden flex-1 items-center justify-end gap-1 lg:flex" aria-label="Main secondary">
          {NAV_ITEMS.slice(3).map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-foreground/80 hover:text-primary",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <LangSwitcher className="ml-2" />
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {t("nav.cta")}
          </a>
        </nav>

        {/* Mobile: burger on the right */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LangSwitcher className="hidden sm:flex" />
          <button
            type="button"
            className="relative z-10 rounded-md p-2 text-foreground hover:bg-secondary"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-border/60 bg-background shadow-lg lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-primary"
                      : "text-foreground/80 hover:bg-secondary hover:text-primary",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-3">
              <LangSwitcher />
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                {t("nav.cta")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
