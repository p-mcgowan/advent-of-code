console.log(
require('../util')
  .reduce((acc, line) => {
    if (!line) {
      return acc.concat(0);
    }
    acc[acc.length -1] += +line;
    return acc;
  }, [0]).sort((a, b) => a - b).slice(-3).reduce((acc, n) => acc + n, 0)
);

