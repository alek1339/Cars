const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Input Validation

// Load User model
const News = require('../../models/News')

// @route  GET api/news/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'News Works' }))

// @route  GET api/posts/register
// @desc Register user
// @access Public
router.post('/add-news', (req, res) => {
    //  Check Validation

    const newNews = new News({
        header: req.body.header,
        text: req.body.text,
        author: req.body.author
    })
    newNews.save().then(post => res.json(post))
})

module.exports = router
