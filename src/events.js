module.exports = [
  
  'ORDER_PROCESSED',
  'PAYMENT_PROCESSED'

].reduce((events, e) => Object.assign(events, ({[e]: e})), {});
