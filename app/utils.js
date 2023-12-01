function preProcessInput(jsonArray, mentions, clauses) {
    if (!jsonArray)
        return;  // necessary for re-render as we read input async with effect
    let clauseIndex = {};
    let clauseLevel = 0;
    searchMentionsClauses(jsonArray, mentions, clauses, clauseLevel, clauseIndex);
}

function searchMentionsClauses(jsonArray, mentions, clauses, clauseLevel, clauseIndex) {
    if (!jsonArray)
        return;
    //console.log("json", jsonArray);
    jsonArray.map((jsonNode) => searchMentionClause(jsonNode, mentions, clauses, clauseLevel, clauseIndex));
}

function searchMentionClause(jsonNode, mentions, clauses, clauseLevel, clauseIndex) {
    addMention(jsonNode, mentions);
    clauseLevel = addClause(jsonNode, clauses, clauseLevel, clauseIndex);
    searchMentionsClauses(jsonNode.children, mentions, clauses, clauseLevel, clauseIndex);
}

function addMention(jsonNode, mentions) {
    if (jsonNode.type && jsonNode.type === 'mention') {
        let mention = {
            id: jsonNode.id,
            color: jsonNode.color,
            value: jsonNode.value,
        };
        mentions[mention.id] = mention;
    }
}

function addClause(jsonNode, clauses, clauseLevel, clauseIndex) {
    if (jsonNode.type && jsonNode.type === 'clause') {
        let node = null;
        if (jsonNode.children && jsonNode.children.length > 0 && jsonNode.children[0].children && jsonNode.children[0].children.length > 0) {
            node = jsonNode.children[0].children[0];
        }
        if (node && node.text) {
            clauseLevel++;
            if (!clauseIndex[clauseLevel]) {
                clauseIndex[clauseLevel] = 0
            }
            clauseIndex[clauseLevel]++;
            //console.log(clauseLevel, clauseIndex[clauseLevel]);
            clauses[node.text] = {
                bold: node.bold ? 'true' : 'false',
                underline: node.underline ? 'true' : 'false',
                level: clauseLevel,
                index: clauseIndex[clauseLevel],
                contractIndex: clauseContractIndex(clauseLevel, clauseIndex[clauseLevel]),
            };
        }
    }
    return clauseLevel;
}

function clauseContractIndex(level, levelIndex) {
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


export {preProcessInput};
