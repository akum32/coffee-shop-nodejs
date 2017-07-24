const events = require('./events');
const utils = require('./utils');

class PaymentsProcessor {

  constructor(appEventEmitter, payments) {
    this._appEventEmitter = appEventEmitter;
    this._payments = payments;
  }

  process() {
    this._payments.forEach(payment => this._process(payment));
  }

  _process(payment) {
    const amount = utils.toCents(payment.amount);
    const eventData = Object.assign({}, payment, {amount});
    this._appEventEmitter.emit(events.PAYMENT_PROCESSED, eventData)
  }
}

module.exports = PaymentsProcessor;
