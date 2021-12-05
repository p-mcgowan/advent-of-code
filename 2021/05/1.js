const file = process.argv[2] || `${__dirname}/test`;
const input = require('fs').readFileSync(file, 'utf8').split('\n');
input.pop();

let x = 0;
let y = 0;

const parsed = [];
for (const line of input) {
  const {x1, y1, x2, y2} = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/g.exec(line).groups;
  x = Math.max(x, x1, x2);
  y = Math.max(y, y1, y2);
  if (x1 === x2 || y1 === y2) {
    parsed.push({
      x1: Math.min(x1, x2),
      x2: Math.max(x1, x2),
      y1: Math.min(y1, y2),
      y2: Math.max(y1, y2),
    });
    // console.log(parsed[parsed.length - 1])
  }
}

const values = Array.from(Array(y + 1)).map(() => Array.from(Array(x + 1)).fill(0));
const draw = () => console.log(
  values.reduce((a, line) => `${a}\n${line.reduce((l, i) => `${l} ${i.toString().padStart(2, ' ')}`, '')}`, '')
);

for (const {x1, y1, x2, y2} of parsed) {
  console.log({x1, y1, x2, y2});
  for (let y = y1; y <= y2; ++y) {
    for (let x = x1; x <= x2; ++x) {
      values[y][x]++;
    }
  }
}

draw()
console.log(values.flat().filter(x => x > 1).length)
