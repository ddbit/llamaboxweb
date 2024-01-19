---
layout: post
title:  "Nuovo paper Apple: LLM in a Flash. Modelli di linguaggio su dispositivi mobili"
date:   2023-12-22 17:02:16 +0000
---
Il documento, ["LLM in a Flash: Efficient Large Language Model Inference with Limited Memory,"](https://arxiv.org/pdf/2312.11514.pdf)  si concentra sulle sfide e sulle soluzioni per l'esecuzione di grandi modelli di linguaggio (LLM) su dispositivi con capacità limitata di DRAM. 

![LLM in a flash paper frontpage](/images/llm-in-a-flash.png)

Presenta un approccio per l'esecuzione efficiente di LLM che superano la capacità disponibile di DRAM memorizzando i parametri del modello sulla memoria flash e caricandoli nella DRAM su richiesta. Il documento introduce tecniche come il "windowing" e il "raggruppamento riga-colonna" per ottimizzare il trasferimento dei dati dalla memoria flash, sfruttando la sparsità degli LLM per ridurre il carico di dati e migliorare l'efficienza dell'uso della memoria. I metodi proposti consentono di eseguire modelli fino al doppio delle dimensioni della DRAM disponibile, aumentando significativamente la velocità di inferenza rispetto ai metodi di caricamento tradizionali in configurazioni CPU e GPU. La ricerca offre nuove intuizioni sulle strategie consapevoli dell'hardware e sull'apprendimento automatico, enfatizzando l'importanza di considerare le caratteristiche hardware nello sviluppo di algoritmi ottimizzati per l'inferenza.

## In cosa consistono le strategie messe a punto dai ricercatori Apple per i modelli LLM su dispositivi mobili?

Le strategie per aumentare il throughput di lettura dalla memoria flash nel contesto dell'esecuzione di grandi modelli di linguaggio con DRAM limitata includono tecniche come il "windowing" e il "raggruppamento riga-colonna". Questi metodi sono progettati per ottimizzare il processo di trasferimento dei dati dalla memoria flash alla DRAM. Sfruttando la sparsità intrinseca nei grandi modelli di linguaggio, queste tecniche aiutano a ridurre la quantità di dati che devono essere caricati, migliorando così l'efficienza dell'uso della memoria e aumentando la velocità di inferenza su dispositivi con DRAM limitata. Queste strategie fanno parte dell'approccio innovativo del documento per consentire l'esecuzione di modelli più grandi su dispositivi con risorse di memoria limitate.

### Strategia di Windowing

La strategia di "windowing" menzionata nel documento fa parte di un approccio più ampio per eseguire efficientemente grandi modelli di linguaggio (LLM) su dispositivi con capacità di DRAM limitata. Questo metodo prevede:

1. **Riduzione del Volume di Trasferimento dei Dati**: Riutilizzando i neuroni precedentemente attivati nel modello, la tecnica di windowing riduce strategicamente la quantità di dati che devono essere trasferiti dalla memoria flash alla DRAM.

2. **Ottimizzazione dell'Interazione con la Memoria Flash**: Il metodo si armonizza con il comportamento della memoria flash, con l'obiettivo di ottimizzare due aree critiche: ridurre il volume dei dati trasferiti dalla memoria flash e leggere i dati in blocchi più grandi e contigui.

Implementando questa tecnica di windowing, il sistema può gestire in modo efficiente l'uso della memoria e migliorare le prestazioni dei grandi modelli di linguaggio su dispositivi con capacità di DRAM limitata【19†source】.


### Strategia di "Row-Column Bundling"

La strategia di "raggruppamento riga-colonna", come descritta nel documento, comporta l'archiviazione di colonne e righe corrispondenti insieme nella memoria flash, permettendo così di consolidare i dati in blocchi più grandi per la lettura. Questo approccio è particolarmente efficace perché:

1. **Raddoppia la Dimensione del Blocco**: Memorizzando ogni elemento dei pesi della rete in un certo numero di byte, questo raggruppamento raddoppia efficacemente la dimensione del blocco da  d_model * num_bytes a 2 * d_model * num_bytes. Questo aumento della dimensione del blocco è fondamentale per migliorare il throughput del modello.

2. **Sfruttamento della Co-attivazione dei Neuroni**: Il documento ha anche esplorato il concetto di raggruppamento basato sulla co-attivazione dei neuroni. Si ipotizzava che i neuroni potessero essere altamente correlati nei loro schemi di attività, il che potrebbe consentire ulteriori raggruppamenti. Questo è stato verificato analizzando le attivazioni dei neuroni su un dataset di validazione, dove si è osservato che la coattivazione di ogni neurone con gli altri forma una distribuzione a legge di potenza.

Queste tecniche contribuiscono collettivamente a un significativo miglioramento del throughput nella lettura dei dati dalla memoria flash alla DRAM, che è un aspetto critico per l'esecuzione efficiente di grandi modelli di linguaggio su sistemi con capacità di DRAM limitata.

## Conclusioni

Queste soluzioni aprono la strada a nuove applicazioni degli LLM in contesti dove il dispositivo non può avere garanzia di connessione. Infatti, per ora i modelli LLM come Chatbot e simili si basano su una connessione tra il dispositivo ed un server che eroga il servizio tramite API.

Grazie al deployment di un modello direttamente nel dispositivo dell'utente sarà in futuro possibile che droni, robot, dispositivi in condizoini estreme possano operare in modo autonomo senza utilizzare una connessione al server. 