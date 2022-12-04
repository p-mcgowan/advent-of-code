const total = require('../util')
  .getInput()
  .reduce((acc, line) => {
    if (acc.groups.length < 3) {
      if (!line) { return acc; }
      acc.groups.push([...line]);
      return acc;
    }

    const first = acc.groups.pop()
      .reduce((keys, k) => ({ ...keys, [k]: 1 }), {})
    const second  = acc.groups.pop().reduce((s, k) =>
      k in first ? { ...s, [k]: 1 } : s, {});
    const dupe = acc.groups.pop().find(k => k in second);

    acc.total += dupe.charCodeAt(0) - (dupe < 'a' ? 38 : 96);
    acc.groups.push([...line]);

    return acc;
  }, { groups:[], total: 0 });
console.log(total.total);

