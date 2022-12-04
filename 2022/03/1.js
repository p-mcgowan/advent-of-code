const total = require('../util')
  .getInput()
  .reduce((total, line) => {
    if (!line) { return total; }
    const chars = [...line];
    const [a, b] = [chars.splice(0, chars.length / 2), chars];
    const keys = b.reduce((acc, k) => ({ ...acc, [k]: 1 }), {});
    const dupe = a.find(k => k in keys);

    return total + dupe.charCodeAt(0) - (dupe < 'a' ? 38 : 96);
  }, 0);
console.log(total);

