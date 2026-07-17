
## Cambiamenti richiesti (dal documento)

### 1. Tema globale
- **Sfondo**: de preto → **amarelo claro cremoso (semi-transparente)** em todo o site (não só na home). Texto vira escuro (grafite/preto) para contraste. Amarelo do logo continua como accent para botões e destaques.
  - Base: `#FFF8E1` / `#FBF3D0` no `--background`, texto `#1A1A1A`.
  - Overlays sobre fotos passam de preto → âmbar translúcido quente.
- **Tipografia**: par serif display elegante + sans limpa, com toque festivo.
  - Títulos: **Fraunces** (serif moderna, editorial, com "opsz" para display)
  - Corpo: **Inter** ou **Manrope** (limpa, legível)
  - Load via `<link>` no `__root.tsx` (regra do stack).
- **Logo inicial centrado** no header (hoje está à esquerda).

### 2. Hero (home)
- Trocar foto de apresentação (foto nova do Drive).
- Novo texto principal:
  > "La nostra location per celebrare, brindare i tuoi traguardi e creare ricordi indimenticabili. Dai gender reveal, ai 18esimi, alla laurea e alle feste di pensionamento."
- Manter os dois botões (Organizza il tuo evento / Scopri di più).
- Ajustar contraste dos botões ao novo fundo claro.

### 3. Bug mobile (crítico)
- **Bug 1**: no celular o site abre no rodapé, precisa rolar para cima.
  - Causa provável: `scroll-restoration` ou algum `scrollIntoView` em componente com auto-animação. Investigar `__root.tsx`, o `EventPopup`, e ancoragens `#hash` nos `<Link>`. Vou forçar `window.scrollTo(0,0)` no mount da rota e remover triggers.
- **Bug 2**: menu (barras) do topo à direita só abre quando está no topo da página.
  - Causa provável: o header muda de estado no scroll e o botão do menu perde `pointer-events` ou fica atrás de outro overlay quando o header colapsa. Vou revisar `Header.tsx` z-index e o comportamento do sheet no scrollado.

### 4. Seção "Storia" (Dal 1912)
- Trocar foto (nova do Drive).
- **Remover totalmente o painel direito** com o bloco "DAL 1912. SEMPRE IN FESTA." + stats (112 anni / 5+ generazioni / 2000 m² / ∞).
- Substituir por **texto único** sobreposto/ao lado da foto grande full-bleed:
  > "Il bar ha una storia che va oltre il secolo, tramandata di generazione in generazione fino all'attuale gestione della Sig.ra Alberta Cinelli insieme alle sue due figlie Alessandra e Angelica. Il locale vanta una licenza storica risalente al 1912 per il servizio di bar (colazione, brioche e aperitivi) e dal 2022 ha deciso di specializzarsi, ristrutturando e ampliando la vecchia tappezzeria di famiglia in una nuova sala eventi. L'idea che la famiglia vuole portare avanti attraverso l'affitto della nuova location è quella di far vivere al festeggiato la sua occasione intensamente, senza pensieri. All'organizzazione, al buffet, alla somministrazione e all'allestimento ci pensiamo noi!"
- Layout full-bleed cinematográfico permanece, só perde o painel de stats.

### 5. Seção "Spazi / Personalizzazione"
- Substituir texto atual por:
  > "Personalizziamo ogni evento nei minimi dettagli: dai buffet gourmet, ai paninetti per i bambini, dagli eventi formali a quelli informali."

### 6. Fotos novas
- Você me envia as fotos do Drive **antes de eu começar** (conforme sua resposta). Vou usar Lovable Assets (CDN) para não pesar o repo. Mínimo necessário para começar:
  - 1 foto hero nova (paisagem, alta resolução)
  - 1 foto da seção Storia (a equipe / o local)
  - Outras fotos que quiser atualizar em galeria (opcional nessa etapa)

---

## Ordem de execução técnica

1. **Fontes + tokens**: `__root.tsx` (link Fraunces+Inter) e `styles.css` (novo `@theme`: background creme, foreground escuro, primary amarelo mantido, overlays âmbar).
2. **Header**: logo centrado, corrigir z-index/pointer-events do menu mobile.
3. **Bug mobile scroll**: forçar scroll-to-top no mount da rota e revisar o `EventPopup` para não deslocar o layout.
4. **Home Hero**: novo texto + nova foto + botões adaptados ao tema claro.
5. **Home Storia**: remover painel de stats, substituir pelo texto único, nova foto.
6. **Home Spazi**: substituir texto.
7. **Revisar demais páginas** (chi-siamo, spazi, eventi, galleria, contatti) para consistência com o tema claro (sem redesenhar, só adaptar cores).
8. **Build check** para garantir que nenhum `text-white`/`bg-black` hardcoded quebrou no tema claro.

---

## O que **não** vou mexer (a menos que você peça)
- Estrutura de rotas.
- Conteúdo das outras páginas além da adaptação de cores.
- WhatsApp float, popup de evento, footer (só cores).
- Copy em inglês (só os trechos italianos citados no docx foram alterados).

---

## Próximo passo
Aprove o plano e **me envie as fotos do Drive** na próxima mensagem (arrastar direto no chat). Assim que aprovar + fotos chegarem, executo tudo.
