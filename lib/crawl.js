const request = require('request')
const helpers = require('./helpers')
const config = require('./config')

/**
 * Scrape an URL, return HTML
 * @param {string} URL
 * @returns {Promise<HTML>} Promise for page HTML
 */
module.exports = function (url, data) {
  return new Promise(function (resolve, reject) {
    if (data) url += helpers.serialize(data, '?')
    request({
      url: url,
      jar: config.jar
    }, (error, response, body) => {
      if (error) reject(error)
      resolve(body)
    })
  })
}
