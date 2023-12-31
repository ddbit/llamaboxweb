---
layout: post
title:  "Esperimenti con LLM e RAG: Diario minimo di laboratorio"
date:   2023-12-28 17:02:16 +0000

---

(articolo in fase di lavorazione)

## Introduzione

L'addestramento di modelli di lingua di grandi dimensioni come LLaMa 2.0 o 
ChatGPT-3.5 da zero può essere un'impresa fuori portata per la maggiorparte di noi. 

Quindi insieme al collega ed amico Massimo Chiriatti ci siamo posti l'obiettivo di capire e sperimentare qualche alternativa che ci permettesse di far funzionare la nostra AI senza dover necessariamente basarci sull'infrastruttura di OpenAI.

## Obiettivo di massima della sperimentazione

Massimo oltre che essere un manager di alto livello in una multinazionale è anche una personalità riconosciuta nel mondo dell'innovazione e del digitale, e in particolare nel mondo dell'AI. Avendo nel corso degli anni pubblicato materiale in forma di post, libri, appunti, articoli e altro mi ha posto questo problema:

> "Vorrei un chatbot che fosse istruito dai miei contenuti e capace di parlare come me"

Ci abbiamo ragionato un po' e ovviamente abbiamo concordato che:
- non potevamo addestrare un modello da zero
- non volevamo usare il classico GPTs (poi vedremo che openAI ha un ruolo comunque importante nel nostro percorso)

Abbiamo inizialmente pensato al fine-tuning di un modello open come LLama2.

## Il fine-tuning e i suoi problemi

Il fine-tuning è una pratica molto interessante, ma fatto in modo "diretto" prevede in pratica di modificare i parametri di un LLM per adattarli ad un task specifico. 

Modificare significa mettere in atto una procedura di riaddestramento. Probabilmente troppo per i nostri skill e per le nostre risorse dedicate all'esperimento.

Senza contare che il fine-tuning ha anche delle contro indicazioni non da poco come ad esempio il Catastrophic Forgetting, ovvero la modifica dei parametri del modello permette di specializzarlo su un task ma poi funziona male su tutto il resto. Come se per nuotare veloci ci facessimo impiantare le pinne ai piedi, salvo che finita la sessione di nuoto non potremmo più camminare, infilarci le scarpe o guidare la macchina.

[In questo articolo](https://medium.com/@S.Shakir/mastering-task-specific-brilliance-battling-catastrophic-forgetting-with-fine-tuned-llms-c0bde311d406) il tema è spiegato con maggiori dettagli e vengono anche introdotte alcune tecniche per non causare questo disastro, tra queste la Parameter Efficient Fine-Tuning (PEFT).

(...to be continued)


## Ma cos'è il RAG dei modelli LLM/AI?

Dunque cerchiamo di rispondere con una breve spiegazione alla domanda "cos'è il RAG di un LLM?"

Una risposta semplice e concisa la troviamo nella [documentazione di Llamaindex](https://docs.llamaindex.ai/en/stable/getting_started/concepts.html)

>In RAG, your data is loaded and prepared for queries or “indexed”. User queries act on the index, which filters your data down to the most relevant context. This context and your query then go to the LLM along with a prompt, and the LLM provides a response.

![basic rag diagram](/images/basic-rag.png)

Quindi riformulato a parole mie si tratta della preventiva costruzione di un database a partire dai dati e contenuti non-strutturati della knowledge base di partenza (gli scritti di Massimo). Tale database viene interrogato ad ogni messaggio dell'utente e i risultati di tale query diventano parte del prompt di "contesto" che sarà inviato al modello LLM.

Naturalmente ci sono molti dettagli tecnici che fortunatamente Llamaindex gestisce a nostra insaputa ma in modo efficiente.

## Il primo prototipo del nostro R.Massimo

R.Massimo è un bot basato su una base di contenuti e scritti di Massimo Chiriatti. Questi vengono "digeriti" attraverso la libreria Llamaindex e diventano il contesto per le conversazioni con il modello generale pretrained.

Visto che ci muoviamo in un campo minato per quanto riguarda librerie e API e visto che siamo tutto sommato "novellini" (pur avendo lavorato per anni nel machine learning, ma qui cambia tutto) abbiamo deciso di avere una sola variabile "incontrollabile" alla volta. 

Pertanto, visto che sperimentare sia Llamaindex che un modello locale sarebbe stato come dicono gli inglesi un "double trouble" abbiamo preferito iniziare con LlamaIndex e OpenAI api per usare il modello gpt-4. Sapevamo già usare le api di OpenAI e questa era un'incognita in meno (ma solo per il momento).

In questo senso ci siamo trovati a sviluppare una webapp così composta:
- flask come app server in python
- pythonanywhere come host (molto comodo ed economico per i primi test)
- llamaindex come libreria di RAG
- HTMX come libreria frontend
- Gpt-4 attraverso le api openAI come modello LLM

HTMX è praticamente la cosa più leggera e semplice da usare per fare velocemente un client in grado di fare richieste post. Il risultato lo abbiamo pubblicato su
[https://ddbit.eu.pythonanywhere.com/static/index.html](https://ddbit.eu.pythonanywhere.com/static/index.html)

Certo non è proprio una user interface accativante, ma faceva il suo.

![image](/images/rmassimo-poc1.png)

## Il bot Telegram

(to be done ...)








