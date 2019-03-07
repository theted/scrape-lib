const request = require('request')
const helpers = require('./helpers')
const config = require('./config')

/**
 * Scrape an URL, return page content
 * @param {string} URL
 * @returns {Promise<string>} Promise for page content
 */
module.exports = function (url, data, headers = {}) {
  return new Promise(function (resolve, reject) {
    url = helpers.fixUrl(url)
    if (data) url += helpers.serialize(data, '?')
    if (!headers['User-Agent']) headers['User-Agent'] = config.userAgent
    helpers.log(' -> ' + url)

    request({
      url: url,
      headers: headers,
      jar: config.jar
    }, (error, response, body) => {
      helpers.log(' <- ' + url)
      if (error) reject(error)
      ++config.requests
      resolve(body)
    })
  })
}
