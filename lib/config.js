const request = require('request')
const jar = request.jar()

module.exports = {
  requests: 0,
  linksPattern: 'a[href^="http://"],a[href^="https://"]::href', // excludes relative links
  jar: jar,
  pattern: {
    title: 'title',
    urls: 'a::href', // include all links
    images: 'img::src'
  }
}
