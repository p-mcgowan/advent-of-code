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
while (true) {
  if (seen[i]) {
    break;
  }
  seen[i] = op;
  const [op, arg] = input[i].split(' ');
  ops[op](arg);
}
console.log(acc);
