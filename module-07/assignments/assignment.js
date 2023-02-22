const data = [
  { born: 1870, died: 1924 },
  { born: 1893, died: 1976 },
  { born: 1869, died: 1948 },
  { born: 1901, died: 1989 },
];

const age = data.map(({ born, died }) => died - born);
const filtered = age.filter((age) => age > 75);
const oldest = filtered.reduce((prev, curr) => (curr > prev ? curr : prev));
console.log("Result: ", oldest);

const result = data
  .map(({ born, died }) => died - born)
  .filter((age) => age > 75)
  .reduce((prev, curr) => (curr > prev ? curr : prev));
console.log("Result by chaining: ", result);
