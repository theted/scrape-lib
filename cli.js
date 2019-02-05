const scraper = require('./')
const config = require('./lib/config')
const urls = process.argv.splice(2)

if (!urls.length) {
  console.log('No URLs provided!')
  process.exit(0)
}

; (async () => {
  let results = await Promise.all(urls.map(url => scraper.links(url)))
  console.log(results)
})()
