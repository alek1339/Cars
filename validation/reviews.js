const isEmpty = require('./is-empty')
const Validator = require('validator')

module.exports = function validateAddNewsInput (data) {
  let errors = {}

  data.header = !isEmpty(data.header) ? data.header : ''
  data.text = !isEmpty(data.text) ? data.text : ''
  data.author = !isEmpty(data.author) ? data.author : ''
  data.imgUrl = !isEmpty(data.author) ? data.imgUrl : ''

  if (!Validator.isLength(data.header, { min: 2 })) {
    errors.header = 'Header must be between 2 and 90 characters'
  }
  if (Validator.isEmpty(data.header)) {
    errors.header = 'Header field is required'
  }
  if (!Validator.isLength(data.text, { min: 12, max: 9000 })) {
    errors.text = 'Text must be between 12 and 9000 characters'
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required'
  }
  if (!Validator.isLength(data.author, { min: 2, max: 30 })) {
    errors.author = 'Author must be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.header)) {
    errors.author = 'Author field is required'
  }
  // if (!Validator.isLength(data.imgUrl, { min: 6, max: 50 })) {
  //   errors.imgUrl = 'Image url must be between 6 and 70 characters'
  // }
  if (Validator.isEmpty(data.imgUrl)) {
    errors.imgUrl = 'Image url field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
