const input = require('../util').getInputRaw();

const chars = [];
:xa
const markSize = 14;
for (let i = 0; i < input.length; ++i) {
  chars.push(input[i]);
  if (chars.length < markSize) {
    continue;
  }

  if (chars.length === markSize && [...new Set(chars)].length === markSize) {
    console.log(chars.join(''), i + 1);
    break;
  }
  chars.shift();
}
