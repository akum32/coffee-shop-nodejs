const UserBalanceReport = require('../src/userBalanceReport');

describe('UserBalanceReport', () => {

  it('has the name of each user', () => {
    const aggregatedDataStore = {
      getData: () => ({
        'ellis': {},
        'zoey': {}
      })
    }
    const result = new UserBalanceReport(aggregatedDataStore).generate();
    expect(result[0].user).to.equal('ellis');
    expect(result[1].user).to.equal('zoey');
  });

  it('has the order total for each user in dollars', () => {
    const aggregatedDataStore = {
      getData: () => ({
        'ellis': {orderTotal: 3590},
        'zoey': {orderTotal: 2305}
      })
    }
    const result = new UserBalanceReport(aggregatedDataStore).generate();
    expect(result[0].order_total).to.equal(35.90);
    expect(result[1].order_total).to.equal(23.05);
  });

  it('has the payment total for each user in dollars', () => {
    const aggregatedDataStore = {
      getData: () => ({
        'ellis': {paymentTotal: 3590},
        'zoey': {paymentTotal: 2305}
      })
    }
    const result = new UserBalanceReport(aggregatedDataStore).generate();
    expect(result[0].payment_total).to.equal(35.90);
    expect(result[1].payment_total).to.equal(23.05);
  });

  it('has the balance for each user in dollars', () => {
    const aggregatedDataStore = {
      getData: () => ({
        'ellis': {balance: 3590},
        'zoey': {balance: -2305}
      })
    }
    const result = new UserBalanceReport(aggregatedDataStore).generate();
    expect(result[0].balance).to.equal(35.90);
    expect(result[1].balance).to.equal(-23.05);
  });

});
