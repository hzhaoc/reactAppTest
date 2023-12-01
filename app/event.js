
function mentionHanlder(e, mention, mentions, setterCallBack) {
  if (mention.value === e.target.value)
    return;
  mention['value'] = e.target.value
  mentions = {...mentions, mention};
  setterCallBack(mentions);
  return;
}

export {mentionHanlder};
