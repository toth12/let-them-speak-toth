import React from "react";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

const Anthology = (props) => {
  ReactGA.pageview("/Fragments");

  return (
    <div className="anthology">
      <Hero text="Testimonial Fragments" />
      <div className="container">
        <h2>
          GIVING VOICE TO THE VOICELESS THROUGH PIECES OF COLLECTIVE SUFFERING
        </h2>
        <br />
        <br />
        <p>
        Reconstructing the experience of the voiceless Holocaust victim, the <i>Drowned</i>, is an impossible task. Their experience and perspective perished with them. However, throughout the essays in the <a href="/essays">Essays</a> section I develop a simple but powerful idea: the experience of the <i>Drowned</i> can be rendered through the pieces of collective suffering. Modern computing technology (described in the <a href="/methods">Methodology section</a> ) has been applied to find some and definitely not all (in total 1000) pieces in the 2700 testimonies that this publication contains. Inspired by words of survivors pieces of collective suffering are represented as <i>testimonial fragments</i>, a representational format I borrowed from philology of ancient texts. <i>Testimonial fragments</i> are short textual fragments extracted from testimonies of survivors; they describe the pieces of collective suffering shared by survivors and those who never returned. In the <a href="/essays">Essays</a> section, you can further read about how I developed <i>testimonial fragment</i> as a representation format; there you can also read about the ethical legacy that motivated me.
        </p>
        <p>
        By clicking on the Explore button below, you can explore <i>testimonial fragments</i> through a hierarchical tree visualization. The main leaves of the tree are various experience domains; by clicking on them you will see groups of textual fragments describing a similar recurring experience (hence, a piece of collective suffering). By clicking on a <i>fragment</i>, you can read, listen or watch the <i>testimonial fragment</i> in the original testimony where computing tools found it (listening in context is not yet realized with all testimonial fragments; in these cases the audio / video recording start at the beginning of the interview; sporadic errors with fragments can occur). 
        </p>
        <div className="center-text">
          <Link className="button brown" to="/tree">
            Let's explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Anthology;
