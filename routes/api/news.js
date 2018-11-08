const express = require('express')
const router = express.Router()

// Load Input Validation
const validateNewsInput = require('../../validation/news')

// Load User model
const News = require('../../models/News')

// @route  GET api/news/add-news
// @desc Add news
// @access Private
router.post('/add-news', (req, res) => {
  //  Check Validation
  const { errors, isValid } = validateNewsInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  console.log(req.body)
  const newNews = new News({
    header: req.body.header,
    text: req.body.text,
    author: req.body.author,
    imgUrl: req.body.imgUrl
  })
  newNews
    .save()
    .then(post => res.json(post))
    .catch(err => console.log('Error:' + err))
})

// @route   GET api/news
// @desc    Get news
// @access  Public
router.get('/', (req, res) => {
  News.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nonewsfound: 'No news found' }))
})

// @route   GET api/news
// @desc    Get news
// @access  Public
router.get('/edit', (req, res) => {
  let lastIndexOfId = req.headers.referer.lastIndexOf(':')
  const id = req.headers.referer.slice(lastIndexOfId + 1)

  News.findById(id)
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nonewsfound: 'No news found' }))
})

router.post('/edit-news', (req, res) => {
  let lastIndexOfId = req.headers.referer.lastIndexOf(':')
  const id = req.headers.referer.slice(lastIndexOfId + 1)
  console.log(id)
  News.findByIdAndUpdate(id, { $set: req.body }, function (err, result) {
    if (err) {
      console.log('Грешка:' + err)
    }
    console.log('RESULT: ' + result)
    res.send('Done')
  })
})

router.get('/id', (req, res) => {
  let lastIndexOfId = req.headers.referer.lastIndexOf('/')
  const id = req.headers.referer.slice(lastIndexOfId + 1)

  News.findById(id)
    .sort({ date: -1 })
    .then(news => res.json(news))
    .catch(err => res.status(404).json({ nonewsfound: 'No news found' }))
})

module.exports = router
