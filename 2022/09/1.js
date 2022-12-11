const input = require('../util').getInput();

const steps = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
};

const next = (h, t, step) => {
  const dx = h[0] - t[0];
  const dy = h[1] - t[1];
  const d = dx * dx + dy * dy;

  if (d <= 2) { return t; }
  if (d < 5) { return [t[0] + step[0], t[1] + step[1]]; }

  return (Math.abs(dx) > Math.abs(dy)) ?
    [t[0] + step[0], h[1]]
    [h[0], t[1] + step[1]];
};

const positions = input.reduce((a, n) => {
  if (!n) { return a; }

  let [dir, count] = n.split(' ');
  const step = steps[dir];

  while (+count > 0) {
    count = +count - 1;
    a.h[0] += step[0];
    a.h[1] += step[1];
    a.t = next(a.h, a.t, step);
    a.v[a.t.join()] = (a.v[a.t.join()] || 0) + 1;
    console.log(a.h, a.t);
  }

  return a;
}, { h: [0,0], t: [0,0], v: { '0,0': 1 } });

console.log(Object.keys(positions.v).length);
