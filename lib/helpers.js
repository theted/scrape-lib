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
  }
}
