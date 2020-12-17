const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n');
if (input[input.length - 1] == '') {
  input.pop();
}

let seen = {};
let i = 0;
let acc = 0;

const ops = {
  nop: () => i++,
  jmp: (arg) => (i += +arg),
  acc: (arg) => {
    acc += +arg;
    i++;
  },
};

let history = input.reduce((a, v, i) => (/nop|jmp/.test(v) ? [...a, i] : a), []);
let swapped = -1;

const change = (i) => {
  const [op, args] = input[i].split(' ');
  let swp = `jmp ${args}`;
  if (op == 'jmp') {
    swp = `nop ${args}`;
  }
  input[i] = swp;
  swapped = i;
};

const revertChange = () => {
  if (swapped != -1) {
    change(swapped);
  }
  swapped = -1;
};

const reset = () => {
  revertChange();
  change(history.pop());
  seen = {};
  i = 0;
  acc = 0;
};

reset();
while (i < input.length && history.length) {
  const [op, arg] = input[i].split(' ');
  if (seen[i]) {
    reset();
    console.log();
    continue;
  }

  seen[i] = input[i];
  ops[op](arg);

  if (i === input.length) {
    break;
  }
}
console.log(acc);
