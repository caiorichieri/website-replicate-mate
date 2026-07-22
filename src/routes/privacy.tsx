import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Alla Nazionale" },
      {
        name: "description",
        content:
          "Informativa privacy di Alla Nazionale ai sensi del Regolamento UE 2016/679 (GDPR). Titolare, finalità, base giuridica e diritti dell'interessato.",
      },
      { property: "og:title", content: "Privacy Policy — Alla Nazionale" },
      {
        property: "og:description",
        content: "Informativa privacy ai sensi del Regolamento UE 2016/679 (GDPR).",
      },
    ],
    links: [{ rel: "canonical", href: "https://allanazionale.friulion.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage eyebrow="Documento legale" title="Privacy Policy" updatedAt="22 luglio 2026">
      <p>
        La presente informativa è resa ai sensi dell'art. 13 del Regolamento (UE) 2016/679
        ("GDPR") e del D.lgs. 196/2003 e s.m.i. ("Codice Privacy") a coloro che
        interagiscono con il sito <strong>{CONTACT.siteUrl}</strong> ("Sito") relativo
        all'attività di <strong>Alla Nazionale</strong> ({CONTACT.city}, {CONTACT.country}).
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        Il Titolare del trattamento dei dati personali raccolti tramite il Sito è
        <strong> Friulion S.r.l.s.</strong>, con sede in Italia, P.IVA{" "}
        <strong>03157410303</strong>, in qualità di gestore tecnico del Sito per conto
        dell'esercente Alla Nazionale.
      </p>
      <p>
        Per qualsiasi richiesta relativa al trattamento dei dati è possibile scrivere a:{" "}
        <a href="mailto:info@friulion.it">info@friulion.it</a>.
      </p>
      <p>
        Per richieste operative relative all'attività di Alla Nazionale (prenotazioni,
        preventivi, eventi) è possibile scrivere a:{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>

      <h2>2. Tipologie di dati trattati</h2>
      <ul>
        <li>
          <strong>Dati di navigazione</strong>: indirizzo IP, tipo di browser, sistema
          operativo, pagine visitate, orari e durata delle visite. Tali dati vengono
          utilizzati al solo fine di ricavare informazioni statistiche anonime sull'uso
          del Sito e per controllarne il corretto funzionamento.
        </li>
        <li>
          <strong>Dati forniti volontariamente</strong>: nome, cognome, email, numero di
          telefono, tipologia di evento e messaggio, forniti tramite il modulo di
          contatto, WhatsApp o email.
        </li>
        <li>
          <strong>Cookie</strong>: si veda la{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </li>
      </ul>

      <h2>3. Finalità e base giuridica del trattamento</h2>
      <ul>
        <li>
          Rispondere alle richieste di preventivo, informazioni e prenotazione (base
          giuridica: esecuzione di misure precontrattuali — art. 6.1.b GDPR).
        </li>
        <li>
          Adempiere ad obblighi di legge, contabili e fiscali (base giuridica: obbligo
          legale — art. 6.1.c GDPR).
        </li>
        <li>
          Garantire la sicurezza e il corretto funzionamento del Sito (base giuridica:
          legittimo interesse — art. 6.1.f GDPR).
        </li>
      </ul>

      <h2>4. Modalità del trattamento e conservazione</h2>
      <p>
        I dati vengono trattati con strumenti informatici e telematici, con misure di
        sicurezza adeguate a garantirne riservatezza e integrità. I dati sono conservati
        per il tempo strettamente necessario alle finalità sopra indicate e comunque non
        oltre 24 mesi dall'ultimo contatto, salvo diverso obbligo di legge.
      </p>

      <h2>5. Destinatari dei dati</h2>
      <p>
        I dati potranno essere trattati da soggetti autorizzati, appositamente istruiti,
        e da fornitori terzi che agiscono in qualità di Responsabili del trattamento
        (hosting, invio email, servizi di analytics). L'elenco aggiornato è disponibile
        scrivendo al Titolare. I dati non vengono diffusi né ceduti a terzi per finalità
        commerciali.
      </p>

      <h2>6. Trasferimento dei dati extra UE</h2>
      <p>
        Alcuni fornitori tecnologici potrebbero avere sede in Paesi extra UE. In tal
        caso il trasferimento avverrà nel rispetto delle garanzie previste dagli
        artt. 45–49 GDPR (decisioni di adeguatezza o Clausole Contrattuali Standard).
      </p>

      <h2>7. Diritti dell'interessato</h2>
      <p>
        L'interessato può esercitare in qualsiasi momento i diritti previsti dagli
        artt. 15–22 GDPR: accesso, rettifica, cancellazione, limitazione, opposizione,
        portabilità e revoca del consenso. Le richieste vanno inviate a{" "}
        <a href="mailto:info@friulion.it">info@friulion.it</a>.
      </p>
      <p>
        È inoltre possibile proporre reclamo al Garante per la Protezione dei Dati
        Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).
      </p>

      <h2>8. Modifiche</h2>
      <p>
        Il Titolare si riserva di aggiornare la presente informativa. Le modifiche
        saranno pubblicate su questa pagina con indicazione della data di ultimo
        aggiornamento.
      </p>
    </LegalPage>
  );
}
