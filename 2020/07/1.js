const { readFileSync } = require('fs');
const input = readFileSync('./tinput.txt', 'utf8').split('\n');
input.pop();

const map = {};
for (let line of input) {
  console.log(line);
  const [source, ...targets] = line.split(/ bags contain | bags?[., ]+/);
  targets.pop();
  if (targets[0] === 'no other') {
    continue;
  }

  targets.forEach(t => {
    let [count, ...name] = t.split(' ');
    name = name.join(' ');
    map[name] = { ...(map[name] || {}), [source]: +count };
  });
}
let bags = ['shiny gold'];
let containers = {};
while (bags.length) {
  const b = bags.pop();
  if (!map[b]) { continue; }
  Object.keys(map[b]).forEach(k => {
    bags.push(k);
    containers[k] = true;
  });
}
console.log(map);
console.log(Object.keys(containers).length);
