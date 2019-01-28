const crawl = require('./lib/crawl')
const parse = require('./lib/parse')
const file = require('./lib/file')

const pattern = {
  title: 'title'
}

let urls = process.argv.splice(2)

if (!urls.length) {
  console.log('No URLs provided!')
  process.exit(0)
}

; (async () => {
  for (let url of urls) {
    let html = await crawl(url)
    let parsed = await parse(html, pattern)
    console.log(parsed)
  }
})()
