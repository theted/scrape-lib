/**
 * Global helpers / common utility functions
 */
module.exports = {

  /**
   * Serialize an Object into a String
   * @param {Obj} obj
   * @param {string} [out=''] Output
   * @returns {string} Serialized output
   */
  serialize: (obj, out = '') => {
    if (typeof obj === 'string') return obj
    for (let key in obj) { out += key + '=' + obj[key] + '&' }
    return out.slice(0, -1)
  },

  /**
   * Extract first part of URL
   * @param {string} URL
   * @returns {string} URL
   */
  baseUrl: (url) => {
    let parts = url.split('/')
    return parts[0] + '//' + parts[2]
  },

  /**
   * Try to fix URL by prepending http:// if missing
   * @param {string} URL
   * @returns {string} URL with http://
   */
  fixUrl: (url) => {
    return (url[0] === 'h') ? url : 'http://' + url
  },

  /**
   * Prepend base URL to relative URLs
   * @param {string} URL
   * @param {string} baseUrl
   * @returns {string} Absolute url
   */
  absoluteUrl: (url, baseUrl) => {
    if (url[0] === '/') url = baseUrl + url
    return url
  },

  /**
   * Remove duplicated entries from array
   * @param {Array} array
   * @returns {Array} Unique values
   */
  unique: (arr) => {
    let u = new Set(arr)
    return [...u]
  },

  /**
   * Log a string, but only if debug mode is enabled
   * @param {string} message The message
   */
  log: str => {
    if (global.DEBUG) {
      console.log('@' + (Date.now() - start) + 'ms: ' + str)
    }
  }
}

let start = Date.now()

// check if `debug` argument is passed, set debug mode and remove from args if so
process.argv.forEach((arg, i) => {
  if (arg.toLowerCase() === 'debug') {
    global.DEBUG = true // global argument
    process.argv.splice(i, 1) // remove from arguments
  }
})

global.DEBUG = global.DEBUG || false
if (global.DEBUG) require('./debug')
