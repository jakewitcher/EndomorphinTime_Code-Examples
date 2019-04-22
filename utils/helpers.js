function compose(...fns) {
  return arg => fns.reduceRight((value, fn) => fn(value), arg);
}

function pipe(...fns) {
  return arg => fns.reduce((value, fn) => fn(value), arg);
}

function curry(fn) {
  const arity = fn.length;
  return function _curry(...args) {
    if (args.length < arity) {
      return _curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

function _map(fn, functor) {
  return functor.map(fn);
}

function _chain(fn, monad) {
  return monad.chain(fn);
}

const map = curry(_map);
const chain = curry(_chain);

module.exports = { compose, pipe, curry, map, chain };
