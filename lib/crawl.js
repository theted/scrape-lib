const request = require('request')
const config = require('./config')

/**
 * Scrape an URL, return HTML
 * @param {string} URL
 * @returns {Promise<HTML>} Promise for page HTML
 */
module.exports = function (url) {
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      jar: config.jar
    }, (error, response, body) => {
      if (error) reject(error)
      resolve(body)
    })
  })
}
