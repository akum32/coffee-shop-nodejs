const events = require('./events');
const utils = require('./utils');

class OrdersProcessor {

  constructor(appEventEmitter, orders, prices) {
    this._appEventEmitter = appEventEmitter;
    this._orders = orders;
    this._prices = prices;
  }

  process() {
    this._orders.forEach(order => this._process(order));
  }

  _process(order) {
    const {drink, size} = order;
    const total = utils.toCents(this._getPrice(drink, size));
    const eventData = Object.assign({}, order, {total});
    this._appEventEmitter.emit(events.ORDER_PROCESSED, eventData)
  }

  _getPrice(drinkName, size) {
    const drink = this._prices.find(drink => drink.drink_name === drinkName)
    return drink.prices[size];
  }
}

module.exports = OrdersProcessor;
