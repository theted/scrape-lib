const scraper = require('./')
const config = require('./lib/config')
const urls = process.argv.splice(2)

if (!urls.length) {
  console.log('No URLs provided!')
  process.exit(0)
}

; (async () => {
  Promise.all(urls.map(url => {
    return scraper.links(url)
  })).then(async results => {
    console.log(results)
  })
})()
