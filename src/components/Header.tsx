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
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6">
        {/* Logo / Brand */}
        <Link to="/" className="group flex items-center gap-2" aria-label="Alla Nazionale — Home">
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-primary md:text-xl">
              Alla Nazionale
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold md:text-xs">
              Dal 1912
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LangSwitcher className="hidden sm:flex" />
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 lg:inline-flex"
          >
            {t("nav.cta")}
          </a>
          <button
            type="button"
            className="rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/40 bg-background lg:hidden">
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
            <div className="mt-2 flex items-center justify-between border-t border-border/40 pt-3">
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
