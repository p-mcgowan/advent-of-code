const input = require('../util').getInput().filter(Boolean);

const width = input[0].length - 1;
const height = input.length - 1;

let visible = {};
let leftMax = -1;
let rightMax = -1;
let topMax = -1;
let bottomMax = -1;

const addIfHidden = (h, w, max) => {
  const treeHeight = +input[h][w];
  visible[`${h},${w}`] = visible[`${h},${w}`] || [];
  if (h === 0 || w === 0 || h === height || w === width || treeHeight > max) {
    visible[`${h},${w}`].push(treeHeight);
  }

  return Math.max(max, treeHeight);
};

for (let i = 0; i <= width; ++i) {
  topMax = -1;
  bottomMax = -1;
  for (let top = 0, bottom = width; top <= width, bottom >= 0; top++, bottom--) {
    topMax = addIfHidden(top, i, topMax);
    bottomMax = addIfHidden(bottom, i, bottomMax);
  }
}
for (let i = 0; i <= height; ++i) {
  leftMax = -1;
  rightMax = -1;
  for (let left = 0, right = width; left <= width, right >= 0; left++, right--) {
    leftMax = addIfHidden(i, left, leftMax);
    rightMax = addIfHidden(i, right, rightMax);
  }
}
const numVisible = Object.values(visible).reduce((a, v) => a + +!!v.length, 0);
console.log(numVisible);
