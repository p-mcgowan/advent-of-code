const { readFileSync } = require('fs');
let input;
input = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
];
input = readFileSync('./input.txt', 'utf8').split('\n');
const map = input.reduce((a, l) => a.concat([[...l]]), []);
//console.log(map);
const tests = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const countTrees = (map, dirs) => {
  const height = map.length;
  let y = 0;
  let x = 0;
  let trees = 0;
  while (y < height) {
    //console.log(y, map[y]);
    trees += +(map[y][x % map[y].length] === '#');
    x += dirs.r;
    y += dirs.d;
  }
  console.log(trees);
  return trees;
};
let sum = 1;
for (const test of tests) {
  const [r, d] = test;
  sum *= countTrees(map, { r, d });
}
console.log(sum);
// input = [
// '1-3 a: abcde',
// '1-3 b: cdefg',
// '2-9 c: ccccccccc'
// ];
