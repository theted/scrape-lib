const cheerio = require('cheerio')

/**
 * Parse HTML
 * @param {string} html HTML data
 * @param {string} pattern Selector
 * @returns {Promise<string[]>} Result
 */
module.exports = async function (data, pattern) {
  return new Promise((resolve, reject) => {
    if (!pattern) reject(new Error('Pattern argument required!'))

    if (typeof pattern === 'string') pattern = { data: pattern }

    let $ = cheerio.load(data)
    let result = {}

    for (let key in pattern) {
      result[key] = $(pattern[key]).text()
    }

    resolve(result)
  })
}
