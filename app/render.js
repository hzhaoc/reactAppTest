'client-only';

import { CtxMention, CtxMentionSetter, CtxClauses} from './context.js';
import { useContext, useState } from 'react';
import React from 'react';
import {mentionHanlder} from './event.js'
import { createKey } from 'next/dist/shared/lib/router/router.js';


const RenderLeft = ({ text }) => RenderText(text);

const RenderBold = ({ text }) => <strong>{text}</strong>;

const RenderUnderline = ({ text }) => <u>{text}</u>;

const RenderColor = ({ text, color }) => <span style={{ color }}>{text}</span>;

const RenderMention = ({ id }) => {
  const mentions = useContext(CtxMention);
  const mentionSetter = useContext(CtxMentionSetter);

  const mention = mentions[id];
  const styles = {
    "backgroundColor": mention.color ? mention.color : 'none',
  };

  return (
    <>
      <input type="text" value={mention.value} style={styles} onChange={(e) => mentionHanlder(e, mention, mentions, mentionSetter)}>
      </input>
    </>
  );
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
  // title seems not relevant in rendering
  return (
    <>
      <span>{"\n"}</span>
      <span>{renderArray(children)}</span>
    </>
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
  return (
    <>
      <span>{text}</span>
      <p>{renderArray(children)}</p>
    </>
  );
}

const RenderH1 = ({ children }) => <h1>{renderArray(children)}</h1>;
const RenderH2 = ({ children }) => <h2>{renderArray(children)}</h2>;
const RenderH3 = ({ children }) => <h3>{renderArray(children)}</h3>;
const RenderH4 = ({ children }) => <h4>{renderArray(children)}</h4>;
const RenderH5 = ({ children }) => <h5>{renderArray(children)}</h5>;
const RenderH6 = ({ children }) => <h6>{renderArray(children)}</h6>;

const RenderText = ({text}) => {
  // check if this text needs to be rendered as clause
  // text styles are already rendered as part of `renderElement`
  const clauseCtx = useContext(CtxClauses);
  let clauseContractIndex = null;
  if (clauseCtx[text]) {
    clauseContractIndex = clauseCtx[text].contractIndex;
  }

  return (
  <>
    <span>{clauseContractIndex}</span>
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


const Renderer = ({data, mens, clses}) => {
  const [mentions, setMentions] = useState(mens);

  return (
    <div>
      <CtxClauses.Provider value={clses}>
        <CtxMentionSetter.Provider value={setMentions}>
            <CtxMention.Provider value={mentions}>
                {data && data.length > 0 && renderArray(data)}
            </CtxMention.Provider>
          </CtxMentionSetter.Provider>
      </CtxClauses.Provider>
    </div>
  );
}


function renderArray(arrayNode) {
  if (!arrayNode)
    return null;
  return arrayNode.map((element, index) => {
    return <RenderElement key={index} element={element} />;
  });
}

export default Renderer;
