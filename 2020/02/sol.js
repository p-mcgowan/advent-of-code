const { readFileSync } = require('fs');
let input = readFileSync('./input.txt', 'utf8').split('\n');
// input = [
// '1-3 a: abcde',
// '1-3 b: cdefg',
// '2-9 c: ccccccccc'
// ];

const reg = (str) => {
  if (!str) {
    return;
  }
  const [_, lo, hi, char, pw] = str.match(/(\d+)-(\d+) (\w): (.*)/);
  const reg = new RegExp(`[^${char}]`, 'g');
  const count = pw.replace(reg, '').length;
  //console.log(lo,hi,char,pw, reg, match);
  return count >= lo && count <= hi;
};
console.log(input.filter(reg).length);
