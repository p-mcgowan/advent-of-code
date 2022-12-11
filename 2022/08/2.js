const input = require('../util').getInput().filter(Boolean);

const width = input[0].length - 1;
const height = input.length - 1;
const score = {};

const calc = (i, j, is, js) => {
  const h = input[i][j];
  let sum = 0;
  while (i >= 0 && i <= height && j >= 0 && j <= width) {
    i += is;
    j += js;
    if (!input[i]?.[j]) {
      break;
    }

    sum++;
    if (input[i][j] >= h) {
      break;
    }
  }

  return sum;
}


for (let i = 0; i <= height; ++i) {
  for (let j = 0; j <= width; ++j) {
    score[`${i},${j}`] =
      calc(i, j, -1, 0) *
      calc(i, j, 1, 0) *
      calc(i, j, 0, 1) *
      calc(i, j, 0, -1);
  }
}
const max = Object.values(score).reduce((max, s) => Math.max(max, s), 0);
console.log(max);

