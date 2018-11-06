const express = require('express')
const router = express.Router()

// Load Input Validation
const validateReviewsInput = require('../../validation/reviews')

// Load User model
const Reviews = require('../../models/Reviews')

// @route  GET api/reviews/add-reviews
// @desc Add Review
// @access Public
router.post('/add-reviews', (req, res) => {
  //  Check Validation
  const { errors, isValid } = validateReviewsInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newReviews = new Reviews({
    header: req.body.header,
    text: req.body.text,
    author: req.body.author,
    imgUrl: req.body.imgUrl
  })
  newReviews
    .save()
    .then(post => res.json(post))
    .catch(err => console.log('Error:' + err))
})

// @route   GET api/reviews
// @desc    Get reviews
// @access  Public
router.get('/', (req, res) => {
  Reviews.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noreviewsfound: 'No reviews found' }))
})

// @route   GET api/review
// @desc    Edit review
// @access  Public
router.get('/edit', (req, res) => {
  const id = req.headers.referer.slice(42)
  Reviews.findById(id)
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noreviewsfound: 'No reviews found' }))
})

router.post('/edit-reviews', (req, res) => {
  const id = req.headers.referer.slice(42)

  Reviews.findByIdAndUpdate(id, { $set: req.body }, function (err, result) {
    if (err) {
      console.log('Грешка:' + err)
    }
    console.log('RESULT: ' + result)
    res.send('Done')
  })
})

router.get('/id', (req, res) => {
  const id = req.headers.referer.slice(33)

  Reviews.findById(id)
    .sort({ date: -1 })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(404).json({ noreviewsfound: 'No reviews found' }))
})

module.exports = router
