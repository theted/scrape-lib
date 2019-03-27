const crawl = require('./crawl')

/**
 * Courtesy wrapper method; get JSON
 */
module.exports = async function (url) {
  let data = await crawl(url)
  return JSON.parse(data)
}
