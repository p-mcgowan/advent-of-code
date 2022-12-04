exports.getInput = () => require('fs')
  .readFileSync(process.argv[2] || 'input.txt', 'utf8')
  .trim()
  .split('\n');
