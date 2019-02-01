const scraper = require('./export')
const config = require('./lib/config')
const urls = process.argv.splice(2)

if (!urls.length) {
  console.log('No URLs provided!')
  process.exit(0)
}

; (async () => {
  for (let url of urls) {
    console.log(await scraper.scrape(url, config.pattern))
  }
})()
