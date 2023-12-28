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

## Obiettivo di massima della sperimentazione (o di R.Massimo)

Massimo oltre che essere un manager di alto livello in una multinazionale è anche una personalità riconosciuta nel mondo dell'innovazione e del digitale, e in particolare nel mondo dell'AI. Avendo nel corso degli anni pubblicato materiale in forma di post, libri, appunti, articoli e altro mi ha posto questo problema:

"Vorrei un chatbot che fosse istruito dai miei contenuti e capace di parlare come me"

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



