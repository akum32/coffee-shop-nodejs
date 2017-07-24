const utils = require('./utils');

class UserBalanceReport {

  constructor(aggregatedUserDataStore) {
    this._aggregatedUserDataStore = aggregatedUserDataStore;
  }

  generate() {
    const data = this._getData();
    return Object.entries(data).map(
      ([user, userData]) => ({
        user: user,
        order_total: utils.toDollars(userData.orderTotal),
        payment_total: utils.toDollars(userData.paymentTotal),
        balance: utils.toDollars(userData.balance)
      })
    );
  }

  _getData() {
    return this._aggregatedUserDataStore.getData();
  }
}

module.exports = UserBalanceReport;
