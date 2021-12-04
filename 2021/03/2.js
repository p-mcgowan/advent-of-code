const file = 'input';
//const file = 'test';
const input = require('fs').readFileSync(`${__dirname}/${file}`, 'utf8').split('\n');

const getMask = (lines) => {
  let m = [...lines[0]].map(() => 0);
  lines.forEach((line) => [...line].forEach((b, i) => (m[i] += +b)));
  m = m.map((sum) => +(sum >= lines.length / 2));
  d = m.map((b) => +!b);

  return { m, d };
};
const getRating = (t = 'm') => {
  let i = 0;
  let o2 = input.slice();
  while (o2.length > 1) {
    const mask = getMask(o2)[t];
    o2 = o2.filter((l) => l.charAt(i) === `${mask[i]}`);
    i++;
    if (o2.length == 1) {
      return o2[0];
    }
  }
  return o2[0];
};

console.log(parseInt(getRating('m'), 2) * parseInt(getRating('d'), 2));
