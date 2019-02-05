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
    url = helpers.fixUrl(url)
    if (data) url += helpers.serialize(data, '?')
    helpers.log(' -> ' + url)
    request({
      url: url,
      jar: config.jar
    }, (error, response, body) => {
      helpers.log(' <- ' + url)
      if (error) reject(error)
      ++config.requests
      resolve(body)
    })
  })
}
