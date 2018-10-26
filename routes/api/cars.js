const express = require('express')
const router = express.Router()

// Load Input Validation
// const validateNewsInput = require('../../validation/news')
const validateAddCarInput = require('../../validation/cars')

// Load User model
const Cars = require('../../models/Cars')

router.get('/', (req, res) => res.json({ msg: 'Cars Works' }))

// @route  GET api/cars/add-car
// @desc Register user
// @access Public
router.post('/add-car', (req, res) => {
  // Check Validation
  const { errors, isValid } = validateAddCarInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newCar = new Cars({
    model: req.body.model,
    make: req.body.make,
    year: req.body.year,
    mpg: req.body.mpg,
    realMpg: req.body.realMpg,
    hp: req.body.hp,
    carClassification: req.body.carClassification,
    engine: req.body.engine,
    averageRepairCosts: req.body.averageRepairCosts,
    averageYearRepairs: req.body.averageYearRepairs
  })
  console.log(req.body)
  newCar
    .save()
    .then(post => res.json(post))
    .catch(err => console.log('Error:' + err))
})

// @route   GET api/news
// @desc    Get news
// @access  Public
// router.get('/', (req, res) => {
//   News.find()
//     .sort({ date: -1 })
//     .then(posts => res.json(posts))
//     .catch(err => res.status(404).json({ nonewsfound: 'No news found' }))
// })

module.exports = router
