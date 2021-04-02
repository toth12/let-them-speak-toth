import React from "react";
import Hero from "./Hero";
import ReactGA from "react-ga";

const Essays = (props) => {
  ReactGA.pageview("Monograph");

  return (
    <div>
      <Hero text="Monograph" />
      <div className="container">
        <blockquote>
          "They couldn't walk, couldn't talk, kept on saying we should say
          Kaddish after them, we should remember them."
        </blockquote>
        <Titles />
      </div>
    </div>
  );
};

const essayListPart0 = [
  {
    title: "The Voice of the Voiceless",
    epigraph: "How Can We Let Them Speak?",
    file: "/essays/how_to_read",
  },
];
const essayListPart1 = [
  {
    title: "The Last Wish of the Voiceless",
    epigraph: "a Legacy",
    file: "/essays/essay-2",
  },
  {
    title: "The Void",
    epigraph:
      "from Imagining to Knowing",
    file: "/essays/essay-3",
  },
  {
    title: "The Voice of the Voiceless and the Collectively Endured Experience",
    epigraph: "The 'Suitcase Analogy'",
    file: "/essays/essay-4",
  },
];

const essayListPart2 = [
  {
    title: "Collective Experience",
    epigraph:
      "World of Possibilities from the Victims' Perspective",
    file: "/essays/essay-5",
  },
  {
    title: "Recurrence",
    epigraph:
      "Discovering the Collective Experience of Persecutions",
    file: "/essays/essay-6",
  },
  {
    title: "The Universality of Suffering",
    epigraph:
      "Bridging the Gap between the Past and the Present",
    file: "/essays/essay-7",
  },
];

const essayListPart3 = [
  {
    title: "Testimonial Fragment",
    epigraph:
      "Pieces of the Collective Suffering",
    file: "/essays/essay-8",
  },
  {
    title: "Heterogeneity and Homogeneity",
    epigraph:
      "the Dual Representation of Testimonial Fragments",
    file: "/essays/essay-9",
  },
  {
    title: "Testimonial Fragment",
    epigraph:
      "a Window to Emotional Realities from the Remote Past",
    file: "/essays/essay-10",
  },
];

const essayListPart4 = [
  {
    title: "Epilogue",
    epigraph: "Two Histories of the Holocaust and the Need for a New Epistemology",
    file: "/essays/essay-11",
  },
];

const Titles = (props) => (
  <div className="essay-titles">
    <h2>I. Prologue</h2>
    {essayListPart0.map((t, idx) => (
      <a href={t.file} className="essay-title" key={idx} target="_self">
        {idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}
    <h2>II. From Their Last Wish to the Collective Experience</h2>
    {essayListPart1.map((t, idx) => (
      <a href={t.file} className="essay-title" key={idx} target="_self">
        {idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}
    <h2>III. From the Collective Experience to the Collective Suffering</h2>
    {essayListPart2.map((t, idx) => (
      <a href={t.file} className="essay-title" key={idx} target="_self">
        {idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}

    <h2>IV. Representation of the Collective Suffering</h2>
    {essayListPart3.map((t, idx) => (
      <a href={t.file} className="essay-title" key={idx} target="_self">
        {idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}

    <h2>V. Epilogue</h2>
    {essayListPart4.map((t, idx) => (
      <a href={t.file} className="essay-title" key={idx} target="_self">
        {idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}
  </div>
);

export default Essays;
