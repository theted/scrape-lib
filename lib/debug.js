/**
 * Display execution time and number of HTTP requests when process exits
 */
const conf = require('./config')
let start = Date.now()
let getExecutionTime = () => (Date.now() - start)
let displayMessage = () => console.log(`\n  -> Completed ${conf.requests} HTTP requests in ${getExecutionTime()}ms`)
let terminate = () => process.exit(2)

process.on('exit', displayMessage) // display custom message on exit
process.on('SIGINT', terminate) // instant exit on sigterm
