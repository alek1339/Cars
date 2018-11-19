const express = require('express')
const router = express.Router()
const validateCommentsInput = require('../../validation/comments')
const Comments = require('../../models/Comments')

// @route  GET api/news/test
// @desc Tests news route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Comments Works' }))

router.get('/', (req, res) => {
  Comments.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nocommentsfound: 'No comments found' }))
})

router.post('/add-comments', (req, res) => {
  console.log(req.body)
  //  Check Validation
  const { errors, isValid } = validateCommentsInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newComment = new Comments({
    text: req.body.text,
    author: req.body.author,
    authorId: req.body.authorId,
    newsId: req.body.newsId
  })

  newComment
    .save()
    .then(post => res.json(post))
    .catch(err => console.log('Error:' + err))
})

module.exports = router
