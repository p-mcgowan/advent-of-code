const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n');

const requiredkeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const validate = (pass) => {
  for (const key of requiredkeys) {
    if (!pass[key]) {
      return false;
    }
  }
  return true;
};

const res = input.reduce(
  (pps, line, i) => {
    if (!line || i === input.length - 1) {
      if (validate(pps.current)) {
        pps.valid.push(pps.current);
      } else {
        pps.invalid.push(pps.current);
      }
      pps.current = {};
      return pps;
    }

    const regex = new RegExp(/\b(\w+):([^ \b]+)\b/, 'g');
    let m;
    while ((m = regex.exec(line))) {
      const [, key, val] = m;
      Object.assign(pps.current, { [key]: val });
    }

    return pps;
  },
  {
    valid: [],
    invalid: [],
    current: {},
  },
);

console.log(res.valid.length);
