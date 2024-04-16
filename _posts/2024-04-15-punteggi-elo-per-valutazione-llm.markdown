---
layout: post
title:  "Punteggi Elo per la valutazione degli LLM"
date:   2024-04-15
slug: elo-1
permalink: /punteggi-elo-per-valutazione-llm
---
Il **punteggio Elo** è un metodo matematico per calcolare il livello relativo di abilità dei giocatori in giochi competitivi come scacchi, go, videogiochi e sport come il calcio e il basket. Ideato da Arpad Elo, un professore di fisica e maestro di scacchi di origine ungherese, questo sistema è stato originariamente creato per migliorare il sistema di classificazione degli scacchisti.

### Come funziona il sistema di punteggio Elo:

1. **Base Iniziale**: Ogni giocatore inizia con un punteggio di base, comunemente 1500 punti, ma questo può variare a seconda dell'organizzazione che gestisce la competizione.

2. **Aggiustamenti Basati sui Risultati**: Dopo ogni partita, punti vengono trasferiti dal perdente al vincitore. La quantità di punti trasferiti dipende da due fattori:
   - **Probabilità Prevista di Vincere**: Calcolata basandosi sui punteggi attuali dei due avversari. Se il vincitore era già considerato molto più forte, guadagnerà pochi punti. Se invece vince contro un avversario molto più forte, guadagnerà molti più punti.
   - **Risultato Effettivo**: Vincita, perdita, o pareggio.

3. **Formula di Aggiustamento**: La formula usata per determinare il cambiamento nel punteggio è generalmente una variazione della seguente:
   \[
   R' = R + K \times (S - E)
   \]
   dove \( R' \) è il nuovo rating, \( R \) il rating precedente, \( K \) un fattore moltiplicativo (che varia in base alla competizione e spesso dipende dal rating del giocatore), \( S \) il risultato della partita (1 per una vittoria, 0.5 per un pareggio, 0 per una sconfitta), e \( E \) la probabilità prevista di vincere (calcolata tramite una funzione matematica che dipende dalla differenza dei punteggi).

### Applicazioni del punteggio Elo:
- **Scacchi**: È ampiamente utilizzato per classificare i giocatori di scacchi. Il sistema di rating FIDE, che classifica i giocatori di scacchi internazionali, è basato sul punteggio Elo.
- **Sport**: Alcuni campionati sportivi utilizzano variazioni del sistema Elo per classificare le squadre o gli atleti.
- **Videogiochi**: Giochi competitivi e piattaforme online spesso adottano sistemi basati su Elo per abbinare i giocatori di abilità simile, come nel caso degli scacchi online, League of Legends e altri giochi eSports.
- **Ricerca Accademica**: Il sistema viene utilizzato anche in ambiti di ricerca per modellare le competizioni e prevedere i risultati.

## Esempio pratico: Risultati degli Aggiornamenti del Punteggio Elo

### Scenario 1: Vincita del Giocatore A (Elo iniziale 1500)
- **Nuovo Elo del Giocatore A**: 1508
- **Nuovo Elo del Giocatore B** (Elo iniziale 1300): 1292

### Scenario 2: Vincita del Giocatore B (Elo iniziale 1300)
- **Nuovo Elo del Giocatore A**: 1476
- **Nuovo Elo del Giocatore B**: 1324

In questi scenari, il cambio di punteggio Elo riflette l'impatto delle aspettative di vittoria basate sui punteggi iniziali: una vittoria inaspettata del giocatore con punteggio inferiore produce un trasferimento maggiore di punti.


## Punteggio Elo e i modelli LLM

Applicare il sistema di punteggio Elo ai modelli di linguaggio come i Large Language Models (LLM) non è convenzionale, ma teoricamente possibile in un contesto competitivo o comparativo. Per utilizzare il punteggio Elo con gli LLM, bisognerebbe definire una "competizione" o un set di sfide specifiche dove i modelli possano essere misurati direttamente l'uno contro l'altro o contro un benchmark comune. Ecco come potrebbe funzionare:

### Definizione della Competizione per LLM
Scelta delle Sfide: Le sfide possono includere compiti di comprensione del testo, generazione di testo, traduzione automatica, risposta a domande, e altri compiti di NLP (Natural Language Processing). La chiave è scegliere sfide che possano essere quantificate in modo oggettivo.

### Misurazione delle Prestazioni: 
I risultati di ogni LLM su queste sfide devono essere misurabili. Potrebbero essere basati su metriche standard come la BLEU score per traduzione, F1 score per la comprensione di testo, o altre metriche di valutazione accuratamente definite.

### Sistema di Punteggio: 
Analogamente al sistema Elo negli scacchi, i modelli di linguaggio potrebbero guadagnare o perdere punti basati sui loro confronti. Se un modello "vince" su un altro in una sfida (ad esempio, ottiene un punteggio migliore in una task di traduzione), guadagnerebbe punti Elo. Il numero di punti scambiati dipenderebbe dalla differenza attesa nei loro punteggi pre-sfida.

### Potenziali Problemi e Considerazioni
Definizione di Vittoria: Definire cosa significhi "vincere" una sfida può essere complicato, poiché differenti task potrebbero avere metriche di successo diverse e non sempre direttamente comparabili.

### Variabilità delle Prestazioni: 
Alcuni LLM potrebbero eccellere in certi tipi di compiti ma essere mediocri in altri. Un sistema di punteggio uniforme potrebbe non riflettere accuratamente la versatilità o le specificità dei modelli.

### Aggiornamenti e Iterazioni: 
I modelli di linguaggio vengono costantemente aggiornati e migliorati. Gestire i punteggi Elo in questo contesto dinamico potrebbe richiedere un sistema di aggiustamento frequente per tenere conto delle nuove versioni dei modelli.

## Un Esempio pratico: la Chatbot Arena di LMSys

La pagina "Leaderboard" su [https://chat.lmsys.org/?leaderboard](https://chat.lmsys.org/?leaderboard) fa parte della Chatbot Arena di LMSys, che classifica vari modelli di linguaggio di grande dimensione (LLM) basandosi sulle loro prestazioni attraverso differenti metriche, inclusa la valutazione Elo. Questa piattaforma permette agli utenti di interagire con diversi modelli e votare quelli che preferiscono basandosi sulle risposte a varie domande.

L'organizzazione LMSys ha incorporato un nuovo benchmark chiamato MT-Bench oltre alle tradizionali valutazioni Elo per fornire una valutazione più dettagliata delle capacità dei chatbot. MT-Bench include una serie di domande di conversazione multi-turno progettate per testare le abilità dei chatbot nel gestire dialoghi complessi e istruzioni【31†source】.

Caratteristiche chiave di questa classifica includono:
- **Valutazioni Elo:** I modelli sono valutati in modo simile ai giocatori di scacchi, dove le interazioni tra diversi modelli (che competono per rispondere alle stesse domande) risultano in aggiustamenti del punteggio Elo basati su vittorie e sconfitte.
- **MT-Bench:** Un insieme impegnativo di domande di conversazione multi-turno mirate a valutare le capacità conversazionali e di seguimento istruzioni dei chatbot, con risultati che influenzano la loro posizione nella classifica.
- **Interazioni degli Utenti:** La piattaforma è basata sul crowdsourcing, il che significa che le preferenze degli utenti giocano un ruolo significativo nel determinare i punteggi dei vari modelli.

La Chatbot Arena e MT-Bench fanno parte del più ampio sforzo di LMSYS Org per valutare e migliorare l'efficacia degli LLM attraverso l'engagement della comunità e strumenti di benchmark avanzati. Questo approccio non solo evidenzia i punti di forza e le debolezze dei diversi modelli, ma spinge anche verso lo sviluppo di LLM più sofisticati e allineati alle esigenze degli utenti.
