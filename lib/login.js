const scrape = require('./scrape')
const send = require('./send')
const helpers = require('./helpers')

const pattern = {
  form: 'form::action',
  fields: 'input::name',
  types: 'input::type'
}

/**
 * Try logging in to a page
 * @param {string} URL
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>} Login result.
 */
module.exports = async function (url, username, password, options = {}) {
  // support defining username & password as an object
  if (typeof username === 'object') {
    password = username.password
    username = username.username
  }

  if (!options.pattern) options.pattern = pattern
  if (!options.pattern.form) options.pattern.form = pattern.form

  // first, find out URL of login form
  // TODO: add support to skip this step if unneccessarry
  let data = await scrape(url, options.pattern)
  let loginUrl = helpers.baseUrl(url) + data.form[0]
  let loginCredentials = {}

  // prepare login credentials names, considerng provided options
  loginCredentials[options.fields.username || 'username'] = username
  loginCredentials[options.fields.password || 'password'] = password
  if (options.fields.token) loginCredentials[options.fields.token] = data.token

  // ...then POST to login URL, using provided credantials
  // TODO: support alternative field names by analyzing login form HTML
  let result = await send(loginUrl, loginCredentials)

  // perform test if defined to check if login actually worked
  if (options.test) { console.log(await performTest(options.test)) }

  // determine result of login, now we simply return redirect url
  return actUponResult(result)
}

async function performTest (options) {
  let testResult = await scrape(options.url, options.pattern).then(val => val.data[0])
  let testPass = (testResult === options.shouldEqual)
  console.log(testResult, '===', options.shouldEqual, '?', '->', testPass)
  return testPass
}

function actUponResult (result) {
  switch (result.code) {
    default:
      return result.headers.location || result
    case 302: // redirect
      return result.headers.location
    case 403: // forbidden
    case 404: // not found
      throw new Error('Login was unsucessful!')
  }
}
