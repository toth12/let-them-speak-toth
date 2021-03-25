import React from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

const Home = (props) => {
  ReactGA.pageview("Home");

  return (
    <div className="home background-image">
      <div className="top">
        <div className="brand" />
        <div>
          <div className="welcome">
            Gabor Mihaly Toth
            <br />
            <br />
            In Search of the Drowned: <br />
            Testimonies and Testimonial Fragments of the Holocaust
            <br />
            <br />
            Yale Fortunoff Archive, USC Shoah Foundation, United States
            Holocaust Memorial Museum
          </div>
        </div>
        <Link className="button brown" to="/about">
          Let's explore
        </Link>
      </div>
      <div className="bottom">
        <hr />
        <p>
          Funded by Fortunoff Video Archive, USC Shoah Foundation, USC Viterbi
          School of Engineering and built in collaboration with the Yale Digital
          Humanities Lab
        </p>
      </div>
    </div>
  );
};

export default Home;
