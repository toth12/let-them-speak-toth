import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Hero from "./Hero";
import Loader from "./Loader";
import Pagination from "./Pagination";
import Filters from "./Filters";
import ResultsCount from "./ResultsCount";
import Err from "./Error";
import { filtersChanged } from "../lib/filters";
import { fetchTestimony, highlightSentences } from "../actions/testimony";
import {
  fetchSearchResults,
  showInstructions,
  previousPage,
  nextPage,
  getPage,
  perPage,
} from "../actions/search";
import ReactGA from "react-ga";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillUnmount() {
    this.props.showInstructions();
  }

  componentDidUpdate(prevProps) {
    if (filtersChanged(prevProps, this.props)) {
      this.props.search($("#search-input").value);
    }
  }

  nextPage() {
    if (this.props.page + 1 < this.props.resultCount / perPage) {
      this.props.nextPage();
    }
  }

  render() {
    return (
      <div>
        <Hero>
          <Input search={this.props.search} />
        </Hero>
        <div className="container page-search">
          {this.props.instructions ? (
            <Instructions />
          ) : (
            <Content nextPage={this.nextPage} {...this.props} />
          )}
        </div>
      </div>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeys = this.handleKeys.bind(this);
  }

  handleKeys(e) {
    if (e.keyCode === 13 && e.target.value) {
      ReactGA.event({
        category: "Usage",
        action: "Searched corpus",
      });
      this.props.search(e.target.value);
    }
  }

  render() {
    return (
      <div className="search-container">
        <div className="input-container">
          <div className="background-image glass" />
          <input
            id="search-input"
            type="text"
            placeholder="Search Term"
            onKeyDown={this.handleKeys}
          />
        </div>
      </div>
    );
  }
}

const Instructions = (props) => (
  <div className="instructions">
    <h2>Simple Search</h2>
    <p>
      You can search for a simple word or a sequence of words in the testimony transcripts this edition contains. By inserting <i>you</i> or{" "}
      <i>you went</i> into the search box, you will be given a filterable
      concordance of their occurrences, and following a click, you can read
      search results in context, i.e. in the interview transcripts. (listening in context is available; interviews are played
      from the beginning). By means of the box on the left side, search results
      can be also filtered in terms of the following metadata on interviews and
      interviewees:
    </p>
    <p>
      <ul>
        <li>- Collection</li>
        <li>- Gender</li>
        <li>- Ghetto</li>
        <li>- Camp</li>
        <li>- Interviewee Name</li>
        <li>- Interview Call Number</li>
        <li>- Recording Year</li>
      </ul>
    </p>
    <p>
      In the <a href="/methods">Methodology</a> section, you can read more about
      how metadata provided by each institution had been processed and made available here. In the Methodology section, you can also read about how transcripts were processed and incorporated into this edition.
    </p>
    <h2>Corpus Search</h2>
    <p>
      In addition to simple search, you can also search the collection of Holocaust interviews as a linguistic
      corpus. For this, you need to use the Corpus Query Language
      (henceforth, CQL). This is a pattern matching language used to extract
      information from large body of linguistically annotated texts. Below you can find a short explanation of what linguistic annotation and linguistic corpus mean. 
      </p>
      <p>
      By clicking <a href="https://github.com/toth12/cql-tutorials/blob/main/Notebooks/complete-cql-guide-without-code.ipynb" target="_blank">here</a>, you can download my comprehensive tutorial about the use of CQL.
      </p>
      <p>
      Below you can also find short use case
      examples that highlight how CQL can offer insights into Holocaust experiences. The use case examples have the following structure. First, a Holocaust related research
      problem that traditional word search cannot resolve is outlined. Second,
      how CQL can help to tackle the research problem is explained. Third, examples of CQL queries are given. 
      </p>
      <p>
    Use case examples are organized according to
    three core layers of textuality: individual words, sequences of words, sentences. You can use CQL to search these three layers; moreover, you can combine these three layers into complex queries and include paratextual events such as for instance crying and pauses by interviewees. Finally, you can filter search results produced by CQL through the box appearing on the left side following a search.
    </p>
    <p>
    The list of paratextual event codes provided by USC can be downloaded from <a href="https://github.com/toth12/cql-tutorials/blob/main/paratextual_USC.csv" target="_blank">here</a>.
    </p>
    <p>
    

    The list of paratextual event codes provided by the Fortunoff Archive can be downloaded from <a href="https://github.com/toth12/cql-tutorials/blob/main/paratextual_Fortunoff.md" target="_blank">here</a>.
    </p>


 
    <h2>What is a linguistic</h2>
    <p>
      In a linguistic corpus, the grammatical category of each word (named
      part-of-speech category and abbreviated as <i>pos</i> here), as well as its dictionary form (named <i>lemma</i>) are identified and stored in a specific database. The computer-assisted process of identifying the <i>lemma</i> and the <i>pos</i> here of every word in a collection of texts is called linguistic annotation. (How the
      linguistic corpus was constructed from interview transcripts is
      explained in the <a href="/methods">Methodology</a> section.) The grammatical categories and their abbreviated forms used to  annotate the interview corpus can be found{" "}
      <a
        href="https://github.com/toth12/cql-tutorials/blob/main/PennPOSTags.pdf"
        target="_blank">
        here.
      </a>
      </p>
      <p>
      The database that stores the results of linguisitc annotation is a corpus engine. This facilitates not only the storage but also the efficient search through millions of words. The corpus engine that empowers this project is the <a href="http://inl.github.io/BlackLab/" target="_blank">BlackLab Engine</a> developed by the  Dutch Language Institute.    

    </p>
    

    <p>
      <h2>Word Level Search</h2>
    </p>
    <p>
      <br />
      <br />
      1. <b>Find all possible forms of a verb with the lemma attribute</b>:{" "}
      <i>flee, flees, fleeing</i>, and <i>fled</i>

    </p>
    <p>
      <b>Research Problem:</b>
    </p>
    <p>
      Readers searching for moments in interviews when a victim is recalling the
      experience of fleeing face a difficulty: a simple search of <i>flee</i>{" "}
      would not find suffixed forms such as <i>fleeing</i> and <i>flees</i>.
    </p>
    <p>
      <b>Solution:</b>
    </p>
    <p>
      The corpus engine stores the lemma of every word in the 2700 transcripts;
      in more technical terms, each word in the corpus has a lemma attribute. As
      a result, readers can use the <i>lemma</i> attribute as a search criterium
      to find all possible suffixed forms of a noun or a verb such as{" "}
      <i>flee</i>. In CQL, attributes used as search criteria have to be placed
      between a pair of square brackets, which will then match individual words.
    </p>
    <p>
      <code>[lemma="flee"]</code>
    </p>
    <p>
      This pattern matches all words the dictionary form or lemma of which is{" "}
      <i>flee</i>; the engine will return a concordance of sentences where
      different forms of flee occur.
    </p>
    <p>
      On the other hand, CQL can also find the occurrences of one given word
      form with the help of the <i>word</i> attribute. For instance, readers
      might want to find all occurrences of <i>fleeing</i>. In this case they
      can formulate their CQL query in the following way:
    </p>
    <p>
      <code>[word="fleeing"]</code>
    </p>
    
    <p>
      Note that matching by
      the word attribute is the same as a simple word search.
    </p>

    <p>
      <br />
      <br />
      2. <b>Disambiguate with part-of-speech information</b>: <i>fly</i>{" "}
      (meaning <i>insect</i>) versus <i>fly</i> (meaning{" "}
      <i>travel through air</i>)<br />
    </p>
    <p>
      <b>Research Problem:</b>
    </p>
    <p>
      Readers want to find textual contexts where victims talk about the
      experience of being bothered by flies. By entering <i>fly</i> or{" "}
      <i>flies</i> to the search box, they are also given textual contexts where{" "}
      <i>fly</i> means <i>traveling through air</i>.
    </p>
    <p>
      <b>Solution:</b>
    </p>
    <p>
      CQL enables the combination of lemma and grammatical category, defined
      through the <i>pos</i> attribute, which can be used for disambiguation.
    </p>

    <p>
    The following query finds all occurrences of <i>fly</i>, including its suffixed forms, where <i>fly</i> is used as a noun.
    </p>
    <p>
      <code>[lemma="fly" & pos="N.*"]</code>
    </p>
    <p>
    The following query finds all occurrences of <i>fly</i>, including its suffixed forms, where <i>fly</i> is used as a verb.
    </p>
    <p>
      <code>[lemma="fly" & pos="V.*"]</code>
    </p>
    <p>
      This example highlights two very important features of CQL. First,
      attributes can be connected with the & operator; this expresses the
      logical relationship that natural languages express with <i>and</i>. In
      other words, the pattern above matches a given word if its lemma is{" "}
      <i>fly</i> and if it is used as a verb. 
      </p>
      <p>

      Second, when defining the content
      of an attribute, CQL enables character level pattern matching, also known
      as regular expression. In the example above, the <i>pos </i>attribute,
      standing for grammatical category, is defined by the sequence of V, dot,
      and an asterisk: V.* In this{" "}
      <a
        href="https://github.com/toth12/cql-tutorials/blob/main/PennPOSTags.pdf"
        target="_blank"
      >
        list
      </a>
      , you will find the abbreviations of all grammatical categories used
      to annotate interview transcripts. But you will not find V; instead you
      will for instance find VB (base form of a verb) or VBN (past participle of
      a verb). V.* will still match all possible verbal formats thanks to
      character level pattern matching. The use of dot with asterisk indicates
      that after V there can be any number of additional characters. In more
      technical terms, dot stands for a wildcard character; the asterisk, known
      as a quantifier, tells that V can be followed by 0 or more wildcard
      characters. Hence, V.* covers both VB or VBN. In CQL, just as in regular
      expression, not only the asterisk but also other quantifiers are available
      (see {" "}
      <a
        href="https://github.com/toth12/cql-tutorials/blob/main/Notebooks/complete-cql-guide-without-code.ipynb"
        target="_blank"
      >
        my tutorial
      </a>
      ).
    </p>
    <p>
      <br />
      <br />
      3. <b>Search for synonyms with multiple lemmas:</b>{" "}
      <i>mother, mummy, etc.</i>
    </p>
    <p>
      <b>Research Problem:</b>
    </p>
    <p>
      Readers want to find textual contexts where victims speak about the
      experience of mothers, which can be expressed through a number of synonyms
      (<i>mum, mummy, mom, etc.</i>). A simple word search does not include
      synonyms.
    </p>
    <p>
      <b>Solution:</b>
    </p>
    <p>
      With CQL readers can search for multiple lemmas at the same time; they can
      thus define an entire synonym set within one search.
    </p>
    <p>
      <code>
        [lemma="mother" | lemma="mum" | lemma = "mummy" | lemma = "mom" | lemma
        = "mommy"]
      </code>
    </p>
    <p>
      {" "}
      In this pattern, the elements of the mother synonym set are connected with
      |, which is the <i>or</i> operator in CQL. The pattern finds terms the
      dictionary form of which is <i>mother</i> or <i>mum</i> or <i>mom</i>.
    </p>
    <p>
      <br />
      <br />
      4. <b>Find terms with spelling variants:</b> <i>capo</i> and <i>kapo</i>.
    </p>
    <p>
      <b>Research Problem:</b>
    </p>
    <p>
      The same term can be present in the data with different spellings. For
      instance, you can find both <i>capo</i> and <i>kapo</i> in the
      transcripts.
    </p>
    <p>
      <b>Solution:</b>
    </p>
    <p>
      <code>[lemma = "(c|k)apo"]</code>
    </p>
    <p>
      This pattern will match a word if the first character of its lemma is
      either <i>k</i> or <i>c</i> and if this first character is followed by the
      sequence <i>apo</i>. The first character is isolated from the remaining
      characters by means of parenthesis, which is a grouping operator; the{" "}
      <i>either or</i> relation is expressed by |.
    </p>

    <p>
      <br />
      <br />
      5. <b>Find terms with both British and American spelling: </b>
      <i>labour</i> and <i>labor</i>
    </p>
    <p>
      <b>Research Problem:</b>
    </p>
    <p>
      Transcripts follow sometimes the British sometimes the American spelling
      system. For instance, both <i>labour</i> and <i>labor</i> are present in
      the transcripts. It is therefore recommended to run searches in terms of
      both spelling systems.{" "}
    </p>
    <p>
      <b>Solution:</b>
    </p>
    <p>
      <code>[lemma="labo(u?)r"]</code>
    </p>
    <p>
      This pattern will match both <i>labour</i> and <i>labor</i>. With the help
      of the ? operator, the presence of <i>u</i> is becoming optional. In other
      words, <i>u</i>, isolated as a group by means of parenthesis, can be
      absent or it can be present. The query above can be also expressed
      with 0,1 surrounded by curly bracket, which explicitly quantifies the
      minimum and maximum number of times a character can be present.
    </p>
    <p>
      <code>[lemma="labo(u&#123;0,1&#125;)r"]</code>
    </p>

    <p>
      <br />
      <br />
      6. <b>
        Differentiate homonymic terms with the help of case sensitivity
      </b>: <i>Joint</i> (The American Joint Distribution Committee) versus{" "}
      <i>joint</i> (body part)
    </p>
    <p>
      <b>Research Problem:</b>
    </p>
    <p>
      Our default search is agnostic to case-sensitivity. By searching for{" "}
      <i>joint</i> or <i>Joint</i>, readers will be given occurrences where{" "}
      <i>joint</i> either refers to the colloquial name of{" "}
      <i>The American Joint Distribution Committee</i> or to a body part. One
      thus needs to differentiate the two meanings of joint.
    </p>
    <p>
      <b>Solution:</b>
    </p>

    <p>
      Since <i>Joint</i> as the colloquial name of{" "}
      <i>The American Joint Distribution Committee</i> always begins with a
      capital letter, case-sensitivity can be used to enforce CQL to find only
      those instances where the first letter is capitalized.
    </p>

    <p>
      <code>[word="(?-i)Joint"]</code>
    </p>
    <p>
      Case sensitivity is enforced by means of (?-i). At the same time, the
      pattern above still matches Joint as a body part if it is at the beginning
      of a sentence.
    </p>

    <p>
      <h2>Sequence Matching</h2>
    </p>

    <p>
      <br />
      1. <b>Search for possible word sequences:</b>{" "}
      <i>mothers were crying, mother cried, mother started to cry</i>
    </p>

    <p>
      <b>Research Problem:</b>
    </p>

    <p>
      The retrieval of moments when an interviewee is speaking about mothers
      crying is difficult. This can be expressed in a variety of ways and
      between <i>mother</i> and <i>cry</i> there can be multiple terms.
    </p>

    <p>
      <b>Solution:</b>
    </p>

    <p>
      <code>[lemma="mother"] []&#123;0,3&#125; [lemma="cry"]</code>
    </p>

    <p>
      This pattern matches sequences where a term, the dictionary form of which
      is <i>mother</i>, is followed by another term, the dictionary form of
      which is <i>cry</i>, within a window of maximum three words. &#123;0,3&#125; {" "}
      signs that between c<i>ry</i> and <i>mother</i> there can be zero or
      maximum 3 terms; [] signs that the term in-between can be any word.
    </p>

    <p>
      <br />
      <br />
      2.{" "}
      <b>
        Match sequences with similar meaning through grouping operation:
      </b>{" "}
      <i>I will never forget</i> and <i>I will alway remember</i>

    </p>

    <p>
      <b>Research Problem:</b>
    </p>

    <p>
      A key moment in an interview when a victim tells the phrase,{" "}
      <i>I will never forget</i>. But this can be also expressed as{" "}
      <i>I will always remember</i>, <i>I couldn’t forget</i>.
    </p>

    <p>
      <b>Solution:</b>
    </p>

    <p>
      First, one needs to write two sequences in which either <i>I, never</i>,
      <i>n’t</i>, which expresses negation, and <i>forget</i> or{" "}
      <i>I, always,</i> and <i>remember</i> occur.
    </p>

    <p>
      <code>
        [word="I"] []&#123;0,5&#125;[word="never" | word = "n't" ] [lemma="forget"]
      </code>
    </p>

    <p>
      <code>[word="I"] []&#123;0,5&#125;[word="always"] [lemma="remember"]</code>
    </p>

    <p>
      Second, the two sequences need to be connected as groups with the{" "}
      <i>or</i> (|) operator; grouping is done with the help of parenthesis.
    </p>

    <p>
      <code>
        ([word="I"] []&#123;0,5&#125;[word="never" | word = "n't" ] [lemma="forget"])
        | ([word="I"] []&#123;0,5&#125;[word="always"] [lemma="remember"])
      </code>
    </p>

    <p>
      <br />
      <br />
      3. <b>Find repetitive sequences:</b> <i>why, why, why</i> 
      </p>
      <p>
      <b>Research Problem:</b>
      </p>
    
      <p>
      The repetition of the same term can signal moments when traumatic memories are recalled. Finding repetitive uses of words is not possible with traditional word search.
      </p>

      <p>
      <b>Solution:</b>
      </p>
      <p>
      We need to create a sequence and declare that elements of the sequence are the same. In the example below, we create a sequence of three terms divided by commas, and in the last step we declare that elements of the sequence are the same words.
      </p>

      <p>
      <code>
      A:[] [","] B:[] [word=","] B:[] :: A.word = B.word
      </code>
      </p>
    

    <h2>Matching Sentences</h2>

    <p>
      <br />
      <br />
      1. <b>Find rhetorical questions:</b>{" "}
      <i> why should I fear death?
      </i>{" "}
    </p>

      <p>
      <b>Research Problem:</b>
      </p>
      <p>
      An interesting moment in testimonies when survivors ask - rhetorical - questions from themselves; sometimes these rhetorical questions are addressing the reason why something happened in the past.
      </p>

      <p>
      <b>Solution:</b>
      </p>
      <p>
      CQL can match complete sentences that contain certain patterns. In the example below, we are looking for a sententence that begins with <i>why</i> followed by <i>I</i> (with minimum one word in-between) and ends with a question mark.
      </p>

      <p>
      <code>
      &lt;s/&gt;containing ([word="why"] []&#123;1,3&#125; [word="I"] []&#123;0,10&#125; [word="?"] )
      </code>
      </p>

    <p>
      <br />
      <br />
      2. <b>Find analogies:</b>  
      <i>like animals
      </i>
    </p>
 
      <p>
      <b>Research Problem:</b>
      </p>
      <p>
      Survivors often use analogies to describe their experiences. In English <i>like</i> is a preposition that can be used to express analogies. However <i>like</i> can be both a preposition meant to draw comparisons and a verb expressing wish or affection.
      </p>

      <p>
      <b>Solution:</b>
      </p>

      <p>
      CQL language can be used to distinguish <i>like</i> as a verb from <i>like</i> as a preposition. Furtermore, with CQL we can also form a sequence in which <i>like</i> as a prepositions is followed by a noun.
      </p>

      <p>
      <code>
      [lemma="like" & pos="IN"] [pos="N.*"]
      </code>
      </p>
    

    <p>
      <br />
      <br />
      3. <b>Find possibilities:</b>  
      <i>if I march and I fall, they will shoot me
      </i>
    </p>

      <p>
      <b>Research Problem:</b>
      </p>
      <p>
     Survivors often recall troubling possibilities they faced during persecutions; retrieving these possibilities is almost impossible since they are often not expressed directly as possibilities. 
      </p>

      <p>
      <b>Solution:</b>
      </p>

      <p>
      Conditional sentences or if sentences often convey possibilities experienced in the past; through the sequence <i>if</i> and <i>i</i>followed by a verb we can find examples for possibilities from the past.
      </p>

      <p>
      <code>
      [word="if"] [word="i"] [pos="V.*"]
      </code>
      </p>
    

    <p>
      <br />
      <br />
      3. <b> Find moments of survivor guilt:</b>  
      <i>I should have died, they should have lived
      </i>
      </p>
      <p>
      <b>Research Problem:</b>
      </p>
      <p>Survivors' guilt is a leitmotif in testimonies, though survivors do not always express it explicitly.
      </p>

      <p>
      <b>Solution:</b>
      </p>

      <p>
     We can form a sequence consisting of <i>I</i> followed by <i>should</i>, <i>have</i>, and the past participle of a verb.
      </p>

      <p>
      <code>
      [word="i"] [word="should"] [word="have"] [pos="VBN"]
      </code>
      </p>
    




    <h2>Finding Paratextual Events</h2>

    <p>
      <br />
      <br />
      1. <b> Find moments of silence</b>  
    </p>
     
      <p>
      <b>Research Problem:</b>
      </p>
      <p>Testimonies are often interrupted by moments when survivors were unable to carry on with recalling their memories. (See above links to resources containing the paratextual event codes.)
      </p>

      <p>
      <b>Solution:</b>
      </p>

      <p>
    Since these moments are signed by the term PAUSES in uppercase, you can search for them with the following query.
      </p>

      <p>
      <code>
      [word="(?-i)PAUSES"]
      </code>
      </p>
    
    

    <p>
      <br />
      <br />
      2. <b> Find moments of crying</b>
    </p>
     

      <p>
      <b>Research Problem:</b>
      </p>
      <p>Testimonies are often interrupted by crying. (See above links to resources containing the paratextual event codes.)
      </p>

      <p>
      <b>Solution:</b>
      </p>

      <p>
      Since these moments are signed by the term CRYING in uppercase, you can search for them with the following query.
      </p>

      <p>
      <code>
      [word="(?-i)CRYING"]
      </code>
      </p>
    
   
  </div>
);

class Content extends React.Component {
  render() {
    let content;
    if (this.props.searchErr) {
      return <Err errorType="SearchErr" />;
    } else if (this.props.testimonyErr) {
      return <Err errortType="TestimonyErr" />;
    } else if (this.props.searching && !this.props.resultCount) {
      return <Loader />;
    } else {
      return <Results {...this.props} />;
    }
  }
}

const Results = (props) => (
  <section className="results">
    <div className="restore-instructions" onClick={props.showInstructions}>
      Back to Instructions&rarr;
    </div>
    <ResultsCount resultCount={props.resultCount} />
    <div>
      {props.searching ? <Loader /> : null}
      <Filters />
      <ResultTable {...props} />
      {props.resultCount && props.resultCount > perPage ? (
        <Pagination
          items={props.resultCount}
          activePage={props.page}
          perPage={perPage}
          pageClick={props.getPage}
          leftArrowClick={props.previousPage}
          rightArrowClick={props.nextPage}
        />
      ) : null}
    </div>
  </section>
);

const ResultTable = (props) => (
  <div className="results-table">
    <div className="row headers">
      <div className="idx">No.</div>
      <div className="id">Shelfmark</div>
      <div className="exerpt">Excerpt</div>
    </div>
    <div className="rows">
      {props.results.map((r, i) => (
        <Result
          key={i}
          idx={props.page * perPage + i + 1}
          result={r}
          fetchTestimony={props.fetchTestimony}
          highlightSentences={props.highlightSentences}
        />
      ))}
    </div>
  </div>
);

const Result = (props) => (
  <div
    className="row"
    onClick={() => {
      props.highlightSentences({
        start: props.result.token_start,
        end: props.result.token_end,
        testimonyId: props.result.testimony_id,
        lookupSentences: true,
      });
      props.fetchTestimony(props.result.testimony_id);
    }}
  >
    <div className="idx">{props.idx}</div>
    <div className="id">{props.result.shelfmark}</div>
    <div className="hit-left">{getHit(props.result.left, "left")}</div>
    <div className="hit-highlight">{getHit(props.result.match, "match")}</div>
    <div className="hit-right">{getHit(props.result.right, "right")}</div>
  </div>
);

const getHit = (str, side) => {
  const length = 20;
  const matchLen = 16;
  str = str.trim();
  switch (side) {
    case "left":
      return "..." + clean(str.substring(str.length - length, str.length));
    case "match":
      return str.length <= matchLen
        ? str
        : clean(str.substring(0, matchLen / 2)) +
            "..." +
            clean(str.substring(str.length - matchLen / 2, str.length));
    case "right":
      return clean(str.substring(0, Math.min(length, str.length))) + "...";
  }
};

// reserved chars -/\^$*+?.()|[]{} TODO: linearize
const clean = (s) => {
  // reserved characters
  s = s.replace(/ \./g, ".");
  s = s.replace(/ \?/g, "?");
  // non-reserved characters
  s = s.replace(/ !/g, "!");
  s = s.replace(/ ;/g, ";");
  s = s.replace(/ ,/g, ",");
  s = s.replace(/ :/g, ":");
  s = s.replace(/ '/g, "'");
  s = s.replace(/ "/g, '"');
  s = s.replace(/ --/g, " -- ");
  return s.trim();
};

const $ = (selector) => document.querySelector(selector);

Result.PropTypes = {
  fetchTestimony: PropTypes.func.isRequired,
  highlightSentences: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  result: PropTypes.shape({
    left: PropTypes.string.isRequired,
    match: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    shelfmark: PropTypes.string.isRequired,
    testimony_id: PropTypes.string.isRequired,
    token_start: PropTypes.number.isRequired,
    token_end: PropTypes.number.isRequired,
  }),
};

const sharedProps = {
  fetchTestimony: PropTypes.func.isRequired,
  highlightSentences: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  getPage: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchErr: PropTypes.bool,
  searching: PropTypes.bool,
  testimonyErr: PropTypes.bool,
  instructions: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  resultCount: PropTypes.number,
  results: PropTypes.arrayOf({
    left: PropTypes.string.isRequired,
    match: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    shelfmark: PropTypes.string.isRequired,
    testimony_id: PropTypes.string.isRequired,
    token_start: PropTypes.number.isRequired,
    token_end: PropTypes.number.isRequired,
  }).isRequired,
};

Search.PropTypes = sharedProps;
Content.PropTypes = sharedProps;
Results.PropTypes = sharedProps;
ResultTable.PropTypes = sharedProps;

const mapStateToProps = (state) => ({
  searching: state.search.searching,
  instructions: state.search.instructions,
  results: state.search.results,
  resultCount: state.search.resultCount,
  page: state.search.page,
  selected: state.filters.selected,
  years: state.filters.years,
  searchErr: state.search.err,
  testimonyErr: state.testimony.err,
});

const mapDispatchToProps = (dispatch) => ({
  showInstructions: () => dispatch(showInstructions()),
  search: (phrase) => dispatch(fetchSearchResults(phrase)),
  previousPage: () => dispatch(previousPage()),
  nextPage: () => dispatch(nextPage()),
  getPage: (page) => dispatch(getPage(page)),
  fetchTestimony: (testimonyId) => dispatch(fetchTestimony(testimonyId)),
  highlightSentences: (obj) => dispatch(highlightSentences(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
