const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const { protect } = require('../middleware/authMiddleware')
const { allTransactions, transfer, deposit, withdraw } = require('../controllers/transactionControllers')

// Get all transactions
router.get('/', protect, allTransactions)

// Deposit transaction
router.post('/deposit', deposit)

// Withdraw transaction
router.post('/withdraw', withdraw)

// Transfer transaction
router.post('/transfer', transfer)

module.exports = router