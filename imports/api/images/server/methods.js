import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { encode } from 'node-base64-image'

Meteor.methods({
  getImageFromUrlAsBase64(url) {
    check(url, String)
    const encodeAsBase64 = (urlToEncode) => {
      return new Promise((resolve, reject) => {
        encode(urlToEncode, { string: true }, (error, result) => {
          if (error) {
            reject(error)
          }
          if (result) {
            resolve(result)
          }
        })
      })
    }
    return encodeAsBase64(url)
    .then((base64String) => base64String)
    .catch((error) => { throw new Meteor.Error('500', `${error}`)})
  }
})
