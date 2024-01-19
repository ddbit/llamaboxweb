---
layout: post
title:  "Come misurare la qualità del RAG nei modelli LLM"
date:   2024-01-12 17:02:16 +0000
excerpt: "Si fa presto a dire RAG, ma poi come misuriamo l'efficacia della nostra pipeline RAG. Cominciamo a metterci qualche dubbio e a trovare qualche risposta."
---



## Il RAG, cos'è e a cosa serve

Il Retrieval-Augmented Generation (RAG) nei modelli di Large Language Models (LLM) è una tecnica che combina il recupero di informazioni (retrieval) e la generazione di testo. Il RAG prima cerca dati pertinenti in un vasto archivio di testo e poi utilizza questi dati per generare risposte più accurate e informative.

<span style="background-color:lightcyan">
Se vuoi saperne di più dai un'occhiata al *nostro* [Diario di Laboratorio RAG](/2023/12/28/Esperimenti-di-RAG-Diario.html)
</span>.

## Come valutare la qualità del RAG

Per valutare l'efficacia del Retrieval-Augmented Generation (RAG) in un Large Language Model, ci si può concentrare sui tre aspetti principali:

**Precisione delle Risposte**: Valutare la correttezza e la pertinenza delle risposte generate. Questo è fondamentale per assicurare che le informazioni fornite siano affidabili e utili. La precisione può essere misurata confrontando le risposte del modello con le risposte di riferimento o con dati verificabili.

**Qualità del Recupero**: Analizzare quanto efficacemente il sistema recupera informazioni pertinenti dall'archivio di testo. Questo aspetto riguarda la capacità del modello di identificare e utilizzare le fonti di informazione più rilevanti per una data richiesta.

**Rilevanza e Coerenza**: Assicurarsi che le informazioni recuperate siano integrate nel testo generato in modo coeso e contestualmente appropriato. Le risposte dovrebbero essere logicamente coerenti e ben strutturate, riflettendo un'adeguata comprensione e sintesi delle informazioni recuperate.

Questi tre criteri sono cruciali per garantire che il sistema RAG non solo produca risposte tecnicamente accurate, ma che queste risposte siano anche utili, pertinenti e facilmente comprensibili per l'utente.


## Quali tecniche per ottimizzare il nostro RAG

Ecco una breve descrizione di alcuni paper sui modelli Retrieval-Augmented Generation (RAG) e i link per approfondimenti:

1. **"Benchmarking Large Language Models in Retrieval-Augmented Generation"**: Questo studio si concentra sulla valutazione delle capacità dei Large Language Models (LLMs) nel contesto del RAG. Esamina aspetti come la robustezza al rumore, il rifiuto negativo, l'integrazione delle informazioni e la robustezza controfattuale. Questi fattori sono essenziali per determinare quanto bene un modello RAG possa limitare le sue risposte ai contesti documentali rilevanti. Puoi trovare il paper qui: [Benchmarking Large Language Models in Retrieval-Augmented Generation](https://ar5iv.org/html/2309.01431).

2. **"Improving the Domain Adaptation of Retrieval Augmented Generation (RAG) Models for Open Domain Question Answering"**: Questa ricerca propone RAG-end2end, un'estensione del RAG che addestra congiuntamente il componente di recupero e quello di generazione per compiti specifici di dominio. Sottolinea l'importanza del componente di recupero nell'accuratezza nel reperimento di informazioni da dataset specifici di dominio, che è vitale per garantire che le risposte siano limitate al contesto dei documenti forniti. Il paper è disponibile qui: [Improving the Domain Adaptation of Retrieval Augmented Generation (RAG) Models for Open Domain Question Answering](https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00436/110880/Improving-the-Domain-Adaptation-of-Retrieval).

3. **"Retrieval-Augmented Generation for Large Language Models: A Survey"**: Questo sondaggio copre varie tecniche e approcci nel RAG, inclusi metodi per il recupero denso zero-shot preciso e la generazione robusta supportata dal recupero. Questi approcci sono significativi per rifinire il processo di recupero nei modelli RAG, assicurando che le risposte generate siano strettamente allineate ai contesti specifici dei documenti di input. Per maggiori dettagli, consulta il paper qui: [Retrieval-Augmented Generation for Large Language Models: A Survey](https://ar5iv.org/html/2312.10997).

4. **"Advanced RAG 01: Small-to-Big Retrieval"**: Un write-up pratico sulle tecniche Child-Parent RecursiveRetriever e Sentence Window Retrieval con esempi pratici basati su LlamaIndex. [Advanced RAG 01: Small-to-Big Retrieval](https://towardsdatascience.com/advanced-rag-01-small-to-big-retrieval-172181b396d4)


Questi articoli forniscono informazioni preziose sui metodi e le strategie per migliorare il componente di recupero dei modelli RAG, essenziale per limitare le risposte al contesto di documenti specifici.