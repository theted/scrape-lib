const fs = require('fs-extra')

/**
 * Async file utilities
 */
let self = module.exports = {

  /**
   * Asynchronously read a file
   * @param {string} file Path to file
   * @returns {string} File contents
   */
  read: function (file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) reject(new Error(err))
        resolve(data)
      })
    })
  },

  /**
   * Read file, return JSON. Returns an empty array if file does not exist
   * or if error parsing JSON
   * @param {string} file Path to file
   * @returns {Object} JSON
   */
  readJson: async (file) => {
    let data = await self.read(file)

    try {
      return JSON.parse(data)
    } catch (e) {
      return [] // default to empty array
    }
  },

  /**
   * Asynchronously write a file
   * @param {string} file Path to file
   * @param {string} data Content to output
   */
  write: async (file, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, 'utf8', (err, result) => {
        if (err) reject(new Error(err))
        resolve(result)
      })
    })
  },

  /**
   * Append items to an previously existing file. Removes duplicates.
   * @param {string} file Path to file
   * @param {[string[]]} newData Data to append (array of arrays)
   * @returns {string[]} Updated unique values
   */
  append: async (file, newData) => {
    await fs.ensureFile(file) // make sure file exists
    let data = await self.readJson(file)

    // loop through array of arrays
    newData.forEach(arr => {
      arr.forEach(url => {
        data.push(url)
      })
    })

    // remove duplicates
    let uniqueArr = [...new Set(data)]
    let n = []

    // loop through all links in list, remove http://
    // duplicate if https:// version of same link exists
    // ! TODO: fix order! This does not catch all cases
    uniqueArr.forEach(url => {
      let rpl = url.replace('http://', 'https://')

      if (n.indexOf(rpl) === -1 && n.indexOf(url) === -1) {
        n.push(url)
      }
    })

    // replace with new arr
    uniqueArr = n

    // save to file & return updated values
    await fs.writeJson(file, uniqueArr)
    return uniqueArr
  }
}
