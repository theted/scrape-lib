
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

    let $ = cheerio.load(data)
    let result = $(pattern).text()

    resolve(result)
  })
}
