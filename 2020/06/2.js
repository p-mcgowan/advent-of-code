const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').slice(0, -1).split('\n\n');

const v = input.reduce((sum, set) => {
  let n = 1;
  const uniq = [...set].reduce((a, v) => {
    if (v == '\n') {
      n++;
      return a;
    }
    return Object.assign(a, { [v]: (a[v] || 0) + 1 });
  }, {});
  const all = Object.values(uniq).filter((v) => v == n).length;
  console.log(set, all);
  return sum + all;
}, 0);
console.log(v);
