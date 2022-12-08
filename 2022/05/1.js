const input = require('../util')
  .getInput();

let boxes = {};
let line = input.shift();
while (line.indexOf('[') !== -1) {
  const row = [...line];
  for (let i = 1, index = 1; i < line.length; i += 4, index++) {
    boxes[index] = boxes[index] || [];
    if (line[i].trim()) {
      boxes[index].push(line[i]);
    }
  }
  line = input.shift();
}
line = input.shift();

while (input.length && input[0]) {
  const task = input
    .shift()
    .match(/^move (?<count>\d+) from (?<src>\d+) to (?<dest>\d+)$/).groups;
  boxes[task.dest].unshift(...boxes[task.src].splice(0, task.count).reverse());
}

let res = '';
for (let i = 1; i <= Object.keys(boxes).length; i++) {
  res += boxes[i][0];
}
console.log(res);
