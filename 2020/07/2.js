const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n');

const map = {};
for (let line of input) {
  const [source, ...targets] = line.split(/ bags contain | bags?[., ]+/);
  targets.pop();
  if (targets[0] === 'no other') {
    continue;
  }

  targets.forEach((t) => {
    let [count, ...name] = t.split(' ');
    name = name.join(' ');
    map[source] = { ...(map[source] || {}), [name]: +count };
  });
}
let bags = [['shiny gold', 1]];
let containers = 0;
while (bags.length) {
  const [b, c] = bags.pop();
  containers++;
  if (!map[b]) {
    continue;
  }
  Object.entries(map[b]).reduce((a, [k, v]) => {
    for (let i = 0; i < v; ++i) {
      bags.push([k, 1]);
    }
    return a + v;
  }, 0);
}
console.log(containers - 1);
