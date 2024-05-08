---
layout: post
title:  "Come si legge la scheda tecnica di un modello LLM"
date:   2024-04-19
slug: scheda-llm
draft: true
permalink: /come-si-legge-scheda-tecnica-llm
image: /images/fallout-spec-sheet-read.webp
---

Meta ha rilasciato due versioni di Llama 3: una da 8 miliardi di parametri e una da 70 miliardi di parametri
Llama 3 è stato preaddestrato su 15 trilioni di token di dati, un set di dati 7 volte più grande rispetto a quello utilizzato per Llama 2. Il set di dati di addestramento include anche 4 volte più codice rispetto a Llama 2.

**Ma come si legge esattamente una scheda di specifiche di un LLM?**

![fallout style woman reading tech doc](/images/fallout-spec-sheet-read.webp)


La scheda è visibile nel [sito hugginface](https://huggingface.co/meta-llama/Meta-Llama-3-8B)

## Cominciamo dalla licenza
E' possibile usare Llama3 per applicazioni commerciali, ma ci sono condizioni specifiche da rispettare. Se il numero di utenti mensili attivi dei prodotti o servizi che utilizzano Llama3 **supera i 700 milioni nel mese precedente**, è necessario richiedere una licenza specifica da Meta. Questa licenza potrebbe essere concessa a discrezione di Meta. Inoltre, tutte le applicazioni commerciali devono aderire alle condizioni generali dell'accordo di licenza, incluse le norme di utilizzo e le leggi applicabili.

Naturalmente è allegata una chilometrica lista di usi proibiti che in qualche modo sta all'utente rispettare.

Come per i suoi predecessori, **l'uso di llama3 prevede un modulo di registrazione e i dati personali vengono spediti a Meta**.

## Le violazioni del copyright?

L'utente che utilizza i materiali di Llama3 è responsabile per assicurarsi che il loro uso sia conforme alle leggi vigenti, inclusi i diritti d'autore e le regolazioni del commercio. Se il modello genera output che violano i diritti d'autore, la responsabilità ricadrebbe sull'utente che ha implementato e utilizzato il modello in quel contesto specifico. Gli utenti sono anche tenuti a indennizzare e difendere Meta da qualsiasi reclamo terzo legato al loro uso dei materiali di Llama3.

## Primi dati tecnici veri e propri

> Model Architecture Llama 3 is an auto-regressive language model that uses an optimized transformer architecture. 

Questo ci dice che tipo di modello stiamo usando.

> The tuned versions use supervised fine-tuning (SFT) and reinforcement learning with human feedback (RLHF) to align with human preferences for helpfulness and safety.

Mentre qui ci informano sul fatto che l'addestramento è avvenuto in modo supervisionato e che utilizza un sistema di ri-addestramento continuo chiamato **reinforcement learning** che si nutre del feedback degli utenti.


| Model       | Training Data                    | Params | Context length | GQA | Token count | Knowledge cutoff | 
|-------------|----------------------------------|--------|----------------|-----|-------------|------------------| 
| Llama 3 8B  | publicly available online data.  | 8B     | 8k             | Yes | 15T+        | March, 2023      | 
| Llama 3 70B | publicly available online data.  | 70B    | 8k             | Yes | 15T+        | December, 2023   | 


La tabella ci da poi alcune informazioni quantitative molto importanti:

- **I parametri**: abbiamo due versioni del modello, con 8B e 70B di parametri, se vi siete mai chiesti cosa siano questi parametri, vi invito a leggere [questo articolo](https://kelvin.legal/understanding-large-language-models-what-are-paramters/). Giusto per fare un confronto, di GPT-4, che rappresenta un po' il leader di mercato, [si vocifera](https://the-decoder.com/gpt-4-architecture-datasets-costs-and-more-leaked/) che abbia oltre 1000 miliardi di parametri. Quindi Llama3 sembra un nano in confronto, ma in realtà il numero di parametri non è sempre un indicatore diretto della qualità di un LLM.

- **Context lenght**, come sappiamo questa rappresenta la lunghezza massima dell'input che il modello può ingerire in fase di inferenza. Ricordiamo che GPT-4 Turbo ha un contesto fino a 128k token (circa 240 pagine da 400 parole). Anche in questo caso Llama3 sembra non poter competere con GPT-4 dato che il contesto disponibile per il modello di Meta è di **appena 8k tokens** (circa 16 pagine di scritto)

- **GQA**, significa [Grouped Query Attention](https://klu.ai/glossary/grouped-query-attention), ed è una tecnica che ottimizza l'algoritmo di attenzione.

- **Training set**, la scheda ci informa che Llama3 è stato addestrato con 15 mila miliardi di token provenienti da **fonti disponibili al pubblico**. Il che è una definizione vaga ma probabilmente lecita nell'attesa che la legislazione internazionale ponga dei precisi paletti sulla definizione di "disponibile" Vs "utilizzabile per addestrare algoritmi"

## Instruction tuned Vs pre-Trained models

Il modello viene fornito in queste due versioni. Ma cosa significa?

Mentre il pre-trained è un modello che è stato addestrato attraverso il corpus di linguaggio naturale con lo scopo di apprendere la struttura delle frasi, i pattern ricorrenti, ed è capace di generare testi che "completano" l'input umano, il tipo **instruction-tuned** ha subito un successivo addestramento fine (fine-tuning), dove in modo supervisionato il modello è stato addestrato ad eseguire dei comandi e seguire istruzioni. Una spiegazione più soddisfacente di questo concetto è disponibile [nel blog di openAI](https://openai.com/research/instruction-following)


## Metriche generaliste per i modelli pre-trained

In generale ogni modello pretrained viene testato con dei benchmark su vari aspetti del linguaggio dalla comprensione del testo ad aspetti più **generalisti** :

| Benchmark                  | Llama 3 8B | Llama2 7B | Llama2 13B | Llama 3 70B | Llama2 70B |
|----------------------------|------------|-----------|------------|-------------|------------|
| MMLU (5-shot)              | 66.6       | 45.7      | 53.8       | 79.5        | 69.7       |
| AGIEval English (3-5 shot) | 45.9       | 28.8      | 38.7       | 63          | 54.8       |
| CommonSenseQA (7-shot)     | 72.6       | 57.6      | 67.6       | 83.8        | 78.7       |
| Winogrande (5-shot)        | 76.1       | 73.3      | 75.4       | 83.1        | 81.8       |
| BIG-Bench Hard (3-shot, CoT) | 61.1     | 38.1      | 47         | 81.3        | 65.7       |
| ARC-Challenge (25-shot)    | 78.6       | 53.7      | 67.6       | 93          | 85.3       |



### MMLU 

MMLU è un test con domande a scelta multipla, quindi un benchmark piuttosto semplice. Il benchmark consiste in domande con quattro possibili risposte che coprono 57 domini di conoscenza generale raggruppati in categorie come: “Scienze umane”, “Scienze sociali”, “STEM”, ecc.

```
Question: Glucose is transported into the muscle cell:


Choices:
A. via protein transporters called GLUT4.
B. only in the presence of insulin.
C. via hexokinase.
D. via monocarbylic acid transporters.


Correct answer: A
``` 
[*source HuggingFace blog*](https://huggingface.co/blog/open-llm-leaderboard-mmlu)


### CommonsenseQA

CommonsenseQA è un set di dati per la risposta a domande di senso compiuto. Il dataset è composto da 12.247 domande con 5 scelte ciascuna. Il dataset è stato generato dai lavoratori di Amazon Mechanical Turk



## Metriche di Comprensione del testo per i modelli pre-trained


### SQuAD

Lo [Stanford Question Answering Dataset (SQuAD)](https://rajpurkar.github.io/SQuAD-explorer/) è un dataset di comprensione della lettura, costituito da domande poste da crowdworker su un insieme di articoli di Wikipedia, in cui la risposta a ogni domanda è un segmento di testo, o span, dal passaggio di lettura corrispondente, oppure la domanda può essere senza risposta.

SQuAD2.0 combina le 100.000 domande di SQuAD1.1 con oltre 50.000 domande senza risposta, scritte in modo contraddittorio dai crowdworker per sembrare simili a quelle con risposta. Per ottenere buoni risultati in SQuAD2.0, i sistemi devono non solo rispondere alle domande quando è possibile, ma anche determinare quando nessuna risposta è supportata dal paragrafo e astenersi dal rispondere.

### QuAC: Question Answering in Context
[Question Answering in Context](https://quac.ai/) è un dataset su larga scala che consiste in circa 14K dialoghi di risposta alle domande in crowdsourcing con 98K coppie domanda-risposta in totale.


Di seguito una tabella riassuntiva.

| Benchmark    | Llama 3 8B | Llama2 7B | Llama2 13B | Llama 3 70B | Llama2 70B |
|--------------|------------|-----------|------------|-------------|------------|
| SQuAD (1-shot)    | 76.4       | 72.2      | 72.1       | 85.6        | 82.6       |
| QuAC (1-shot, F1) | 44.4       | 39.6      | 44.9       | 51.1        | 49.4       |
| BoolQ (0-shot)    | 75.7       | 65.5      | 66.9       | 79          | 73.1       |
| DROP (3-shot, F1) | 58.4       | 37.9      | 49.8       | 79.7        | 70.2       |



## Il Modello Instruct
Ricordiamo che Llama3 arriva in due "gusti" diversi: pre-trained e instruct.

Un modello **instruct** viene ulteriormente addestrato o ottimizzato per rispondere specificamente alle istruzioni fornite dall'utente in modo più intuitivo e utile. Questo addestramento supplementare, spesso realizzato attraverso tecniche di apprendimento supervisionato, implica l'utilizzo di esempi annotati dove agli addestratori umani è stato chiesto di rispondere a domande o completare compiti seguendo istruzioni esplicite. Questo tipo di modello è progettato per fornire risposteallineate con le specifiche intenzioni dell'utente.

Come per i modelli pre-trained, anche quelli instruct hanno una serie di metriche di benchmark con cui vengono valutati


| Benchmark         | Llama 3 70B | Llama 2 70B |
|-------------------|-------------|-------------|
| MMLU (5-shot)     | 82          | 52.9        |
| GPQA (0-shot)     | 39.5        | 21          |
| HumanEval (0-shot)| 81.7        | 25.6        |
| GSM-8K (8-shot, CoT) | 93      | 57.5        |
| MATH (4-shot, CoT)   | 50.4     | 11.6        |


Ad esempio, la metrica [MATH (4-shot, CoT)](https://github.com/hendrycks/math/) valuta le performance dei modelli di intelligenza artificiale nei problemi di matematica. "4-shot" indica che il modello vede quattro esempi del problema prima di affrontare nuovi quesiti, mentre "CoT" (Chain of Thought) si riferisce alla tecnica di mostrare il ragionamento intermedio del modello nel processo di risoluzione, utile per comprendere e migliorare il suo approccio ai problemi.

Un'altro tipo di benchmark matematico è la metrica [GSM-8K (8-shot, CoT)](https://klu.ai/glossary/GSM8K-eval) valuta le abilità di risoluzione matematica di modelli AI. "GSM-8K" indica il set di problemi, "8-shot" che il modello vede otto esempi prima di nuovi quesiti, e "CoT" (Chain of Thought) che deve mostrare il ragionamento passo dopo passo verso la soluzione.