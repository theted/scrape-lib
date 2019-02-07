# Scrape lib
Toolkit for scraping the web!


## Features
- Fast! Asynchronous architecture enabling multiple concurrent requests
- Use jQuery HTML selector syntax
- Cookie handling allowing persistent sessions / log-ins etc


## Installation
Since this project is not correctly on npm, there are some alternative methods of including it.

**Alternative 1:** specify the URL as a dependency in your `package.json`:
```json
"scrape-lib": "https://github.com/theted/scrape-lib.git#master"
```

**Alternative 2:** add this repo as a `subtree` to your git repo:
```
git subtree add --prefix lib/scrape-lib https://github.com/theted/scrape-lib.git master --squash
```

**Alternative 3:** clone this repo and include it directly:
```
git clone git@github.com:theted/scrape-lib.git
```


## Initialize
Simple require the module as a dependency:
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
let html = '<html>[...]' // HTML string
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
let pattern = { images: 'img::src' }

; (async () => {
  let result = await scraper.scrape(url, pattern)
  console.log(result)
})()
```


### ```scraper.process(url, pattern, callback)```
Wraps `scrape` method around a callback function, useful for cleaning up code

```js
// reverse the title of a site
const url = 'https://github.com'
const pattern = { title: 'title' }
const reverse = str => str.split('').reverse().join('')
const processor = data => reverse(data.title[0])
scraper.process(url, pattern, processor).then(console.log)
```


### ```scraper.login(url, username, password)```
Perform a login to a site. Automatically tries to figure out field names for the login form by crawling the URL of the login form first.

```js
// login to some site, then grab some secret information
let url = 'https://some-site.com/'
let pattern = {sectrets: 'h2.secret'}
let loginResult = scraper.login(url + 'myUsername', 'passw0rd')
let secrets = scraper.scrape(url + 'secret-url', pattern)
//  ^ now we have all secrets!
```

### ```scraper.download(remote, local)```
Download a remote resource
```js
// asynchronously download an (potentially very large!) image
scraper.download('http://example.com/img/huge-img.jpg', './local/image.jpg').then(path => {
  console.log('Image completed download!')
})
```

### ```scraper.links(url)```
Returns an array of all unique links of a page.
```js
// log all links from github.com
scraper
  .links('https://github.com')
  .then(console.log)
```


## Debug mode
Enable logging of requests by enabling *debug mode*. This is useful for debugging order of operations, request response times, etc.

Either pass the `debug` parameter when calling a file:
```
node examples/github.js theted debug
```

...or set the global debug variable to true directly in the file
```js
global.DEBUG = true
```


## Examples
Additional examples are available in the [examples](examples/) directory.
