const OrdersProcessor = require('../src/ordersProcessor');

describe('OrdersProcessor', () => {

  it('publishes ORDER_PROCESSED event with the correct total amount in cents', () => {
    const prices = [
      {drink_name: 'latte', prices: {small: 4.50}},
      {drink_name: 'mocha', prices: {small: 3.80, medium: 4.80}}
    ];
    const orders = [{
      user: 'ellis',
      drink: 'mocha',
      size: 'medium'
    }];

    const fakeAppEventEmitter = {emit: sinon.stub()}
    const processor = new OrdersProcessor(fakeAppEventEmitter, orders, prices);
    processor.process();

    expect(fakeAppEventEmitter.emit).to.have.been.calledWith(
      'ORDER_PROCESSED', {
        user: 'ellis',
        drink: 'mocha',
        size: 'medium',
        total: 480
      }
    );
  });
});
