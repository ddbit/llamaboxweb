---
layout: post
title:  "Valutazione del Task di Summarization per un Modello AI/LLM: il Buono, il Brutto ed il Cattivo"
date:   2024-03-22 17:02:16 +0000
permalink: /come-valutare-summarization-task-llm
---
In questo articolo discutiamo le varie metriche per la valutazione di un task di summarization. In particolare metteremo a punto gli strumenti per misurare i risultati della summarization di Mistral 7b, l'articolo farà una panoramica delle varie metriche per un singolo esempio di summarization tratto dal dataset etichettato CNN/News.

![good bad ugly](/images/posts/good-bad-ugly.jpg)

## Metodo seguito
L'approccio che seguiremo in questo articolo è il seguente:  prendiamo un testo completo e ne generiamo una sintesi usando il modello che vogliamo testare (Mistral7b in questo caso).
Per confrontare la sintesi generata dal nostro modello (detto scherzosamente il Brutto) prenderemo 3 altre sintesi:

- sintesi manuale che rappresenta il nostro riferimento
- Un altro riassunto generato da un modello che riteniamo più esperto, in questo caso utilizzeremo il modello gpt-4. (detto il Buono)
- Una sintesi completamente "sbagliata" (detta il Cattivo) ad esempio N parole a caso. Per evidenziare se le metriche sono coerenti con le aspettative.

## Metriche usate

- **ROUGE-3**: Misura la sovrapposizione di trigrammi (sequenze di tre parole) tra il riassunto generato e quello di riferimento.

- **ROUGE-L**: Calcola la più lunga sotto-sequenza comune, considerando l'ordine delle parole, tra riassunto generato e di riferimento.

- **BLEU**: Valuta la qualità della traduzione misurando la precisione dei n-grammi tra testo tradotto e di riferimento.

- **METEOR**: Combina precisione e richiamo di n-grammi, considerando sinonimi, morfologia e struttura della frase.

- **BERTScore**: Utilizza rappresentazioni BERT per valutare la similarità semantica tra riassunto generato e quello di riferimento.

Infine, utilizzemo una serie di metriche basate su un modello valutatore esterno, anche in questo caso si tratta di GPT4, istruito a svolgere la funzione di valutazione. Tale approccio è ispirato all'articolo [How to eval abstractive summarization](https://cookbook.openai.com/examples/evaluation/how_to_eval_abstractive_summarization)

Il metodo proposto da OpenAI è basato su quattro criteri distinti:

- **Rilevanza**: Valuta se il riassunto include solo informazioni importanti ed esclude ridondanze.
- **Coerenza**: Valuta il flusso logico e l'organizzazione del riassunto.
- **Consistenza**: Verifica se il riassunto è in linea con i fatti nel documento sorgente.
- **Fluidità**: Valuta la grammatica e la leggibilità del riassunto.

Per ciascuno di questi criteri, creiamo delle richieste (prompts) prendendo come input il documento originale e il riassunto, utilizzando la generazione di catena di pensiero e guidando il modello per ottenere un punteggio numerico da 1 a 5 per ogni criterio.

## Risultati con le metriche non generative

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>metric</th>
      <th>our model (the ugly)</th>
      <th>gpt-4 (the good)</th>
      <th>random words  (the bad)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>rouge3</td>
      <td>0.081871</td>
      <td>0.092486</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>rougeL</td>
      <td>0.274286</td>
      <td>0.225989</td>
      <td>0.081633</td>
    </tr>
    <tr>
      <th>2</th>
      <td>bleu</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>meteor</td>
      <td>0.436987</td>
      <td>0.343161</td>
      <td>0.085960</td>
    </tr>
    <tr>
      <th>4</th>
      <td>bertscore</td>
      <td>0.874622</td>
      <td>0.879914</td>
      <td>0.820749</td>
    </tr>
  </tbody>
</table>
</div>

## Risultati con le metriche generative

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>---</th>
      <th>our model (the ugly)</th>
      <th>gpt-4 (the good) </th>
      <th>random words (the bad)</th>
    </tr>

  </thead>
  <tbody>
    <tr>
      <th>Coherence (1-5)</th>
      <td>5</td>
      <td>5</td>
      <td>1</td>
    </tr>
    <tr>
      <th>Consistency (1-5)</th>
      <td>5</td>
      <td>5</td>
      <td>1</td>
    </tr>
    <tr>
      <th>Fluency (1-3) </th>
      <td>3</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <th>Relevance (1-5)</th>
      <td>5</td>
      <td>5</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>

## Interpretazione dei risultati

Le metriche come Rouge e Bleu dicono poco sulla semantica delle sintesi. Nel nostro caso poi la metrica Bleu sembra completamente inattiva. Va capito se per un errore di configurazione o perché tale metrica si adatta solo al caso di traduzione fra lingue diverse.

Per quanto riguarda le metriche generate da gpt-4 non possiamo ritenerci del tutto soddisfatti in quanto tra il nostro modello ed il benchmark i punteggi sono sempre uguali e pari al massimo possibile. Probabilmente la metrica va messa a punto con un po' di prompt engineering in modo da diversificare il risultato tra una buona sintesi ed un'ottima sintesi. Inoltre va anche detto che abbiamo usato gpt-4 in modalità zero-shot, ovvero senza un esempio di valutazione da parte nostra. E' possibile che inserendo diversi esempi supervisionati nel prompt il risultato della metrica sia più accurato.


## Allegati

(ndr. il fatto che il testo usato come esempio di articolo si riferisca a degli episodi di crisi militare tra Israele e Palestina è del tutto casuale. Si tratta del primo elemento del dataset CNN/News utilizzato ampiamente in molti lavori scientifici)

### Testo completo dell'articolo

>(CNN)The Palestinian Authority officially became the 123rd member of the International Criminal Court on Wednesday, a step that gives the court jurisdiction over alleged crimes in Palestinian territories. The formal accession was marked with a ceremony at The Hague, in the Netherlands, where the court is based. The Palestinians signed the ICC's founding Rome Statute in January, when they also accepted its jurisdiction over alleged crimes committed "in the occupied Palestinian territory, including East Jerusalem, since June 13, 2014." Later that month, the ICC opened a preliminary examination into the situation in Palestinian territories, paving the way for possible war crimes investigations against Israelis. As members of the court, Palestinians may be subject to counter-charges as well. Israel and the United States, neither of which is an ICC member, opposed the Palestinians' efforts to join the body. But Palestinian Foreign Minister Riad al-Malki, speaking at Wednesday's ceremony, said it was a move toward greater justice. "As Palestine formally becomes a State Party to the Rome Statute today, the world is also a step closer to ending a long era of impunity and injustice," he said, according to an ICC news release. "Indeed, today brings us closer to our shared goals of justice and peace." Judge Kuniko Ozaki, a vice president of the ICC, said acceding to the treaty was just the first step for the Palestinians. "As the Rome Statute today enters into force for the State of Palestine, Palestine acquires all the rights as well as responsibilities that come with being a State Party to the Statute. These are substantive commitments, which cannot be taken lightly," she said. Rights group Human Rights Watch welcomed the development. "Governments seeking to penalize Palestine for joining the ICC should immediately end their pressure, and countries that support universal acceptance of the court's treaty should speak out to welcome its membership," said Balkees Jarrah, international justice counsel for the group. "What's objectionable is the attempts to undermine international justice, not Palestine's decision to join a treaty to which over 100 countries around the world are members." In January, when the preliminary ICC examination was opened, Israeli Prime Minister Benjamin Netanyahu described it as an outrage, saying the court was overstepping its boundaries. The United States also said it "strongly" disagreed with the court's decision. "As we have said repeatedly, we do not believe that Palestine is a state and therefore we do not believe that it is eligible to join the ICC," the State Department said in a statement. It urged the warring sides to resolve their differences through direct negotiations. "We will continue to oppose actions against Israel at the ICC as counterproductive to the cause of peace," it said. But the ICC begs to differ with the definition of a state for its purposes and refers to the territories as "Palestine." While a preliminary examination is not a formal investigation, it allows the court to review evidence and determine whether to investigate suspects on both sides. Prosecutor Fatou Bensouda said her office would "conduct its analysis in full independence and impartiality." The war between Israel and Hamas militants in Gaza last summer left more than 2,000 people dead. The inquiry will include alleged war crimes committed since June. The International Criminal Court was set up in 2002 to prosecute genocide, crimes against humanity and war crimes. CNN's Vasco Cotovio, Kareem Khadder and Faith Karimi contributed to this report.

### Riassunto umano (reference)

>Membership gives the ICC jurisdiction over alleged crimes committed in Palestinian territories since last June. Israel and the United States opposed the move, which could open the door to war crimes investigations against Israelis.

### Riassunto sistema benchmark (gpt-4)

> The Palestinian Authority became the 123rd member of the International Criminal Court (ICC) on Wednesday, gaining the court's jurisdiction over alleged crimes in Palestinian territories. This accession, marked by a ceremony in The Hague, follows the Palestinians' signing of the ICC's Rome Statute in January and accepting its jurisdiction since June 13, 2014. The move, which Israel and the U.S. oppose, allows for potential war crimes investigations against Israelis, but also subjects Palestinians to possible counter-charges. Palestinian Foreign Minister Riad al-Malki hailed the step towards justice and peace, while the ICC emphasized the responsibilities that come with membership. Human Rights Watch supported Palestine's ICC membership, criticizing pressures against it. The ICC's preliminary examination, opened in January, may lead to formal investigations of both sides for alleged war crimes, including those committed during the 2014 Gaza conflict.

### Riassunto del sistema sotto esame (Mistral7b)

> The Palestinian Authority officially joined the International Criminal Court (ICC) on Wednesday as its 123rd member, granting the court jurisdiction over alleged crimes in Palestinian territories. The Palestinians signed the ICC's founding Rome Statute in January and accepted its jurisdiction over crimes committed since June 13, 2014. Israel and the United States opposed their entry into the body. Palestine Foreign Minister Riad al-Malki called it a move towards justice, while Judge Kuniko Ozaki emphasized the responsibilities that come with membership. Human Rights Watch welcomed Palestine's accession to the treaty. The ICC can now open a preliminary examination into alleged war crimes committed by both sides since June 2014. Israel and Hamas's conflict in Gaza last summer left over 2,000 people dead. The court was established in 2002 to prosecute genocide, crimes against humanity, and war crimes.

## Template usati per la valutazione generativa

```python
# Evaluation prompt template based on G-Eval
EVALUATION_PROMPT_TEMPLATE = """
You will be given one summary written for an article. Your task is to rate the summary on one metric.
Please make sure you read and understand these instructions very carefully. 
Please keep this document open while reviewing, and refer to it as needed.

Evaluation Criteria:

{criteria}

Evaluation Steps:

{steps}

Example:

Source Text:

{document}

Summary:

{summary}

Evaluation Form (scores ONLY):

- {metric_name}
"""

# Metric 1: Relevance

RELEVANCY_SCORE_CRITERIA = """
Relevance(1-5) - selection of important content from the source. \
The summary should include only important information from the source document. \
Annotators were instructed to penalize summaries which contained redundancies and excess information.
"""

RELEVANCY_SCORE_STEPS = """
1. Read the summary and the source document carefully.
2. Compare the summary to the source document and identify the main points of the article.
3. Assess how well the summary covers the main points of the article, and how much irrelevant or redundant information it contains.
4. Assign a relevance score from 1 to 5.
"""

# Metric 2: Coherence

COHERENCE_SCORE_CRITERIA = """
Coherence(1-5) - the collective quality of all sentences. \
We align this dimension with the DUC quality question of structure and coherence \
whereby "the summary should be well-structured and well-organized. \
The summary should not just be a heap of related information, but should build from sentence to a\
coherent body of information about a topic."
"""

COHERENCE_SCORE_STEPS = """
1. Read the article carefully and identify the main topic and key points.
2. Read the summary and compare it to the article. Check if the summary covers the main topic and key points of the article,
and if it presents them in a clear and logical order.
3. Assign a score for coherence on a scale of 1 to 5, where 1 is the lowest and 5 is the highest based on the Evaluation Criteria.
"""

# Metric 3: Consistency

CONSISTENCY_SCORE_CRITERIA = """
Consistency(1-5) - the factual alignment between the summary and the summarized source. \
A factually consistent summary contains only statements that are entailed by the source document. \
Annotators were also asked to penalize summaries that contained hallucinated facts.
"""

CONSISTENCY_SCORE_STEPS = """
1. Read the article carefully and identify the main facts and details it presents.
2. Read the summary and compare it to the article. Check if the summary contains any factual errors that are not supported by the article.
3. Assign a score for consistency based on the Evaluation Criteria.
"""

# Metric 4: Fluency

FLUENCY_SCORE_CRITERIA = """
Fluency(1-3): the quality of the summary in terms of grammar, spelling, punctuation, word choice, and sentence structure.
1: Poor. The summary has many errors that make it hard to understand or sound unnatural.
2: Fair. The summary has some errors that affect the clarity or smoothness of the text, but the main points are still comprehensible.
3: Good. The summary has few or no errors and is easy to read and follow.
"""

FLUENCY_SCORE_STEPS = """
Read the summary and evaluate its fluency based on the given criteria. Assign a fluency score from 1 to 3.
"""

```

L'esempio completo con codice e logica della valutazione tramite gpt-4 è disponibile al seguente link: [How to eval abstractive summarization](https://cookbook.openai.com/examples/evaluation/how_to_eval_abstractive_summarization)