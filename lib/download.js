const request = require('request')
const fs = require('fs-extra')
const helpers = require('./helpers')

/**
 * Download a remote file
 * @param {string} remote URL for remote file
 * @param {string} local path to local file
 * @returns {Promise} file operation result
 */
function fetchFile (remote, local) {
  return new Promise(function (resolve, reject) {
    helpers.log('Downloading file: ' + remote + ' -> ' + local)

    let file = fs.createWriteStream(local)
    let stream = request(remote)
    let bytes = 0

    stream.on('data', (chunk) => {
      file.write(chunk)
      bytes += chunk.length
      helpers.log(bytes + ' bytes written')
    })

    stream.on('end', () => {
      helpers.log('Done writing to file:', local)
      resolve(local)
    })

    stream.on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = fetchFile
