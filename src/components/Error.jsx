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
        <span>Please contact an administrator: dhlab@yale.edu</span>
      </div>
    </div>
  );
};

export default Err;
