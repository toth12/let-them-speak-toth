import React from "react";
import ReactGA from "react-ga";

const Err = (props) => {
  ReactGA.event({
    category: "User Experience",
    action: "Error",
    label: props.errorType,
  });
  return (
    <div className={"center-text " + props.className || ""}>
      <div className="error">
        <span>Sorry, an error occurred. Try reformatting your search.</span>
        <span> For further assistance please contact the author: gabor.toth@aya.yale.edu</span>
      </div>
    </div>
  );
};

export default Err;
