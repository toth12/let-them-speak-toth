# Linguistic Annotation


[todo: change data repo links once finalized]
Cite as: Gabor M. Toth, <i>In Search of the Drowned, Testimonies and Testimonial Fragments of the Holocaust</i> (Place: Publisher, Year), URL.

The Holocaust testimonies published in this edition have been annotated linguistically. In this section, first I explain what linguistic annotation means. Second, I present the computing tool, the Stanford Parser, I used to annotate testimony transcripts. Third, I discuss the limits of linguistic annotation, as well as the problems it involves, through some tangible examples. The computational process applied to annotate testimony transcripts is available in this <a href="https://github.com/YaleDHLab/shoah-foundation-data.git" target="_blank">data repository</a>.

<h2>1. What is linguistic annotation</h2>

Linguistic annotation is a computational process that transforms a plain text into a linguistic corpus.

In an annotated corpus each word and each sentence are distinguished. Most importantly, as explained in the [Search section](/search), they are searchable in a variety ways. One can for instance search a linguistic corpus by combining the linguistic category of a word with its dictionary form (see concrete examples in the [Search section](/search)).  

The linguistic annotation of a plain text corpus, such as the collection of testimony transcripts underlying this edition, consists of the following steps:

1.Sentence splitting: a plain text is split into sentences

2.Tokenization: within sentences individual words are distinguished

3.Part-of-speech (POS) tagging: the linguistic category of each word is identified

4.Corpus construction: results of the steps above are saved in a machine readable format so that a corpus search engine can index them and make them searchable

<h2>2. The Stanford Parser</h2>

To annotate the testimony transcripts, I used the Stanford Parser developed by the Stanford Natural Language Group (https://nlp.stanford.edu/) at Stanford University. The Stanford Parser is a probabilistic parser that draws on knowledge of human languages gathered from manually annotated corpus. In more technical terms, the Stanford Parser was trained on a manually annotated training corpus. Based on knowledge gathered throughout the training process, it is able to annotate any new text. 
Consider the following two sentences:

<i>"And he sat down on the bench and it said, not for Jews. But he had covered the writing."</i>

<i>"She was writing letters in Germans (..)."</i>

The Stanford Parser assigned noun to <i>writing</i> in the first sentence and verb to <i>writing</i> in the second sentence. It could correctly guess the linguistic category of writing because it must have seen a lot instances that writing preceded by was is a verb and writing preceded by the is a noun.

As a whole, I used the Stanford Parser for sentence splitting, tokenization, and for part-of-speech tagging.

<h2>3. The Folia XML format</h2>

The results of the linguistic annotation was saved in the Folia XML format. This is a specific data format to store linguistically annotated textual corpora. The BlackLab engine empowering this edition used annotated testimony transcripts in the Folia XML format as input (see a description of the Folia format, http://proycon.github.io/folia/). 



<h2>4. Some limitations of linguistic annotation</h2>

Linguistic annotation is a computational process that cannot produce 100% accurate results. Sometimes parsers make mistakes, which I demonstrate through three examples.

First, parsers sometimes cannot correctly distinguish words as distinct units. In the following sentence, the Stanford Parser distinguished <i>wh-when</i> as a separate word, though it should have produced <i>wh</i> and <i>when</i>.

"<i>Eva was not religious and she opted -- wh-when we got to Sengale.</i>"

Sometimes, parsers cannot guess the correct linguistic category of a word. 

Consider the following example.

"<i>Stay here, cook for me.</i>"

The parser assigned the linguistic category noun to <i>cook</i>, though it is a verb in this sentence.

Finally, I would like to demonstrate the limit of linguistic annotation with a frequent "term" used in testimonies. This is <i>um</i>, an exclamation expressing hesitation by the speaker. Despite that it is an exclamation without lexical meaning, in the testimony corpus it occurs as a noun.