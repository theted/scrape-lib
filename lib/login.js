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

  // first, find out URL of login form
  let data = await scrape(url, options.pattern)
  let loginUrl = helpers.baseUrl(url) + data.form[0]
  let loginCredentials = {}

  // handle options
  loginCredentials[options.fields.username || 'username'] = username
  loginCredentials[options.fields.password || 'password'] = password
  if (options.fields.token) loginCredentials[options.fields.token] = data.token

  // ...then POST to login URL, using provided credantials
  // TODO: support alternative field names by analyzing login form HTML
  let result = await send(loginUrl, loginCredentials)

  // determine result of login, now we simply return redirect url
  return actUponResult(result)
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
