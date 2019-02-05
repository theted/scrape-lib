// download remote image
const scraper = require('../')
let REMOTE = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png'
let LOCAL = './github-logo.png'

scraper.download(REMOTE, LOCAL).then(console.log)
