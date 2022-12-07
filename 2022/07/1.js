const input = require('../util').getInput();

const parsed = input.reduce(({ cwd, files }, line) => {
  if (!line) {
    return { cwd, files };
  }
  const parts = line.split(' ');

  if (parts[1] === 'ls' && parts[0] === '$' || parts[0] === 'dir') {
    return { cwd, files };
  }

  if (parts[0] === '$') {
    if (parts[2] === '..') {
      cwd.pop();
    } else {
      cwd.push(parts[2]);
    }

    return { cwd, files };
  }

  const [size, filename] = parts;

  let path = '';
  for (const part of cwd) {
    path += `${part}${part === '/' ? '' : '/'}`;
    files[path] = (files[path] || 0) + +size;
  }

  return { cwd, files };
}, { cwd: [], files: {} });

const files = Object.entries(parsed.files).sort(([,a], [,b]) => a - b);
const ans = Object.entries(parsed.files)
  .reduce((sum, [name, val]) => sum + (val <= 100000 ? val : 0), 0);

console.log(ans);
