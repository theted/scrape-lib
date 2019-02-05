// measure response time
const scraper = require('../')
const REMOTE = process.argv[2] || 'https://github.com'
const start = new Date()
time = () => new Date() - start

; (async () => {
  console.log(`Getting ${REMOTE}...`)
  let result = await scraper.crawl(REMOTE)
  console.log(`Fetched ${REMOTE} in ${time()}ms`)
})()
