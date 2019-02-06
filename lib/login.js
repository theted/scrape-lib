const scrape = require('./scrape')
const send = require('./send')
const helpers = require('./helpers')

const pattern = {
  form: 'form::action',
  fields: 'input::name',
  types: 'input::type'
}

/**
 * Global login function
 */
module.exports = async function (url, username, password) {
  // support defining username & password as an object
  if (typeof username === 'object') {
    password = username.password
    username = username.username
  }

  // first, find out URL of login form
  let data = await scrape(url, pattern)
  let loginUrl = helpers.baseUrl(url) + data.form[0]

  // ...then POST to login URL, using provided credantials
  // TODO: support alternative field names by analyzing login form HTML
  let result = await send(loginUrl, { username, password })

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
