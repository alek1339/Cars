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
    averageYearRepairs: req.body.averageYearRepairs,
    imgUrl: req.body.imgUrl
  })
  console.log(req.body)
  newCar
    .save()
    .then(post => res.json(post))
    .catch(err => console.log('Error:' + err))
})

router.get('/edit-cars', (req, res) => {
  Cars.find()
    .sort({ date: -1 })
    .then(cars => res.json(cars))
    .catch(err => res.status(404).json({ nocarsfound: 'No cars found' }))
})

router.get('/edit', (req, res) => {
  const id = req.headers.referer.slice(38)

  Cars.findById(id)
    .sort({ date: -1 })
    .then(car => res.json(car))
    .catch(err => res.status(404).json({ nocarfound: 'No car found' }))
})

// @route   GET api/news
// @desc    Get news
// @access  Public
router.post('/edit-cars', (req, res) => {
  const id = req.headers.referer.slice(38)

  Cars.findByIdAndUpdate(id, { $set: req.body }, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log('RESULT: ' + result)
    res.send('Done')
  })
})

router.post('/edit-cars/delete', (req, res) => {
  const id = req.headers.referer.slice(38)
  console.log('Del')
  Cars.findByIdAndRemove(id, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err)
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: 'Todo successfully deleted',
      id: todo._id
    }
    return res.status(200).send(response)
  })
})

module.exports = router
