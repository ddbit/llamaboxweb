# Dalle Reti Neurali Ricorrenti (RNN) ai Transformer: la svolta.

All you need is love ... ma non per l'AI. Piuttosto ["Attention Is All You Need"](https://arxiv.org/abs/1706.03762) è il seminal paper del 2017 da cui inizia la svolta. Si definisce una nuova architettura di #naturallanguageprocessing basata sul concetto di "attenzione" che scala meglio delle precedenti soluzioni.

Una lettura densa ma interessante che consiglio a chi vuole iniziare a capire perché ChatGPT sa fare quello che sa fare.

Le **Reti Neurali Ricorrenti (Recurrent Neural Networks, RNN)** e i **Transformer** sono due architetture di rete neurale utilizzate per elaborare dati sequenziali, ma hanno differenze significative nella loro struttura e nel modo in cui gestiscono le informazioni.

## Reti Neurali Ricorrenti (RNN):

- Le RNN sono progettate per gestire sequenze di dati, come il testo o le serie temporali.
- Hanno un ciclo che consente alle informazioni di persistere, passando da un passo temporale al successivo. Questo ciclo può essere considerato come una memoria che mantiene informazioni sui passaggi precedenti.
- Le RNN soffrono spesso di problemi come la scomparsa o l'esplosione del gradiente, che rendono difficile l'apprendimento di dipendenze a lungo termine nei dati.
- Le varianti più avanzate di RNN, come le **LSTM (Long Short-Term Memory)** e le **GRU (Gated Recurrent Units)**, sono state sviluppate per mitigare questi problemi e sono in grado di catturare dipendenze a lungo termine meglio delle RNN standard.

## Transformer:

- I Transformer sono stati introdotti nel paper "Attention is All You Need" di Vaswani et al. nel 2017 e sono diventati lo stato dell'arte per molte applicazioni di elaborazione del linguaggio naturale.
- A differenza delle RNN, i Transformer non utilizzano cicli e sono completamente basati su meccanismi di attenzione per pesare l'importanza di diverse parti di una sequenza.
- I Transformer sono in grado di gestire tutte le parti di una sequenza contemporaneamente (elaborazione parallela), il che li rende molto più veloci e efficienti rispetto alle RNN per sequenze lunghe.
- La struttura del Transformer gli permette di catturare dipendenze a lungo termine senza i problemi di scomparsa o esplosione del gradiente tipici delle RNN.

In sintesi, mentre le RNN lavorano sequenzialmente e possono avere difficoltà con le dipendenze a lungo termine, i Transformer gestiscono le sequenze in modo parallelo e sono molto più efficaci nell'apprendere queste dipendenze, il che li rende particolarmente adatti per applicazioni come la traduzione automatica, la generazione di testo e altre complesse attività di elaborazione del linguaggio naturale.


# Il Concetto di "Attention" nel Paper "Attention Is All You Need"

Il paper in questione si può considerare il punto di svolta nell'evoluzione dei modelli di linguaggio. Punto dal quale sono poi stati sviluppati i modelli LLM oggi in voga tra cui GPT e LLama.

Il concetto di "attention" nel documento ["Attention Is All You Need"](https://arxiv.org/abs/1706.03762) si riferisce a un meccanismo che permette ai modelli di focalizzarsi su parti specifiche di un input quando eseguono una determinata compito. Di seguito è riportata una spiegazione dettagliata basata sulle informazioni trovate nel documento:

## Scaled Dot-Product Attention:

- Questo tipo di attenzione, chiamato "Scaled Dot-Product Attention", è una componente chiave dell'architettura Transformer.
- L'input consiste in query e chiavi di dimensione \( d_k \), e valori di dimensione \( d_v \).
- Si calcolano i prodotti scalari delle query con tutte le chiavi, si divide ciascuno per \( \sqrt{d_k} \), e si applica una funzione softmax per ottenere i pesi sui valori.
- In pratica, la funzione di attenzione viene calcolata su un insieme di query simultaneamente, raggruppate in una matrice Q. Anche le chiavi e i valori sono raggruppati in matrici K e V. Si calcola la matrice di output come segue:
  
  \[ \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V \]

## Multi-Head Attention:

- Il meccanismo di Multi-Head Attention consiste di diverse layer di attenzione che operano in parallelo.
- Questo approccio permette al modello di prestare attenzione a informazioni diverse da parti diverse della sequenza di input.
- Ogni "testa" di attenzione può catturare diversi tipi di relazioni tra i dati di input e output.

## Self-Attention:

- Il self-attention, a volte chiamato intra-attention, è un meccanismo di attenzione che collega diverse posizioni di una singola sequenza per calcolare una rappresentazione della sequenza.
- Questo permette al modello di considerare l'intera sequenza di input per ogni output, facilitando la cattura di dipendenze a lungo termine.

## Efficienza del Transformer:

- Il Transformer riduce il numero di operazioni necessarie per apprendere dipendenze tra posizioni distanti in una sequenza a un numero costante, a differenza delle RNN che richiedono un numero di operazioni proporzionale alla distanza tra le posizioni.
- Questo rende il Transformer più efficiente, specialmente per sequenze lunghe, poiché può gestire l'elaborazione in parallelo piuttosto che sequenzialmente.
