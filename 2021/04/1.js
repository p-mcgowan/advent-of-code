const file = 'input';
//const file = 'test';
const input = require('fs').readFileSync(`${__dirname}/${file}`, 'utf8').split('\n');

const nums = input.shift().split(',');
const boards = input.reduce((a, l, i) => {
  if (!l) {
    return [...a, []];
  }
  a[a.length - 1].push(l.trim().split(/\s+/).map(Number));

  return a;
}, []);

const boardSet = (board, num) => {
  let i = [].concat(...board).indexOf(num);
  if (i !== -1) {
    const y = i % board.length;
    const x = Math.floor(i / board.length);
    board[x][y] = -1;

    return num;
  }

  return -1;
};

const boardWon = (board) => {
  for (let i = 0; i < board.length; ++i) {
    if (board[i][i] !== -1) {
      continue;
    }
    let row = true;
    let col = true;
    for (let j = 0; j < board.length; j++) {
      if (col && board[i][j] !== -1) {
        col = false;
      }
      if (row && board[j][i] !== -1) {
        row = false;
      }
      if (!col && !row) {
        break;
      }
    }

    if (row || col) {
      return true;
    }
  }

  return false;
};

const won = () => {
  while (nums.length) {
    const n = +nums.shift();
    for (const b of boards) {
      boardSet(b, n);
      if (boardWon(b)) {
        const score = [].concat(...b).reduce((a, i) => a + Math.max(0, i), 0);
        return { b, score: score * n };
      }
    }
  }
};

console.log(won());
/*
const tests = [
  [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
  ],
  [
    [-1,1,1,1,1],
    [1,-1,1,1,1],
    [1,1,-1,1,1],
    [1,1,1,-1,1],
    [1,1,1,1,-1],
  ],
  [
    [1,1,1,-1,1],
    [1,1,1,-1,1],
    [1,1,1,-1,1],
    [1,1,1,-1,1],
    [1,1,1,-1,1],
  ],
  [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [-1,-1,-1,-1,-1],
    [1,1,1,1,1],
  ],
];
for (const t of tests) {
  console.log(t, boardWon(t));
}
*/

//console.log(boards);
