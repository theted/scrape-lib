const cheerio = require('cheerio')
const LINKSPATTERN = 'a[href^="http://"],a[href^="https://"]'

/**
 * Parse HTML
 * @param {string} html HTML data
 * @param {string} pattern Selector
 * @returns {Promise<string[]>} Result
 */
module.exports = async (data, pattern) => {
  return new Promise((resolve, reject) => {
    if (!pattern) reject(new Error('Pattern argument required!'))

    if (typeof pattern === 'string') pattern = { data: pattern }

    let $ = cheerio.load(data)
    let result = {}
    let urlSet = new Set()

    // parse any attribute
    for (let key in pattern) {
      let speccer = 'text'
      result[key] = $(pattern[key]).text()
    }

    // get links
    $(LINKSPATTERN).map((index, link) => {
      urlSet.add($(link).attr('href'))
    })

    result.urls = [...urlSet]

    resolve(result)
  })
}
