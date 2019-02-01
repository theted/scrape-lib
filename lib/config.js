const self = module.exports = {
  linksPattern: 'a[href^="http://"],a[href^="https://"]::href', // excludes relative links
  pattern: {
    title: 'title',
    urls: 'a::href', // include all links
    images: 'img::src'
  }
}
