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
const dirs = { r: 3, d: 1 };

const countTrees = (map, dirs) => {
  const height = map.length;
  let y = 0;
  let x = 0;
  let trees = 0;
  while (y < height - 1) {
    x += dirs.r;
    y += dirs.d;
    //console.log(y, map[y]);
    trees += +(map[y][x % map[y].length] === '#');
  }
  return trees;
};

console.log(countTrees(map, dirs));
// input = [
// '1-3 a: abcde',
// '1-3 b: cdefg',
// '2-9 c: ccccccccc'
// ];
