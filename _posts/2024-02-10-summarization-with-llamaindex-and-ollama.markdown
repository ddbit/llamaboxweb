---
layout: post
title:  "Summarization with Llamaindex and a Local Model"
date:   2024-02-10 17:02:16 +0000
image: /images/posts/summarization-with-llamaindex/vault-guy-reads-summary.webp
last_modified: 2024-05-06
---

The summarizations examples in [Llamaindex website](https://docs.llamaindex.ai/en/stable/getting_started/concepts.html) are always based on the OpenAI connection. In this short article we will show how to setup a local model and pass it to the summarization task.

![cover](/images/posts/summarization-with-llamaindex/vault-guy-reads-summary.webp)

## Dependencies

First and foremost you need [Ollama](https://ollama.com/), the runtime engine to load and query against a pretty decent number of pre-trained LLM.

Then of course you need LlamaIndex

## Loading Ollama and Llamaindex in the code

In the code below we instantiate the llm via Ollama and the service context to be later passed to the summarization task. We select **Mistral** as LLM, but you can choose any other model that can run with Ollama.


```python
print("loading ollama...")
from llama_index.llms import Ollama
from llama_index import ServiceContext
llm = Ollama(model="mistral", request_timeout=10.0)
service_context = ServiceContext.from_defaults(llm=llm,embed_model="local")
print("DONE")
```
## Loading the document to be summarized
Here we load the document from a local file. However, given the ```Reader``` capabilities of LlamaIndex classes you can load from remote url or any other support.


```python
print("loading data ...")
from llama_index import SimpleDirectoryReader
reader = SimpleDirectoryReader(
    input_files=["../docs/essay.txt"]
)
docs = reader.load_data()
text = docs[0].text
print("DONE")
```

## Summarizing, finally!

```python
print("summarizing ...")
from llama_index.response_synthesizers import TreeSummarize
summarizer = TreeSummarize(service_context=service_context,verbose=True)
response =  summarizer.get_response("what is all about?", [text])
print(response)
```





