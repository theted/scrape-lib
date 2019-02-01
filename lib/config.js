const request = require('request')
const jar = request.jar()

const self = module.exports = {
  linksPattern: 'a[href^="http://"],a[href^="https://"]::href', // excludes relative links
  jar: jar,
  pattern: {
    title: 'title',
    urls: 'a::href', // include all links
    images: 'img::src'
  }
}
