exports.getInputRaw = () => require('fs')
  .readFileSync(process.argv[2] || 'input.txt', 'utf8');

exports.getInput = () => exports.getInputRaw().split('\n');

