const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n');

// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.

const rows = Array.from(Array(128)).map((k, i) => i);
const columns = Array.from(Array(8)).map((k, i) => i);
const ops = {
  F: ([r, c]) => [r.slice(0, r.length / 2), c],
  B: ([r, c]) => [r.slice(r.length / 2, r.length), c],
  L: ([r, c]) => [r, c.slice(0, c.length / 2)],
  R: ([r, c]) => [r, c.slice(c.length / 2, c.length)],
};
const seats = input
  .map((line) => {
    if (!line) {
      return;
    }
    const val = [...line].reduce((a, l) => ops[l](a), [[...rows], [...columns]]);
    const [[a], [b]] = val;
    const hash = a * 8 + b;
    return hash;
  })
  .sort((a, b) => a - b);
for (let i = seats[0]; i < seats.length - 1; i++) {
  if (seats[i + 1] != seats[i] + 1) {
    console.log(seats[i] + 1);
  }
}
