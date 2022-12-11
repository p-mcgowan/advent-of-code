const input = require('../util').getInput();

const steps = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
};

const next = (h, t, ostep) => {
  const dx = h[0] - t[0];
  const dy = h[1] - t[1];
  const d = dx * dx + dy * dy;

  if (d <= 2) { return t; }

  const step = [
    Math.min(Math.abs(dx), 1) * Math.sign(dx),
    Math.min(Math.abs(dy), 1) * Math.sign(dy)
  ];

  return [t[0] + step[0], t[1] + step[1]]
};

const positions = input.reduce((a, n) => {
  if (!n) { return a; }
  let [dir, count] = n.split(' ');
  let step = steps[dir];

  while (+count > 0) {
    count = +count - 1;
    a.h[0] += step[0];
    a.h[1] += step[1];

    let head = a.h;
    a.t = a.t.map((tail,i) => (head = next(head, tail, step)));
    a.v[a.t[8].join()] = 1;
  }

  return a;
}, { h: [0,0], t: new Array(9).fill([0, 0]), v: { '0,0': 1 } });

console.log(Object.keys(positions.v).length);
