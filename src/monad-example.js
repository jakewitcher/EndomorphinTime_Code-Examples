const { compose, curry, map, chain } = require("../utils/helpers");
const { MaybeNumber } = require("../utils/monads");

// calculate total
const applyPromotion = price => price * 0.7;
const applyShipping = price => price + 4.99;
const applySalesTax = curry(_applySalesTax);

function _applySalesTax(zipcode, price) {
  let result = undefined;
  if (zipcode) {
    result = 1.065;
  }
  return MaybeNumber.of(price * result);
}

// a -> m b
const calculateTotal = compose(
  map(applyShipping),
  applySalesTax(45240),
  applyPromotion
);

// construct message
const formatTotal = price => price.toFixed(2);
const createMessage = price => `You're total is $${price}`;

const constructMessage = compose(
  createMessage,
  formatTotal
);

// handle transaction
const handleTransaction = compose(
  map(constructMessage),
  chain(calculateTotal),
  MaybeNumber.of
);

console.log(handleTransaction(15));
