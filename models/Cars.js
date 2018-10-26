const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat News Schema
const CarsSchema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  engine: {
    type: String,
    required: true
  },
  hp: {
    type: String,
    required: true
  },
  mpg: {
    type: String,
    required: true
  },
  realMpg: {
    type: String,
    required: true
  },
  carClassification: {
    type: String,
    required: true
  },
  // commonRepairIssues: {
  //   type: String,
  //   required: true
  // },
  averageRepairCosts: {
    type: String,
    required: true
  },
  averageYearRepairs: {
    type: String,
    required: true
  }
})

module.exports = Cars = mongoose.model('cars', CarsSchema)
