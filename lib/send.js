const config = require('./config')
const helpers = require('./helpers')
const request = require('request')
const USERAGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'

/**
 * POST data to an URL
 * @param {string} url
 * @param {Object} data
 * @returns {Promise<String>} Promise for page content
 */
module.exports = function (url, data) {
  return new Promise((resolve, reject) => {
    url = helpers.fixUrl(url)
    helpers.log(' -> ' + url + ' [POST] -> ' + helpers.serialize(data))
    request.post({
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'User-Agent': USERAGENT
      },
      url: url,
      body: helpers.serialize(data),
      jar: config.jar
    }, function (error, response, body) {
      helpers.log(' <- ' + url + ' {POST}')
      if (error) reject(error)
      ++config.requests
      resolve({ body, headers: response.headers, code: response.statusCode })
    })
  })
}
