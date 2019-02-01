const crawl = require('./crawl')
const parse = require('./parse')

/**
 * Courtesy wrapper method; scrape an URL & parse result
 */
module.exports = async function (url, pattern) {
  let data = await crawl(url)
  return await parse(data, pattern)
}

// // alternative Promise/then syntax
// module.exports = function (url, pattern, jar) {
//   return crawl(url, false, jar)
//     .then(data => {
//       return parse(data, pattern)
//     })
// }
