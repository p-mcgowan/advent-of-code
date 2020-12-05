const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8').split('\n');

const requiredkeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const validators = {
  //byr (Birth Year) - four digits; at least 1920 and at most 2002.
  byr: (s) => +s >= 1920 && +s <= 2002,
  //iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  iyr: (s) => +s >= 2010 && +s <= 2020,
  //eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  eyr: (s) => +s >= 2020 && +s <= 2030,
  //hgt (Height) - a number followed by either cm or in:
  //If cm, the number must be at least 150 and at most 193.
  //If in, the number must be at least 59 and at most 76.
  hgt: (s) => {
    const match = s.match(/^(\d+)(cm|in)$/);
    if (!match) {
      return false;
    }
    const [_, d, m] = match;
    return m === 'cm' ? d >= 150 && d <= 193 : m === 'in' ? d >= 59 && d <= 76 : false;
  },
  //hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  hcl: (s) => /^#[0-9a-f]{6}$/.test(s),
  //ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  ecl: (s) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(s),
  //pid (Passport ID) - a nine-digit number, including leading zeroes.
  pid: (s) => /^[0-9]{9}$/.test(s),
};

const validate = (pass) => {
  for (const key of requiredkeys) {
    if (!pass[key] || !validators[key](pass[key])) {
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

//console.log(res);
console.log(res.valid.length);
