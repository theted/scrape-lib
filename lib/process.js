const scrape = require('./scrape')

/**
 * Courtesy method: wrap a callback function around scrape function
 */
module.exports = async function (url, pattern, callback) {
  let data = await scrape(url, pattern)
  return callback(data)
}
