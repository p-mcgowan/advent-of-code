const total = require('../util')
  .getInput()
  .reduce((acc, line) => {
    if (!line) { return acc; }
    const [a, b, c, d] = line.split(/[, -]+/);

    return acc + +!(+b < +c || +a > +d);
  }, 0);
console.log(total);

