import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/x-close.svg";
// import essayIndex from "../assets/files/essays/index.json";
import essayIndex from "../assets/files/essays/index";

const getEssay = (essayName) => {
  console.log("getEssay", essayName, essayIndex);

  if (!(essayName in essayIndex)) {
    return essayIndex["default"];
  }

  return essayIndex[essayName];

  //return essayContent["default"];
};

const EssayModal = (props) => {
  const { essayId } = props.match.params;
  const essay = getEssay(essayId);

  const title = essay.title || "Under construction",
    body = essay.body || "Under construction";

  return (
    <div className="testimony-modal-container essay-modal-container">
      <div className="testimony-inner">
        <div className="testimony">
          <div className="content">
            <div className="left">
              <Link to="/essays">
                <img className="close" src={img} />
              </Link>
              <div className="essay-html-outer">
                <div
                  className="essay-html-inner"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            </div>
          </div>
          <div className="clear-both" />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <Hero text={title} />
  //     <div className='container'>
  //       {body}
  //     </div>
  //   </div>

  // )
};

export default EssayModal;
