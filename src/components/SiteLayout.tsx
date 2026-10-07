import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { EventPopup } from "./EventPopup";
import { CookieBanner } from "./CookieBanner";
import { MetaPixel } from "./MetaPixel";

/**
 * Fix per mobile: alcune combinazioni di SSR + hash restoration facevano
 * aprire la pagina scrollata in fondo. Forziamo scroll top ad ogni cambio rotta
 * e all'idratazione iniziale, senza smooth per evitare "jump" visibile.
 */
function useScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Se c'è un hash, lascia che il browser gestisca lo scroll all'ancora.
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  useScrollToTopOnRouteChange();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <EventPopup />
      <CookieBanner />
      <MetaPixel />
    </div>
  );
}
