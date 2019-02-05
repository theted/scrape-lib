// print top 250 movies from IMDB
const scraper = require('../')
let URL = 'https://www.imdb.com/chart/top?sort=ir,desc&mode=simple&page=1'
let PATTERN = { movies: '.lister .titleColumn a' }

// minimal syntax
scraper.scrape(URL, PATTERN).then(console.log)

// alternative syntax; verbose .then()
scraper.scrape(URL, PATTERN).then(result => {
  console.log('TOP 250 MOVIES:', result)
})

// alternative syntax; async/await
; (async () => {
  let result = await scraper.scrape(URL, PATTERN)
  console.log('TOP 250 movies:', result)
})()
