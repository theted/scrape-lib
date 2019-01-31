const self = module.exports = {
  linksPattern: 'a[href^="http://"],a[href^="https://"]::href',
  pattern: {
    title: 'title',
    urls: self.linksPattern,
    images: 'img::src'
  }
}
