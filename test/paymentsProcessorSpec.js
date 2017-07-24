const PaymentsProcessor = require('../src/paymentsProcessor');

describe('PaymentsProcessor', () => {

 it('publishes PAYMENT_PROCESSED event with amount in cents', () => {
    const payments = [{
      user: 'ellis',
      amount: 4.80
    }];

    const fakeAppEventEmitter = {emit: sinon.stub()}
    const processor = new PaymentsProcessor(fakeAppEventEmitter, payments);
    processor.process();

    expect(fakeAppEventEmitter.emit).to.have.been.calledWith(
      'PAYMENT_PROCESSED', {
        user: 'ellis',
        amount: 480
      }
    );
  });
});
