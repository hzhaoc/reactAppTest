function findTitle(title, children) {
    // find title of a clause
    // either title, or in children[0].title
    if (title)
        return title;
    if (children.length > 0)
        return children[0].title;
    return null;
}

function getClauseIndex(level, levelIndex) {
    let A = 'abcdefghijklmnopqrstuvwxyzs'
    let tabs = ' '.repeat((level-1)*4);
    let char;
    if (level % 2 == 0) {
        char = A.charAt(levelIndex-1);
    } else {
        char = levelIndex.toString();
    }
    let finalIndex = tabs + char + '.  ';
    return finalIndex;
}

function shouldSetClauseTitle(text, title) {
    var target = text.split('.').join("").split(' ')[0];
    return title.split(' ')[0] === target;
}

function getClauseContractTableIndex(text, clauseTitle, level, clauses) {
    var clauseIdx = null;
    if (clauseTitle && shouldSetClauseTitle(text, clauseTitle)) {
        // recognize the correct node to render clause title
        // get correct level from context
        // get correct index using a global cache `clauses`
        let i;
        const lvl = level;
        if (!clauses.has(lvl)) {
          clauses.set(lvl, new Map());
          clauses.get(lvl).set(clauseTitle, 1);
          i = 1;
        } else if (!clauses.get(lvl).has(clauseTitle) ){
          i = clauses.get(lvl).size + 1;
          clauses.get(lvl).set(clauseTitle, i);
        } else {
          i = clauses.get(lvl).get(clauseTitle);
        }
        clauseIdx = getClauseIndex(lvl, i);
      }
    return clauseIdx;
}

function searchMentions(jsonArray) {
    // recursively preprocess and eventually return map of mentions from input json array 
    if (!jsonArray)
        return new Map();
    let mentions = new Map();
    jsonArray.map((jsonNode, index) => {
        mentions = new Map([...mentions, ...searchMentions_(jsonNode)]);
    });
    return mentions;
}

function searchMentions_(jsonNode) {
    // recursively preprocess and eventually return map of mentions from input json node
    let mentions = new Map();
    let mention;
    if (jsonNode.type && jsonNode.type === 'mention') {
        mention = {
            id: jsonNode.id,
            color: jsonNode.color,
            value: jsonNode.value,
        };
        mentions.set(mention.id, mention);
    }
    return new Map([...mentions, ...searchMentions(jsonNode.children)]);
}

export {findTitle, getClauseIndex, shouldSetClauseTitle, getClauseContractTableIndex, searchMentions};
