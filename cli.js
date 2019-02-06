const scraper = require('./')
const file = require('./lib/file')
const FILE = './urls.json'
const urls = process.argv.splice(2)

if (!urls.length) {
  console.log('No URLs provided!')
  process.exit(0)
}

; (async () => {
  let results = await Promise.all(urls.map(url => scraper.links(url)))
  console.log(results)
  let allLinks = await file.append(FILE, results)
  console.log('Updated links file ->', allLinks.length, 'total links')
})()
