//const input = require('fs').readFileSync('./input', 'utf8').split('\n');
const input = require('fs').readFileSync(`${__dirname}/input`, 'utf8').split('\n');

let m = [...input[0]].map(() => 0);
for (const line of input) {
  const bits = [...line].forEach((b, i) => (m[i] += +b));
}
m = m.map((sum) => +(sum > input.length / 2));
d = m.map((b) => +!b);

console.log(m, d);
console.log(parseInt(m.join(''), 2) * parseInt(d.join(''), 2));
