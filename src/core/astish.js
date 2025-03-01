let newRule = /(?:([a-z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi;
let ruleClean = /\/\*[\s\S]*?\*\/|\s{2,}|\n/gm;

/**
 * Convert a css style string into a object
 * @param {String} val
 * @returns {Object}
 */
export let astish = (val) => {
    let tree = [{}];
    let block;

    while ((block = newRule.exec(val.replace(ruleClean, '')))) {
        // Remove the current entry
        if (block[4]) tree.shift();

        if (block[3]) {
            tree.unshift((tree[0][block[3]] = tree[0][block[3]] || {}));
        } else if (!block[4]) {
            tree[0][block[1]] = block[2];
        }
    }

    return tree[0];
};
