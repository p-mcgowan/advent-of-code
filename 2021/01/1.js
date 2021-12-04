const input = require('fs').readFileSync('./input', 'utf8').split('\n');

let prev;
let incs = 0;
for (const line of input) {
  const cur = parseInt(line, 10);
  if (typeof prev !== 'number') {
    prev = cur;
    continue;
  }
  if (cur > prev) {
    incs++;
  }
  prev = cur;
}

console.log(incs);
