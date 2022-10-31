import request from './request'

function wxToPromis(method, options) {
  return new Promise((resolve, reject) => {
    options.success = resolve
    options.fail = (error) => {
      reject(error)
    }
    wx[method](options)
  })
}
export {
  wxToPromis
}