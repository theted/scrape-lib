const scrape = require('./scrape')
const config = require('./config')
const _ = require('./helpers')

/**
 * Get unique links from an URL, fixes relative URLs as needed
 * @param {string} URL starting point
 * @returns {string[]} Array of URLs
 */
function getLinks (url, excludeRelative) {
  url = _.fixUrl(url) // include http:// in URL if missing
  let pattern = (excludeRelative) ? config.linksPattern : config.pattern.urls
  let baseUrl = _.baseUrl(url)

  return scrape(url, pattern).then(data => data.data)

    // add base URL if missing
    .then(data => {
      data.forEach((link, i) => {
        data[i] = _.absoluteUrl(link, baseUrl)
      })
      return data
    })

    // remove duplicates
    .then(allLinks => {
      console.log(allLinks.length, '<- all')
      return _.unique(allLinks)
    })

    // remove irrelevant links
    .then(uniqueLinks => {
      return uniqueLinks.filter(link => {
        return (link.length > 2 && link[0] !== '#' && link.indexOf('mailto') === -1)
      })
    })
}

module.exports = getLinks
