const input = require('../util').getInput();

const res = input.reduce((acc, line) => {
  if (!line) { return acc; }

  const [op, n] = line.split(' ');
  acc.cycle++;
  if (acc.cycle >= acc.check) {
    acc.sum += acc.check * acc.register;
    acc.check += 40;
  }

  if (op !== 'noop') {
    acc.cycle++;
    acc.register += +n;
  }

  return acc;
}, { check: 20, register: 1, sum: 0, cycle: 1 });
console.log(res);
