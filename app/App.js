import { useState } from "react";


import React from 'react';

const RenderText = ({ text }) => {
  return <span>{text}</span>;
}

const RenderBold = ({ text }) => <strong>{text}</strong>;

const RenderUnderline = ({ text }) => <u>{text}</u>;

const RenderColor = ({ text, color }) => <span style={{ color }}>{text}</span>;

const RenderMention = ({ color, children, variableType }) => {
  const value = children[0].text; // improve: should be more robust
  const styles = {
    "background-color": color ? color : 'none',
  };
  return <span style={styles}>{value}</span>;
};

const RenderLi = ({ children }) => <li>{children.map(RenderElement)}</li>;

const RenderLiC = ({ children }) => <li>{children.map(RenderElement)}</li>;

const RenderUl = ({ children }) => <ul>{children.map(RenderElement)}</ul>;

const RenderClause = ({ title, children }) => {
  // track and number clause in context
  return (
    <div>
      <span>{children.map((element, index) => RenderElement(element, index))}</span>
    </div>
  );
}

const RenderBlock = ({ children }) => <div>{children.map(RenderElement)}</div>;

const RenderP = ({ text, children }) => {
  if (text) {
    return (
      <p>
        {text}
      </p>
    );
  }
  return (
    <p>{children.map(RenderElement)}</p>
  );
}

const RenderH1 = ({ children }) => <h1>{children.map(RenderElement)}</h1>;

const RenderH2 = ({ children }) => <h2>{children.map(RenderElement)}</h2>;

const RenderH3 = ({ children }) => <h3>{children.map(RenderElement)}</h3>;

const RenderH4 = ({ children }) => {
  return (
    <h4>
      {children.map((element, index) => RenderElement(element, index))}
    </h4>
  );
}

const RenderLeaf = ({text}) => {
  return <span>{text}</span>;
}

const RenderElement = (element, index) => {
  const styles = {
    fontWeight: element.bold ? 'bold' : 'normal',
    textDecoration: element.underline ? 'underline' : 'none',
    //"background-color": element.color ? element.color : 'none',
  };
  
  switch (element.type) {
    case 'text':
      return <span style={styles}><RenderText key={index} {...element} /></span>;
    case 'bold':
      return <span style={styles}><RenderBold key={index} {...element} /></span>;
    case 'underline':
      return <span style={styles}><RenderUnderline key={index} {...element} /></span>;
    case 'color':
      return <span style={styles}><RenderColor key={index} {...element} /></span>;
    case 'mention':
      return <span style={styles}><RenderMention key={index} {...element} /></span>;
    case 'li':
      return <span style={styles}><RenderLi key={index} {...element} /></span>;
    case 'lic':
      return <span style={styles}><RenderLiC key={index} {...element} /></span>;
    case 'ul':
      return <span style={styles}><RenderUl key={index} {...element} /></span>;
    case 'clause':
      return <span style={styles}><RenderClause key={index} {...element} /></span>;
    case 'block':
      return <span style={styles}><RenderBlock key={index} {...element} /></span>;
    case 'p':
      return <span style={styles}><RenderP key={index} {...element} /></span>;
    case 'h1':
      return <span style={styles}><RenderH1 key={index} {...element} /></span>;
    case 'h4':
      return <span style={styles}><RenderH4 key={index} {...element} /></span>;
    default:
      return <span style={styles}><RenderLeaf key={index} {...element} /></span>;
  }
};

const ServiceAgreementPage = ({ content }) => {

  return (
    <div>
      {content.map((element, index) => RenderElement(element, index))}
    </div>
  );
}

export default ServiceAgreementPage;
