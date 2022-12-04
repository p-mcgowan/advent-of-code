const total = require('../util')
  .getInput()
  .reduce((acc, line) => {
    const [a, b, c, d] = line.split(/[, -]+/);

    return acc + +((+a >= +c && +b <= +d) || (+c >= +a && +d <= +b));
  }, 0);
console.log(total);

