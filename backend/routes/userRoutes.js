const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, userHomePage, allUsers } = require('../controllers/userControllers')

// Single user homepage
router.get('/', protect, userHomePage)

// Get all user names
router.get('/all', allUsers)

// Register new user
router.post('/register', registerUser)

// Login user
router.post('/login', loginUser)

module.exports = router