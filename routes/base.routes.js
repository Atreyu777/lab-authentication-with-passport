const express = require('express')
const router = express.Router()
const { checkLoggedIn, checkRole } = require('../middleware')

// Endpoints
router.get('/', (req, res) => res.render('index'))
router.get('/private-page', checkLoggedIn, (req, res)=> res.render('auth/private', {user: req.user}))



module.exports = router
