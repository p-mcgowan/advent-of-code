const input = require('../util').getInput();

const {monkeys} = input.reduce((acc, line) => {
  let match;
  if (match = line.match(/Monkey (\d+)/)) {
    acc.index = +match[1];
    acc.monkeys[acc.index] = { inspections: 0 };
    return acc;
  }
  if (match = line.match(/Starting items: (.*)/)) {
    acc.monkeys[acc.index].items = match[1].split(', ').map(Number);
  }
  if (match = line.match(/Operation: (.*)/)) {
    acc.monkeys[acc.index].op = new Function('old', `${match[1].replace('new = ', 'return ')};`)
  }
  if (match = line.match(/Test: divisible by (\d+)/)) {
    acc.monkeys[acc.index].div = +match[1];
    acc.monkeys[acc.index].test = function(x) {
      return !(x % this.div);
    }
  }
  if (match = line.match(/If true: throw to monkey (\d+)/)) {
    acc.monkeys[acc.index].trueMonkey = +match[1];
  }
  if (match = line.match(/If false: throw to monkey (\d+)/)) {
    acc.monkeys[acc.index].falseMonkey = +match[1];
  }

  return acc;
}, { index: 0, monkeys: [] });

const monkeymod = monkeys.reduce((a, m) => a * m.div, 1);

for (let round = 0; round < 10000; round++) {
  monkeys.forEach(monkey => {
    while (monkey.items.length) {
      const next = monkey.items.shift();
      const newVal = monkey.op(next) % monkeymod;
      const target = monkey[`${monkey.test(newVal)}Monkey`];
      monkeys[target].items.push(newVal);
      monkey.inspections++;
    }
  });
}

const inspections = monkeys
  .sort((a, b) => b.inspections - a.inspections)
  .reduce((a, {inspections}, i) => i < 2 ? a * inspections : a, 1);
console.log(inspections);
