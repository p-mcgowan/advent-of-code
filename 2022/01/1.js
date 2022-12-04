require('../util').getInput()
  .reduce((acc, line) => {
    console.log(line, acc)
    if (!line) {
      return { sum: 0, max: Math.max(acc.max, acc.sum) };
    }
    return { ...acc, sum: acc.sum + +line };
  }, { sum: 0, max: 0 });

