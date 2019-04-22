class MaybeNumber {
  static of(x) {
    return MaybeNumber.isNumber(x) ? JustNumber.of(x) : Nothing.of(x);
  }

  static isNumber(x) {
    return typeof x == "number" && !isNaN(x);
  }
}

class JustNumber {
  constructor(x) {
    this.value = x;
  }

  static of(x) {
    return new JustNumber(x);
  }

  join() {
    return this.value;
  }

  map(fn) {
    return JustNumber.of(fn(this.value));
  }

  chain(fn) {
    return this.map(fn).join();
  }
}

class Nothing {
  constructor(x) {
    this.value = "Nothing";
  }

  static of(x) {
    return new Nothing(x);
  }

  join() {
    return Nothing.of(this.value);
  }

  map(fn) {
    return Nothing.of(this.value);
  }

  chain(fn) {
    return Nothing.of(this.value);
  }
}

module.exports = { MaybeNumber, JustNumber, Nothing };
