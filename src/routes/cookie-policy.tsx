import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Alla Nazionale" },
      {
        name: "description",
        content:
          "Informazioni sui cookie utilizzati dal sito Alla Nazionale, finalità, durata e modalità di gestione delle preferenze.",
      },
      { property: "og:title", content: "Cookie Policy — Alla Nazionale" },
      {
        property: "og:description",
        content: "Cookie utilizzati, finalità, durata e come gestire le preferenze.",
      },
    ],
    links: [{ rel: "canonical", href: "https://allanazionale.friulion.app/cookie-policy" }],
  }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <LegalPage eyebrow="Documento legale" title="Cookie Policy" updatedAt="22 luglio 2026">
      <p>
        La presente Cookie Policy descrive le tipologie di cookie e tecnologie simili
        utilizzate dal sito Alla Nazionale, le finalità del loro utilizzo e come
        l'utente può gestirle. Per informazioni complete sul trattamento dei dati
        personali si rimanda alla <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti visitati inviano al terminale
        dell'utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi
        siti alla visita successiva. Tecnologie simili (pixel, local storage, SDK)
        possono essere utilizzate per finalità analoghe.
      </p>

      <h2>2. Tipologie di cookie utilizzati</h2>

      <h3>Cookie tecnici (sempre attivi)</h3>
      <p>
        Necessari al corretto funzionamento del sito. Non richiedono il consenso
        dell'utente. Includono cookie di sessione, cookie per la memorizzazione della
        lingua preferita e della sessione autenticata dell'area amministrativa.
      </p>

      <h3>Cookie analitici anonimizzati</h3>
      <p>
        Utilizzati per raccogliere informazioni aggregate sul numero di visitatori e
        sulle pagine più visitate. Se configurati con IP anonimizzato e senza
        condivisione dei dati con terzi, sono assimilabili ai cookie tecnici.
      </p>

      <h3>Cookie di terze parti</h3>
      <p>
        Il sito può integrare contenuti di terze parti (es. Google Fonts, mappe,
        pulsanti social, WhatsApp) che possono impostare propri cookie. Per maggiori
        informazioni si rimanda alle rispettive privacy policy.
      </p>

      <h2>3. Come gestire le preferenze</h2>
      <p>
        L'utente può in qualsiasi momento modificare o revocare il consenso all'uso dei
        cookie tramite le impostazioni del proprio browser. Di seguito i link alle
        istruzioni ufficiali:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
            Google Chrome
          </a>
        </li>
        <li>
          <a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer">
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
            Safari
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener noreferrer">
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>4. Titolare del trattamento</h2>
      <p>
        Titolare del trattamento dei dati raccolti tramite cookie è Friulion S.r.l.s.,
        P.IVA 03157410303. Per contatti: <a href="mailto:info@friulion.it">info@friulion.it</a>.
      </p>

      <h2>5. Aggiornamenti</h2>
      <p>
        La presente Cookie Policy può essere soggetta ad aggiornamenti. Si invita
        l'utente a consultare periodicamente questa pagina.
      </p>
    </LegalPage>
  );
}
