const events = require('./events');

class AggregatedUserDataStore {

  constructor(appEventEmitter) {
    this._data = {};
    this._subscribeToEvents(appEventEmitter);
  }

  getData() {
    return this._data;
  }

  _subscribeToEvents(appEventEmitter) {
    appEventEmitter.on(events.ORDER_PROCESSED, data => this._handleOrderProcessed(data));
    appEventEmitter.on(events.PAYMENT_PROCESSED, data => this._handlePaymentProcessed(data));
  }

  _handleOrderProcessed(eventData) {
    this._updateUserData(eventData.user, userData => {
      userData.orderTotal += eventData.total;
      userData.balance += eventData.total;
    });
  }

  _handlePaymentProcessed(eventData) {
    this._updateUserData(eventData.user, userData => {
      userData.paymentTotal += eventData.amount;
      userData.balance -= eventData.amount;
    });
  }

  _updateUserData(user, callback) {
    const userData = this._data[user] || this._getUserDataDefaults();
    callback(userData);
    this._data[user] = userData;
  }

  _getUserDataDefaults() {
    return {
      balance: 0,
      orderTotal: 0,
      paymentTotal: 0
    }
  }
}

module.exports = AggregatedUserDataStore;
