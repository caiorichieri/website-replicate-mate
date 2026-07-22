import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/termini")({
  head: () => ({
    meta: [
      { title: "Termini e condizioni — Alla Nazionale" },
      {
        name: "description",
        content:
          "Termini e condizioni d'uso del sito Alla Nazionale: proprietà intellettuale, limitazioni di responsabilità e legge applicabile.",
      },
      { property: "og:title", content: "Termini e condizioni — Alla Nazionale" },
      {
        property: "og:description",
        content: "Condizioni d'uso del sito, proprietà intellettuale e legge applicabile.",
      },
    ],
    links: [{ rel: "canonical", href: "https://allanazionale.friulion.app/termini" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage eyebrow="Documento legale" title="Termini e condizioni" updatedAt="22 luglio 2026">
      <p>
        L'accesso e l'utilizzo del sito <strong>{CONTACT.siteUrl}</strong> ("Sito")
        implicano l'accettazione integrale dei presenti termini e condizioni. Se non
        accetti quanto qui riportato, ti invitiamo a non utilizzare il Sito.
      </p>

      <h2>1. Titolarità del Sito</h2>
      <p>
        Il Sito è gestito da <strong>Friulion S.r.l.s.</strong> (P.IVA 03157410303) per
        conto dell'esercente <strong>Alla Nazionale</strong>, con sede in {CONTACT.city},{" "}
        {CONTACT.country}.
      </p>

      <h2>2. Contenuti del Sito</h2>
      <p>
        I contenuti del Sito (testi, immagini, marchi, loghi, grafiche) sono di
        proprietà di Alla Nazionale, di Friulion o dei rispettivi titolari e sono
        protetti dalla normativa vigente in materia di proprietà intellettuale. Ne è
        vietata la riproduzione, anche parziale, senza autorizzazione scritta.
      </p>

      <h2>3. Preventivi e prenotazioni</h2>
      <p>
        Le informazioni pubblicate sul Sito hanno carattere puramente informativo. I
        preventivi per eventi, catering e servizi vengono forniti in forma personalizzata
        a seguito di specifica richiesta e non costituiscono di per sé offerta al
        pubblico ai sensi dell'art. 1336 c.c.
      </p>

      <h2>4. Limitazione di responsabilità</h2>
      <p>
        Alla Nazionale e Friulion si impegnano a mantenere il Sito aggiornato e
        funzionante, ma non garantiscono l'assenza di interruzioni, errori o
        indisponibilità temporanee. Non si assumono responsabilità per danni diretti o
        indiretti derivanti dall'uso del Sito o dall'impossibilità di utilizzarlo.
      </p>

      <h2>5. Link a siti di terzi</h2>
      <p>
        Il Sito può contenere collegamenti a siti web di terze parti. Non siamo
        responsabili dei contenuti e delle politiche privacy di tali siti.
      </p>

      <h2>6. Legge applicabile e foro competente</h2>
      <p>
        I presenti termini sono regolati dalla legge italiana. Per qualsiasi
        controversia sarà competente in via esclusiva il Foro del luogo di residenza o
        domicilio del consumatore, se ubicato nel territorio dello Stato italiano; in
        tutti gli altri casi, il Foro competente sarà quello di Udine.
      </p>

      <h2>7. Contatti</h2>
      <p>
        Per qualsiasi comunicazione relativa ai presenti termini è possibile scrivere a{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> oppure, per aspetti
        tecnici e privacy, a <a href="mailto:info@friulion.it">info@friulion.it</a>.
      </p>
    </LegalPage>
  );
}
