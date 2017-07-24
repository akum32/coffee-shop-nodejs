module.exports = {

  toDollars: (cents) => {
    return cents / 100;
  },

  toCents: (dollars) => {
    return dollars * 100;
  }
};
