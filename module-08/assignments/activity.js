const timeout = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

function inc(a) {
  return timeout().then(() => a + 1);
}

const sum = function (a, b) {
  return timeout().then(() => a + b);
};

const max = (a, b) => timeout().then(() => (a > b ? a : b));

const avg = (a, b) => sum(a, b).then((sum) => sum / 2);

const obj = {
  name: "Marcus Aurelius",
  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }

  static of(name) {
    return timeout().then(() => new Person(name));
  }

  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  }
}

inc(5)
  .then((v) => console.log("inc(5) =", v))
  .then(() => sum(1, 3))
  .then((v) => console.log("sum(1, 3) =", v))
  .then(() => max(8, 6))
  .then((v) => console.log("max(8, 6) =", v))
  .then(() => avg(8, 6))
  .then((v) => console.log("avg(8, 6) =", v))
  .then(() => obj.split())
  .then((v) => console.log("obj.split() =", v))
  .then(() => Person.of("Marcus Aurelius"))
  .then((p) => p.split())
  .then((v) => console.log("person.split() =", v));
