const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n').map(Number);
if (input[input.length - 1] == '') {
  input.pop();
}

const preamble = 25;

const getPrev = (i) => {
  let a = {};
  for (let j = i - preamble; j < i; j++) {
    for (let k = j; k < i; k++) {
      Object.assign(a, { [input[j] + input[k]]: true });
    }
  }
  return a;

  return input
    .slice(i - preamble, i - 1)
    .reduce((a, v, j, n) => (!(j + 1 - n.length) ? a : n.slice(j + 1 - n.length).reduce((_, w, k, m) => Object.assign(a, { [v + w]: true }), a)), {});
};

for (let i = preamble; i < input.length; ++i) {
  let pre = getPrev(i);
  //console.log(pre);
  if (!pre[input[i]]) {
    console.log(i, input[i]);
    break;
  }
}
