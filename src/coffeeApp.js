const EventEmitter = require('events').EventEmitter;
const OrdersProcessor = require('./ordersProcessor');
const PaymentsProcessor = require('./paymentsProcessor');
const AggregatedUserDataStore = require('./aggregatedUserDataStore');
const UserBalanceReport = require('./userBalanceReport');

class CoffeeApp {

  constructor(pricesJson, ordersJson, paymentsJson) {
    const appEventEmitter = new EventEmitter();
    this._ordersProcessor = new OrdersProcessor(appEventEmitter, ordersJson, pricesJson);
    this._paymentsProcessor = new PaymentsProcessor(appEventEmitter, paymentsJson);
    this._userBalanceReport = new UserBalanceReport(new AggregatedUserDataStore(appEventEmitter));
  }

  process() {
    this._ordersProcessor.process();
    this._paymentsProcessor.process();
    return this._userBalanceReport.generate();
  }
}

module.exports = CoffeeApp;
