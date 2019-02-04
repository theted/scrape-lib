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
  }

}
