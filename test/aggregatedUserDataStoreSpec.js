const EventEmitter = require('events').EventEmitter;
const AggregatedUserDataStore = require('../src/aggregatedUserDataStore');

describe('AggregatedUserDataStore', () => {

  it('updates the user order total on each ORDER_PROCESSED event', () => {
    const appEventEmitter = new EventEmitter();
    const aggregatedDataStore = new AggregatedUserDataStore(appEventEmitter);

    appEventEmitter.emit('ORDER_PROCESSED', {user: 'ellis', total: 450});
    appEventEmitter.emit('ORDER_PROCESSED', {user: 'zoey', total: 380});
    appEventEmitter.emit('ORDER_PROCESSED', {user: 'ellis', total: 380});

    const data = aggregatedDataStore.getData();
    expect(data['ellis'].orderTotal).to.equal(830);
    expect(data['zoey'].orderTotal).to.equal(380);
  });

  it('updates the user payment total on each PAYMENT_PROCESSED event', () => {
    const appEventEmitter = new EventEmitter();
    const aggregatedDataStore = new AggregatedUserDataStore(appEventEmitter);

    appEventEmitter.emit('PAYMENT_PROCESSED', {user: 'ellis', amount: 450});
    appEventEmitter.emit('PAYMENT_PROCESSED', {user: 'zoey', amount: 380});
    appEventEmitter.emit('PAYMENT_PROCESSED', {user: 'ellis', amount: 380});

    const data = aggregatedDataStore.getData();
    expect(data['ellis'].paymentTotal).to.equal(830);
    expect(data['zoey'].paymentTotal).to.equal(380);
  });

  it('defaults the user payment total to zero if no PAYMENT_PROCESSED event', () => {
    const appEventEmitter = new EventEmitter();
    const aggregatedDataStore = new AggregatedUserDataStore(appEventEmitter);

    appEventEmitter.emit('ORDER_PROCESSED', {user: 'ellis', amount: 450});
    appEventEmitter.emit('ORDER_PROCESSED', {user: 'zoey', amount: 380});
    appEventEmitter.emit('PAYMENT_PROCESSED', {user: 'ellis', amount: 380});
    
    const data = aggregatedDataStore.getData();
    expect(data['zoey'].paymentTotal).to.equal(0);
  })

  it('updates the user balance correctly on ORDER_PROCESSED or PAYMENT_PROCESSED events', () => {
    const appEventEmitter = new EventEmitter();
    const aggregatedDataStore = new AggregatedUserDataStore(appEventEmitter);

    appEventEmitter.emit('PAYMENT_PROCESSED', {user: 'francis', amount: 420});
    appEventEmitter.emit('ORDER_PROCESSED', {user: 'ellis', total: 450});
    appEventEmitter.emit('ORDER_PROCESSED', {user: 'zoey', total: 380});
    appEventEmitter.emit('PAYMENT_PROCESSED', {user: 'ellis', amount: 380});
    
    const data = aggregatedDataStore.getData();
    expect(data['francis'].balance).to.equal(-420);
    expect(data['ellis'].balance).to.equal(70);
    expect(data['zoey'].balance).to.equal(380);
  });
});
