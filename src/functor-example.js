const { compose, map } = require("../utils/helpers");
const { MaybeNumber } = require("../utils/monads");

// calculate total
const applyPromotion = price => price * 0.7;
const applySalesTax = price => price * 1.065;
const applyShipping = price => price + 4.99;

const calculateTotal = compose(
  applyShipping,
  applySalesTax,
  applyPromotion
);

// construct message
const formatTotal = price => price.toFixed(2);
const createText = price => `Your total is $${price}`;

const constructMessage = compose(
  createText,
  formatTotal
);

// handle transaction
const handleTransaction = compose(
  map(constructMessage),
  map(calculateTotal),
  MaybeNumber.of
);

console.log(handleTransaction(15));
