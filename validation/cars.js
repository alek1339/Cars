const isEmpty = require('./is-empty')
const Validator = require('validator')

module.exports = function validateAddCarInput(data) {
  let errors = {}

  data.make = !isEmpty(data.make) ? data.make : ''
  data.model = !isEmpty(data.model) ? data.model : ''
  data.year = !isEmpty(data.year) ? data.year : ''
  data.mpg = !isEmpty(data.mpg) ? data.mpg : ''
  data.realMpg = !isEmpty(data.realMpg) ? data.realMpg : ''
  data.hp = !isEmpty(data.hp) ? data.hp : ''
  data.engine = !isEmpty(data.engine) ? data.engine : ''
  data.carClass = !isEmpty(data.text) ? data.carClass : ''
  data.averageRepairCosts = !isEmpty(data.averageRepairCosts) ? data.averageRepairCosts : ''
  data.reliability = !isEmpty(data.reliability) ? data.reliability : ''
  data.imgUrl = !isEmpty(data.imgUrl) ? data.imgUrl : ''

  if (!Validator.isLength(data.imgUrl, { min: 5, max: 300 })) {
    errors.imgUrl = 'Image url mus be between 5 and 300 symbols'
  }

  if (!Validator.isLength(data.make, { min: 2, max: 30 })) {
    errors.make = 'Make must be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.make)) {
    errors.make = 'Make field is required'
  }
  if (!Validator.isLength(data.model, { min: 2, max: 30 })) {
    errors.model = 'Model must be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.model)) {
    errors.model = 'Model field is required'
  }
  if (!Validator.isLength(data.year, { min: 1, max: 20 })) {
    errors.year = 'Year must be between 1 and 20 numbers'
  }
  if (Validator.isEmpty(data.year)) {
    errors.year = 'Year field is required'
  }
  if (!Validator.isLength(data.mpg, { min: 1, max: 6 })) {
    errors.mpg = 'Year must be between 1 and 6 numbers'
  }
  if (Validator.isEmpty(data.mpg)) {
    errors.mpg = 'MPG field is required'
  }
  if (!Validator.isLength(data.realMpg, { min: 1, max: 6 })) {
    errors.realMpg = 'Real MPG must be between 1 and 6 numbers'
  }
  if (Validator.isEmpty(data.realMpg)) {
    errors.realMpg = 'Real MPG field is required'
  }
  if (!Validator.isLength(data.hp, { min: 1, max: 3 })) {
    errors.hp = 'HP must be between 1 and 3 numbers'
  }
  if (Validator.isEmpty(data.hp)) {
    errors.hp = 'HP field is required'
  }
  if (!Validator.isLength(data.engine, { min: 1, max: 12 })) {
    errors.engine = 'Engine must be between 1 and 12 symbols'
  }
  if (Validator.isEmpty(data.engine)) {
    errors.engine = 'Engine field is required'
  }
  if (!Validator.isLength(data.carClassification, { min: 2, max: 30 })) {
    errors.carClassification = 'Car Class must be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.carClassification)) {
    errors.carClassification = 'Car Class field is required'
  }
  if (!Validator.isLength(data.averageRepairCosts, { min: 2, max: 30 })) {
    errors.averageRepairCosts = 'Average repair costs must be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.averageRepairCosts)) {
    errors.averageRepairCosts = 'Average repair costs field is required'
  }
  if (!Validator.isLength(data.reliability, { min: 1, max: 30 })) {
    errors.reliability = 'Average year repairs must be between 1 and 30 characters'
  }
  if (Validator.isEmpty(data.reliability)) {
    errors.reliability = 'Average year repairs field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
