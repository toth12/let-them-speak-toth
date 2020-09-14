import React from "react";
import TreeChart from "./TreeChart";
import ReactGA from "react-ga";

const Tree = (props) => {
  ReactGA.pageview("/tree");
  return (
    <div className="tree">
      <div className="left background-image">
        <div className="text">
          <h2>Anthology</h2>
          <div className="welcome">
            Select a word to explore
            <br />
            an experience domain
          </div>
        </div>
      </div>
      <div className="right">
        <TreeChart />
      </div>
    </div>
  );
};

export default Tree;
