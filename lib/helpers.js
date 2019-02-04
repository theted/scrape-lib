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
  }

}
