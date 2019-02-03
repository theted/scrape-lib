# Scrape lib
Toolkit for scraping the web!


## Features
- Fast! Asynchronous architecture enabling multiple concurrent requests
- Use jQuery HTML selector syntax


## Installation
Since this project is not correctly on npm, there are some alternative methods of including it.

Specify the URL as a dependency in your `package.json`:
```json
"scrape-lib": "https://github.com/theted/scrape-lib.git#master"
```

Alternatively, clone this repo and include it directly:
```
git clone git@github.com:theted/scrape-lib.git
```


## Initialize
Simple include the module as a dependency:
```js
const scraper = require('scrape-lib')
```


## Methods

### ```scraper.crawl(url)```
Retreives the `HTML` of a given `url`.

```js
// using async/await syntax
let html = scraper.crawl(url)
console.log(html)

// alternative syntax, using Promises:
scraper.crawl(url).then(html => {
  console.log(html)
})
```

### ```scraper.send(url, data)```
Send data in a HTTP POST request.

```js
let result = await scraper.send('http://example.com', {hello: 'World!'})
```

### ```scraper.parse(html, pattern)```
Parse `HTML` according to a given `pattern` (-> key:value object of HTML selectors). Returns an object with matching results.

```js
let html = '<html><head>[...]' // HTML string
let pattern = {
  title: 'title',
  links: 'a::href',
  images: 'img::src'
}

let result = await scraper.parse(html, pattern)
console.log(result)
```

### ```scraper.scrape(url, pattern)```
Courtesy method, combining `crawl` and `parse`.

```js
let url = 'https://github.com'
let pattern = {images: 'img::src'}

; (async () => {
  let result = await scraper.scrape(url, pattern)
  console.log(result)
})()
```
