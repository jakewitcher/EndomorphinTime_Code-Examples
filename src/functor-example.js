const { compose, map } = require("../utils/helpers");
const { MaybeNumber } = require("../utils/monads");

// calculate total
const applyPromotion = price => price * 0.7;
const applylSalesTax = price => price * 1.065;
const applyShipping = price => price + 4.99;

const calculateTotal = compose(
  applyShipping,
  applylSalesTax,
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
  map(calculateTotal),
  MaybeNumber.of
);

console.log(handleTransaction(15));
