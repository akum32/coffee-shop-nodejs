require('console.table')

const CoffeeApp = require('./src/coffeeApp')

const PRICES_JSON = require('./data/prices.json')
const ORDERS_JSON = require('./data/orders.json')
const PAYMENTS_JSON = require('./data/payments.json')

const app = new CoffeeApp(PRICES_JSON, ORDERS_JSON, PAYMENTS_JSON)

console.table(app.process())
