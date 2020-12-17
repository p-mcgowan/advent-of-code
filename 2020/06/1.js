const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n\n');

const v = input.reduce((sum, set) => {
  const uniq = [...set].reduce((a, v) => (v == '\n' ? a : Object.assign(a, { [v]: (a[v] || 0) + 1 })), {});
  return sum + Math.max(0, Object.keys(uniq).length);
}, 0);
console.log(v);
