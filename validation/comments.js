const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateCommentsInput (data) {
  let errors = {}

  data.newsId = !isEmpty(data.newsId) ? data.newsId : ''
  data.text = !isEmpty(data.text) ? data.text : ''
  data.author = !isEmpty(data.author) ? data.author : ''

  if (Validator.isEmpty(data.newsId)) {
    errors.newsId = 'newsId field is required'
  }

  if (!Validator.isLength(data.newsId, { min: 2, max: 190 })) {
    errors.newsId = 'newsId must be between 2 and 190 characters'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required'
  }

  if (!Validator.isLength(data.text, { min: 2, max: 3000 })) {
    errors.text = 'Text must be between 2 and 3000 characters'
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = 'Author field is required'
  }

  if (!Validator.isLength(data.author, { min: 2, max: 130 })) {
    errors.author = 'Author must be between 2 and 130 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
