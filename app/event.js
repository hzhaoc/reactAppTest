
function mentionHanlder(e, mention, mentions, setterCallBack) {
  if (mention.value === e.target.value)
    return;
  let newMention = {...mention, value: e.target.value};
  mentions.set(mention.id, newMention);
  setterCallBack(new Map([...mentions]));
  return;
}

export {mentionHanlder};
