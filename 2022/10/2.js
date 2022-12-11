const input = require('../util').getInput();

const draw = (crt, cycle, sprite) => {
  const line = ~~((cycle - 1) / 40);
  const pixel = (cycle - 1) % 40;
  crt[line] = crt[line] || [];
  crt[line][pixel] = (pixel >= sprite - 1 && pixel <= sprite + 1) ? '#' : '.';
}

const { crt, ...res } = input.reduce((acc, line, crtIndex) => {
  if (!line) { return acc; }

  const [op, n] = line.split(' ');
  draw(acc.crt, acc.cycle, acc.sprite);
  acc.cycle++;
  draw(acc.crt, acc.cycle, acc.sprite);

  if (op !== 'noop') {
    acc.cycle++;
    acc.sprite += +n;
    draw(acc.crt, acc.cycle, acc.sprite);
  }

  return acc;
}, { sprite: 1, cycle: 1, crt: [[]] });
console.log(crt.reduce((acc, l)=> acc.concat(l.join('')), []).join('\n'));
