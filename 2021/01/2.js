const input = require('fs').readFileSync('./input', 'utf8').split('\n');

let w = input.splice(0, 3);

let prev;
let incs = 0;
while (input.length) {
  const cur = w.reduce((a, i) => a + +i, 0);
  if (typeof prev === 'number' && cur > prev) {
    incs++;
  }
  prev = cur;
  w.shift();
  w.push(input.shift());
}

console.log(incs);
