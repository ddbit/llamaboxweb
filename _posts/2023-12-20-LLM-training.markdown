---
layout: post
title:  "Large Language Models (LLM): pre-training, fine-tuning o prompt engineering"
date: 2023-12-19 17:02:16 +0000
categories: jekyll update
---


Il costo di training per i modelli LLM si misura in petaflop/s day (PFSD) che poi significa 86400e15 operazioni FLOP.

Per fare 1 PFSD ci vogliono 8 Nvidia v100s, oppure 2 Nvidia A100 che si trovano su Amazon a circa $8000 l'una.

Questo grafico estratto da [1] ci da un'idea del numero di operazioni necessarie, senza entrare del merito del costo operativo reale che naturalmente è sicuramente superiore a quello del semplice hardware.

[1] Brown, Tom, et al. "Language models are few-shot learners." Advances in neural information processing systems 33 (2020): 1877-1901.

![image](/images/training-cost.png)
