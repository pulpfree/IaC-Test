require('babel-polyfill')
require('./app')

// const log = require('./log')
// console.log('log:', log)
process.on('uncaughtException', (ex) => {
  // log.error(ex)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  // log.error(reason)
})