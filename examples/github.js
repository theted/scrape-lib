/**
 * Count a user's number of commit from github
 */
const scraper = require('../')
const user = process.argv[2] || 'theted'
const url = `https://github.com/${user}`
const pattern = '.js-yearly-contributions h2.text-normal'
const getCommits = content => content.data[0].split(' ')[0]
const logCommits = msg => console.log(`${user} made ${msg} commits last year (${(msg / 365).toFixed(2)} commits/day)`)

scraper.process(url, pattern, getCommits).then(logCommits)
