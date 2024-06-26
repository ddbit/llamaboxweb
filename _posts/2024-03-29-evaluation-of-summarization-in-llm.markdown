---
layout: post
title:  "Evaluation of the Summarization Task for LLM: The Good, The Bad, and The Ugly"
date:   2024-03-22
slug: summary-eval
permalink: /evaluation-of-summarization-task-llm-the-good-the-bad-the-ugly
excerpt: In this article we discuss the various metrics for evaluating a summarization task. In particular, we will fine-tune the tools for measuring the results of the summarization of Mistral 7b, the article will overview the various metrics for a single summarization example from the dataset labeled CNN/News.
image: /images/posts/good-bad-ugly.jpg
---


## Method followed
The approach we will follow in this paper is as follows: we take a full text and generate a summary of it using the model we want to test (Mistral7b in this case).
To compare the synthesis generated by our model (jokingly called the Ugly) we will take 3 other syntheses:

- manual summary that represents our reference
- Another summary generated by a model that we consider more experienced, in this case we will use the gpt-4 model.(called the Good)
- A completely "wrong" summary (called the Bad) e.g. N random words. To highlight whether the metrics are consistent with expectations.

![good bad ugly](/images/posts/good-bad-ugly.jpg)

## Metrics used.

- **ROUGE-3**: Measures the overlap of trigrams (three-word sequences) between the generated and reference summaries.

- **ROUGE-L**: Calculates the longest common sub-sequence, considering word order, between generated and reference summary.

- **BLEU**: Evaluates translation quality by measuring the accuracy of n-grams between translated and reference text.

- **METEOR**: Combines accuracy and n-gram recall, considering synonyms, morphology and sentence structure.

- **BERTScore**: Uses BERT representations to assess semantic similarity between generated summary and reference summary.

Finally, we will use a set of metrics based on an external evaluator model, again this is GPT4, trained to perform the evaluation function. This approach is inspired by the article [How to eval abstractive summarization](https://cookbook.openai.com/examples/evaluation/how_to_eval_abstractive_summarization).

The method proposed by OpenAI is based on four distinct criteria:

- **Relevance**: Evaluates whether the summary includes only important information and excludes redundancies.
- **Coherence**: Assesses the logical flow and organization of the summary.
- **Consistency**: Checks whether the summary is in line with the facts in the source document.
- **Fluidity**: Assesses the grammar and readability of the summary.

For each of these criteria, we create prompts (prompts) by taking the original document and the abstract as input, using thought chain generation, and driving the model to obtain a numerical score from 1 to 5 for each criterion.

## Results from non-generative metrics

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

## Results from generative metrics

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


## Interpretation of the results

Metrics such as Rouge and Bleu say little about the semantics of syntheses. In our case then the Bleu metric seems completely inactive. It needs to be understood whether this is because of a configuration error or because this metric only fits the case of translation between different languages.

Regarding the metrics generated by gpt-4 we cannot be completely satisfied since between our model and the benchmark the scores are always the same and equal to the maximum possible. Probably the metrics need to be fine-tuned with some prompt engineering so as to diversify the result between a good synthesis and a very good synthesis. It should also be mentioned that we used gpt-4 in zero-shot mode, i.e., without an evaluation example from us. It is possible that by including several supervised examples in the prompt the result of the metrics will be more accurate.


## Attachments

(ed. the fact that the text used as an article example refers to episodes of military crisis between Israel and Palestine is entirely coincidental. It is the first item in the CNN/News dataset used extensively in many scholarly works)

### Full text of the article

>(CNN)The Palestinian Authority officially became the 123rd member of the International Criminal Court on Wednesday, a step that gives the court jurisdiction over alleged crimes in Palestinian territories. The formal accession was marked with a ceremony at The Hague, in the Netherlands, where the court is based. The Palestinians signed the ICC's founding Rome Statute in January, when they also accepted its jurisdiction over alleged crimes committed "in the occupied Palestinian territory, including East Jerusalem, since June 13, 2014." Later that month, the ICC opened a preliminary examination into the situation in Palestinian territories, paving the way for possible war crimes investigations against Israelis. As members of the court, Palestinians may be subject to counter-charges as well. Israel and the United States, neither of which is an ICC member, opposed the Palestinians' efforts to join the body. But Palestinian Foreign Minister Riad al-Malki, speaking at Wednesday's ceremony, said it was a move toward greater justice. "As Palestine formally becomes a State Party to the Rome Statute today, the world is also a step closer to ending a long era of impunity and injustice," he said, according to an ICC news release. "Indeed, today brings us closer to our shared goals of justice and peace." Judge Kuniko Ozaki, a vice president of the ICC, said acceding to the treaty was just the first step for the Palestinians. "As the Rome Statute today enters into force for the State of Palestine, Palestine acquires all the rights as well as responsibilities that come with being a State Party to the Statute. These are substantive commitments, which cannot be taken lightly," she said. Rights group Human Rights Watch welcomed the development. "Governments seeking to penalize Palestine for joining the ICC should immediately end their pressure, and countries that support universal acceptance of the court's treaty should speak out to welcome its membership," said Balkees Jarrah, international justice counsel for the group. "What's objectionable is the attempts to undermine international justice, not Palestine's decision to join a treaty to which over 100 countries around the world are members." In January, when the preliminary ICC examination was opened, Israeli Prime Minister Benjamin Netanyahu described it as an outrage, saying the court was overstepping its boundaries. The United States also said it "strongly" disagreed with the court's decision. "As we have said repeatedly, we do not believe that Palestine is a state and therefore we do not believe that it is eligible to join the ICC," the State Department said in a statement. It urged the warring sides to resolve their differences through direct negotiations. "We will continue to oppose actions against Israel at the ICC as counterproductive to the cause of peace," it said. But the ICC begs to differ with the definition of a state for its purposes and refers to the territories as "Palestine." While a preliminary examination is not a formal investigation, it allows the court to review evidence and determine whether to investigate suspects on both sides. Prosecutor Fatou Bensouda said her office would "conduct its analysis in full independence and impartiality." The war between Israel and Hamas militants in Gaza last summer left more than 2,000 people dead. The inquiry will include alleged war crimes committed since June. The International Criminal Court was set up in 2002 to prosecute genocide, crimes against humanity and war crimes. CNN's Vasco Cotovio, Kareem Khadder and Faith Karimi contributed to this report.

## Human made summary (the reference)

>Membership gives the ICC jurisdiction over alleged crimes committed in Palestinian territories since last June. Israel and the United States opposed the move, which could open the door to war crimes investigations against Israelis.

### Summary from benchmark model (gpt-4)

> The Palestinian Authority became the 123rd member of the International Criminal Court (ICC) on Wednesday, gaining the court's jurisdiction over alleged crimes in Palestinian territories. This accession, marked by a ceremony in The Hague, follows the Palestinians' signing of the ICC's Rome Statute in January and accepting its jurisdiction since June 13, 2014. The move, which Israel and the U.S. oppose, allows for potential war crimes investigations against Israelis, but also subjects Palestinians to possible counter-charges. Palestinian Foreign Minister Riad al-Malki hailed the step towards justice and peace, while the ICC emphasized the responsibilities that come with membership. Human Rights Watch supported Palestine's ICC membership, criticizing pressures against it. The ICC's preliminary examination, opened in January, may lead to formal investigations of both sides for alleged war crimes, including those committed during the 2014 Gaza conflict.

### Summary of the tested model (Mistral7b)

> The Palestinian Authority officially joined the International Criminal Court (ICC) on Wednesday as its 123rd member, granting the court jurisdiction over alleged crimes in Palestinian territories. The Palestinians signed the ICC's founding Rome Statute in January and accepted its jurisdiction over crimes committed since June 13, 2014. Israel and the United States opposed their entry into the body. Palestine Foreign Minister Riad al-Malki called it a move towards justice, while Judge Kuniko Ozaki emphasized the responsibilities that come with membership. Human Rights Watch welcomed Palestine's accession to the treaty. The ICC can now open a preliminary examination into alleged war crimes committed by both sides since June 2014. Israel and Hamas's conflict in Gaza last summer left over 2,000 people dead. The court was established in 2002 to prosecute genocide, crimes against humanity, and war crimes.

## Templates used for the generative metrics

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

The complete example with code and logic is available here: [How to eval abstractive summarization](https://cookbook.openai.com/examples/evaluation/how_to_eval_abstractive_summarization)