import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/x-close.svg';


const essayContent = {
  "default": {
    title: "Essay not found",
    body: (<div>
      <p>The essay you requested was not found. The link may be invalid, or the essay may not yet be published.</p>
      <p><Link to="/essays">Click here to return to essay index.</Link></p>
    </div>)
  }
}

const getEssay = essayName => {
  if (!(essayName in essayContent)) {
    return essayContent["default"];
  }

  return essayContent[essayName];

  //return essayContent["default"];
}

const EssayModal = props => {
  const { essayId } = props.match.params;
  const essay = getEssay(essayId);

  const title = essay.title || "Under construction",
    body = essay.body || "Under construction";

  return (<div className='testimony-modal-container'>
    <div className='testimony-inner'>
      <div className='testimony'>
        <div className='content'>
          <div className="left">
          <Link to="/essays"><img className='close' src={img} /></Link>
            <h3>{title}</h3>
            <div>{body}</div>
          </div>
        </div>
        <div className='clear-both' />
      </div>
    </div>
  </div>)

  // return (
  //   <div>
  //     <Hero text={title} />
  //     <div className='container'>
  //       {body}
  //     </div>
  //   </div>

  // )
}

export default EssayModal;
