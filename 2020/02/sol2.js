const { readFileSync } = require('fs');
let input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];
input = readFileSync('./input.txt', 'utf8').split('\n');

const xor = (a, b) => (!!a >> 0) ^ (!!b >> 0);

const reg = (str) => {
  if (!str) {
    return;
  }
  const [_, lo, hi, char, pw] = str.match(/(\d+)-(\d+) (\w): (.*)/);
  const a = pw[lo - 1];
  const b = pw[hi - 1];

  const ex1 = xor(a === char, b === char);
  //console.log(a, b, char, ex1);
  return ex1;
};
console.log(input.filter(reg).length);
