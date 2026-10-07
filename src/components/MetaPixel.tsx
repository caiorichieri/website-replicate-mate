import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { getCookieConsent, type CookieConsent } from "./CookieBanner";

const PIXEL_ID = "2107677746812527";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

function loadPixel() {
  if (window.fbq) return;
  /* eslint-disable */
  (function (f: any, b: any, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", PIXEL_ID);
}

export function MetaPixel() {
  const { pathname } = useLocation();

  useEffect(() => {
    const apply = (c: CookieConsent | null) => {
      if (c?.marketing) {
        loadPixel();
        window.fbq("consent", "grant");
        window.fbq("track", "PageView");
      } else if (window.fbq) {
        window.fbq("consent", "revoke");
      }
    };
    apply(getCookieConsent());
    const handler = (e: Event) => apply((e as CustomEvent).detail);
    window.addEventListener("cookie-consent-changed", handler);
    return () => window.removeEventListener("cookie-consent-changed", handler);
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (getCookieConsent()?.marketing && window.fbq) window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}
