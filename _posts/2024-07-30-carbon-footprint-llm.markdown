---
layout: post
title:  "Impatto Ambientale dell'Intelligenza Artificiale: Consumo Energetico e Emissioni di CO2 nei Modelli AI"
date:   2024-07-30

image: /images/posts/co2/cover.webp
tags: 
  - artificial-intelligence
  - ai
  - environmental-impact
  - co2-emissions
  - energy-consumption
  - language-models
  - sustainability
  - machine-learning
  - fine-tuning
  - energy-efficiency
  - renewable-energy

---

Quanto vale l'impatto ambientale  dell'intelligenza artificiale (AI)? Focalizzandosi sull'elevato consumo energetico dei modelli linguistici di grandi dimensioni possiamo dire che questi modelli richiedono enormi quantità di dati e calcoli, contribuendo significativamente alle emissioni globali di CO2. 

![cover](/images/posts/co2/cover.webp)


Anche se l'AI può aiutare nella lotta contro il cambiamento climatico, il suo uso intensivo di energia, spesso derivata da combustibili fossili, rappresenta una sfida. Alcuni [studi suggeriscono soluzioni](https://news.climate.columbia.edu/2023/06/09/ais-growing-carbon-footprint/) come l'uso di energie rinnovabili, una gestione più efficiente dei data center e l'adozione di modelli più piccoli e ottimizzati.


## Impatto CO2 del Training di Modelli

Naturalmente il consumo aumenta con l'aumento del numero dei parametri.

![crescita del numero di parametri nei modelli linguistici](/images/posts/co2/1.png)

Ecco il grafico che mostra la crescita del numero di parametri nei modelli linguistici di grandi dimensioni. L'asse y è in scala logaritmica per evidenziare l'enorme incremento dei parametri dal 2018 al modello PaLM di Google.


![emissioni di CO2 dei vari modelli di AI](/images/posts/co2/2.png)

Ecco un grafico che mostra le emissioni di CO2 (in tonnellate di CO2 equivalente) dei vari modelli di AI, ordinate dal più piccolo al più grande, in scala logaritmica:

- **Transformer (65M parameters)**
- **Transformer (213M parameters)**
- **ELMo**
- **BERT (110M parameters)**
- **Transformer (213M parameters) w/ neural architecture search**
- **Llama 3 8B**
- **Llama 3 70B**

Questo grafico evidenzia chiaramente l'impatto delle emissioni di carbonio associate all'addestramento di modelli di AI, con i modelli più recenti e complessi che hanno un'impronta di carbonio significativamente maggiore.

## Fine Tuning Efficiente. Quanta CO2 produce

Le tecniche di [Fine Tuning come LoRa](/2024/06/20/prompt-tuning.html) invece di ricalcolare tutti i parametri di un modello riescono ad isolare un sottoinsieme molto piccolo di questi con grandi vantaggi in termini di tempo e risorse di calcolo. Risultano essere virtuosi ovviamente anche in termini di CO2 prodotta. Ad esempio, i dati specifici emersi [da questo articolo](https://towardsdatascience.com/carbon-footprint-of-llm-fine-tuning-a-case-study-7703afc716a9) riguardo all'impronta di carbonio del fine-tuning utilizzando la tecnica LoRA (Low-Rank Adaptation):

- **Modello di linguaggio:** LLM con 7 miliardi di parametri
- **Tecnica di fine-tuning:** LoRA
- **Campioni utilizzati:** 21,300
- **Numero di epoche:** 1
- **Tempo richiesto:** 4 ore
- **Emissioni di CO2:** 57 grammi di CO2 equivalente (CO2e)

Questi numeri mostrano che il fine-tuning di un modello di linguaggio di grandi dimensioni con la tecnica LoRA è estremamente efficiente in termini di tempo, risorse computazionali e impronta di carbonio. L'emissione di 57 grammi di CO2e è molto bassa, il che dimostra l'efficacia della tecnica LoRA nel ridurre l'impatto ambientale del fine-tuning dei modelli AI.


## Impatto CO2 dell'Inferenza nei modelli AI

L'articolo "Power Hungry Processing: ⚡ Watts ⚡ Driving the Cost of AI Deployment?" discute l'impatto ambientale dei sistemi AI generativi multiuso, che consumano molta energia e producono elevate emissioni di carbonio. La ricerca confronta i costi energetici e le emissioni di carbonio di vari modelli di machine learning, inclusi modelli specifici per compiti e modelli multiuso, esaminando 88 modelli attraverso 10 compiti e 30 dataset. I risultati mostrano che i modelli multiuso sono significativamente più costosi in termini di energia e emissioni rispetto ai modelli specifici per compiti, sollevando questioni sulla sostenibilità dell'uso diffuso di tali modelli.

![](/images/posts/co2/3.png)

Da questo studio deriva che la generazione di testo o la summarization producono dai 5g ai 10g di CO2, mentre la generazione di una immagine un poderoso 200g-500g

Per maggiori dettagli, puoi leggere l'articolo completo [qui](https://arxiv.org/pdf/2311.16863).




## Conclusioni

L'impatto ambientale dell'intelligenza artificiale (AI) è significativo, specialmente quando si considerano i modelli linguistici di grandi dimensioni. Questi modelli richiedono enormi quantità di dati e calcoli, contribuendo notevolmente alle emissioni globali di CO2. Anche se l'AI può essere un alleato nella lotta contro il cambiamento climatico, il suo uso intensivo di energia, spesso derivata da combustibili fossili, rappresenta una sfida importante.

Gli studi suggeriscono diverse soluzioni per mitigare questo impatto, come l'uso di energie rinnovabili, una gestione più efficiente dei data center e l'adozione di modelli più piccoli e ottimizzati. Ad esempio, il fine-tuning di modelli AI con tecniche efficienti come LoRA può ridurre significativamente le emissioni di CO2. Un caso di studio ha mostrato che il fine-tuning di un modello di linguaggio con 7 miliardi di parametri su 21,300 campioni ha emesso solo 57 grammi di CO2, dimostrando l'efficacia di queste tecniche nel ridurre l'impatto ambientale.

Inoltre, la ricerca evidenzia che i modelli AI generativi multiuso sono molto più costosi in termini di energia e emissioni di carbonio rispetto ai modelli specifici per compiti. Questo solleva questioni sulla sostenibilità dell'uso diffuso di tali modelli. Per esempio, la generazione di immagini può produrre fino a 500 grammi di CO2 per singola operazione, mentre la generazione di testo e la summarization producono tra 5 e 10 grammi di CO2.

