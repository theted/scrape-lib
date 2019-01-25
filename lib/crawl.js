const request = require('request')

/**
 * Scrape an URL, return HTML
 * @returns {Promise<HTML>} Promise for page HTML
 */
module.exports = function (url) {
  return new Promise(function (resolve, reject) {
    request({ url: url }, (error, response, body) => {
      if (error) reject(error)
      resolve(body)
    })
  })
}
