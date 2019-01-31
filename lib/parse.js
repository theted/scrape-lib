const cheerio = require('cheerio')

/**
 * Parse HTML
 * @param {string} html HTML data
 * @param {string} pattern Selector
 * @returns {Promise<string[]>} Result
 */
async function parse(data, pattern) {
  return new Promise((resolve, reject) => {
    if (!pattern) reject(new Error('Pattern argument required!'))

    if (typeof pattern === 'string') pattern = { data: pattern }

    let $ = cheerio.load(data)
    let result = {}

    for (let key in pattern) {
      let values = new Set()
      let [attr, val] = getType(pattern[key])

      $(val).map((index, content) => {
        values.add((attr === 'text')
          ? $(content).text()
          : $(content).attr(attr))
      })

      result[key] = [...values]
    }

    resolve(result)
  })
}

function getType(val) {
  let type = 'text' // default type

  if (val.indexOf('::') > 0) {
    let p = val.split('::')
    val = p[0]
    type = p[1]
  }

  return [type, val]
}

module.exports = parse
