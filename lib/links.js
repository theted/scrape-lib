const scrape = require('./scrape')
const _ = require('./helpers')

/**
 * Get unique links from an URL, fixes relative URLs as needed
 * @param {string} URL starting point
 * @returns {string[]} Array of URLs
 */
function getLinks (url) {
  let baseUrl = _.baseUrl(url)
  return scrape(url, 'a::href').then(data => {
    data.data.forEach((link, i) => {
      data.data[i] = _.absoluteUrl(link, baseUrl)
    })
    return _.unique(data.data)
  })
}

module.exports = getLinks
