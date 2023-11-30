import { ClauseLevel, ClauseTitle } from './Context.js';
import { useContext } from 'react';
import React from 'react';
import {findTitle, getClauseIndex, shouldSetClauseTitle, getClauseContractTableIndex} from './utils.js';


const RenderLeft = ({ text }) => RenderText(text);

const RenderBold = ({ text }) => <strong>{text}</strong>;

const RenderUnderline = ({ text }) => <u>{text}</u>;

const RenderColor = ({ text, color }) => <span style={{ color }}>{text}</span>;

const RenderMention = ({ color, children, variableType }) => {
  // since mention is a node with one child that is a text node. 
  // directly render it here and stop going further.
  const value = children[0].text;
  const styles = {
    "backgroundColor": color ? color : 'none',
  };
  return <span style={styles}>{value}</span>;
};

const RenderLi = ({ children }) => <li>{renderArray(children)}</li>;

const RenderLiC = ({ children }) => <>{renderArray(children)}</>;

const RenderUl = ({ children }) => {
  return (
    <>
      <ul style={{"listStyleType": 'disc'}}>{renderArray(children)}</ul>
    </>
  )
};

const RenderClause = ({title, children}) => {
  const level = useContext(ClauseLevel);
  const finalTitle = findTitle(title, children);

  return (
    <ClauseTitle.Provider value={finalTitle}>
      <ClauseLevel.Provider value={level+1}>
        <span>{"\n"}</span>
        <span>{renderArray(children)}</span>
      </ClauseLevel.Provider>
    </ClauseTitle.Provider>
  );
}

const RenderBlock = ({ children }) => {
  return (
    <>
      <span>{"\n"}</span>
      <div className='preWrap'>{renderArray(children)}</div>
    </>
  );
};

const RenderP = ({ text, children }) => {
  // Warning: validateDOMNesting(...): <ul> cannot appear as a descendant of <p>. due input
  if (text && !children)
    // this is a special case due input. see README.md#note
    return <span>{text}</span>;

  return <p>{renderArray(children)}</p>;
}

const RenderH1 = ({ children }) => <h1>{renderArray(children)}</h1>;
const RenderH2 = ({ children }) => <h2>{renderArray(children)}</h2>;
const RenderH3 = ({ children }) => <h3>{renderArray(children)}</h3>;
const RenderH4 = ({ children }) => <h4>{renderArray(children)}</h4>;
const RenderH5 = ({ children }) => <h5>{renderArray(children)}</h5>;
const RenderH6 = ({ children }) => <h6>{renderArray(children)}</h6>;

const RenderText = ({text}) => {
  const clauseTitle = useContext(ClauseTitle);
  const level = useContext(ClauseLevel);
  
  let clauseIdx = getClauseContractTableIndex(text, clauseTitle, level, clauses);

  return (
  <>
    <span>{clauseIdx}</span>
    <span>{text}</span>
  </>
  );
};

const RenderElement = (ctx) => {
  
  const styles = {
    fontWeight: ctx.element.bold ? 'bold' : 'normal',
    textDecoration: ctx.element.underline ? 'underline' : 'none',
  };

  switch (ctx.element.type) {
    case 'text':
      return <span style={styles}><RenderText {...ctx.element} /></span>;
    case 'bold':
      return <span style={styles}><RenderBold {...ctx.element} /></span>;
    case 'underline':
      return <span style={styles}><RenderUnderline {...ctx.element} /></span>;
    case 'color':
      return <span style={styles}><RenderColor {...ctx.element} /></span>;
    case 'mention':
      return <span style={styles}><RenderMention {...ctx.element} /></span>;
    case 'li':
      return <span style={styles}><RenderLi {...ctx.element} /></span>;
    case 'lic':
      return <span style={styles}><RenderLiC {...ctx.element} /></span>;
    case 'ul':
      return <span style={styles}><RenderUl {...ctx.element} /></span>;
    case 'clause':
      return <span style={styles}><RenderClause {...ctx.element} /></span>;
    case 'block':
      return <span style={styles}><RenderBlock {...ctx.element} /></span>;
    case 'p':
      return <span style={styles}><RenderP {...ctx.element} /></span>;
    case 'h1':
      return <span style={styles}><RenderH1 {...ctx.element} /></span>;
    case 'h2':
      return <span style={styles}><RenderH2 {...ctx.element} /></span>;
    case 'h3':
      return <span style={styles}><RenderH3 {...ctx.element} /></span>;
    case 'h4':
      return <span style={styles}><RenderH4 {...ctx.element} /></span>;
    case 'h5':
      return <span style={styles}><RenderH5 {...ctx.element} /></span>;
    case 'h6':
      return <span style={styles}><RenderH6 {...ctx.element} /></span>;
    default:
      return <span style={styles}><RenderText {...ctx.element} /></span>;
  }
};


const clauses = new Map();  // {level : {clauseTitle : level_index, ..., }, ...,  }


const ServiceAgreementPage = ({ arrayNode }) => {
  return (
    <div>
      <ClauseLevel.Provider value={0}>
        {renderArray(arrayNode)}
      </ClauseLevel.Provider>
    </div>
  );
}

function renderArray(arrayNode) {
  return arrayNode.map((element, index) => {
    return <RenderElement key={index} element={element} />;
  });
}

export default ServiceAgreementPage;
