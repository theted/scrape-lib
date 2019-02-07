const scrape = require('./scrape')
const config = require('./config')
const _ = require('./helpers')

/**
 * Get unique links from an URL, fixes relative URLs as needed
 * @param {string} URL starting point
 * @returns {string[]} Array of URLs
 */
async function getLinks (url, excludeRelative) {
  url = _.fixUrl(url) // include http:// in URL if missing
  let pattern = (excludeRelative) ? config.linksPattern : config.pattern.urls
  let baseUrl = _.baseUrl(url)
  let data = await scrape(url, pattern).then(data => _.unique(data.data))
  return filterLinks(data, baseUrl)
}

/**
 * Fix & filter an array of URLs:
 * - add base URL to relative URLs
 * - remove duplicated URLs
 * - remove unwanted/internal URLs
 * @param {string[]} data Array of urls
 * @param {string} baseUrl
 * @returns {string[]} Fixed list of URLs
 */
function filterLinks (data, baseUrl) {
  data.forEach((link, i) => { data[i] = _.absoluteUrl(link, baseUrl) })
  return data.filter(link => (
    typeof link !== 'undefined' &&
    link.length > 2 &&
    link[0] !== '#' &&
    link.substr(0, 6) !== 'mailto' &&
    link.substr(0, 4) !== 'tel:' &&
    link.substr(0, 4) !== 'sms:'
  ))
}

module.exports = getLinks
