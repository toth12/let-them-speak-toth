import React from "react";
import TreeChart from "./TreeChart";
import ReactGA from "react-ga";

const Tree = (props) => {
  ReactGA.pageview("/tree");
  return (
    <div className="tree">
      <div className="left background-image">
        <div className="text">
          <div className="welcome">
            <br />
            <br />
            Click on a word
            <br />
            to explore an experience
            <br />
            <br />
            <br />
            Click on a fragment
            <br />
            to explore the context
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
