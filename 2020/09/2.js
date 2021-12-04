const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n').map(Number);
if (input[input.length - 1] == '') {
  input.pop();
}

const preamble = 5;
const target = 127;
/*
const preamble = 25;
const target = 31161678;
*/
// sum until >= target
// save first last index
// drop first, repeat for next
console.log(input.join('\n'));

let sum = input[0];
let start = 0;
let end = 0;

const move = () => {
  while (sum > target) {
    sum -= input[start++];
  }
  while (sum < target) {
    sum += input[++end];
  }
  console.log(start, end, sum);
};

while (end < input.length) {
  console.log('\n');
  if (sum == target) {
    const parts = input.slice(start, end);
    console.log('found:', Math.min(...parts) + Math.max(...parts));
    break;
  }
  move();
}
