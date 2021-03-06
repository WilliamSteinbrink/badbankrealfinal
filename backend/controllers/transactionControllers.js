const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Transaction = require('../models/transactionModel')
const Deposit = require('../models/depositModel')
const Withdraw = require('../models/withdrawModel')

// Get all user transactions
const allTransactions = async(req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ date: -1 })
    res.status(201).json({message: 'All transactions'})
  } catch (error) {
    console.log(error)
  }
}

// Transfer between two users
const transfer = async(req, res) => {
  const {from, to, amount} = req.body

  try {
    const fromUser = await User.findById(from)
    const newFromBalance = Number(fromUser.balance) - Number(amount)
    User.updateOne({ _id: from }, {balance: newFromBalance}, err => {
      if (err) {
        console.error(err)
        res.status(400).send('Server Error')
      } else {
        console.log('Withdrawal complete')
      }
    })
    const toUser = await User.findById(to)
    const newToBalance = Number(toUser.balance) + Number(amount)
    User.updateOne({ _id: to }, { balance: newToBalance }, err => {
      if (err) {
        console.error(err)
        res.status(400).send('Server error')
      } else {
        console.log('Transaction completed')
      }
    })
    const transaction = new Transaction({
      from: fromUser,
      to: toUser,
      amount,
    })
    transaction.save()
    res.json(transaction)

  } catch (error) {
    console.error(error)
  }
}

// Depost funds
const deposit = async(req, res) => {
  const {_id, amount} = req.body

  try {
    const depositUser = await User.findById(_id)
    const newBalance = Number(depositUser.balance) + Number(amount)
    User.updateOne({ _id: _id }, {balance: newBalance}, err => {
      if (err) {
        console.error(err)
        res.status(400).send('Server Error')
      } else {
        console.log('Deposit complete')
      }
    })
    const deposit = new Deposit({
      user: depositUser,
      amount,
    })
    deposit.save()
    res.json(deposit)

  } catch (error) {
    console.error(error)
  }
}

// Withdraw funds
const withdraw = async(req, res) => {
  const {_id, amount} = req.body

  try {
    const withdrawUser = await User.findById(_id)
    const newBalance = Number(withdrawUser.balance) - Number(amount)
    User.updateOne({ _id: _id }, {balance: newBalance}, err => {
      if (err) {
        console.error(err)
        res.status(400).send('Server Error')
      } else {
        console.log('Withdraw complete')
      }
    })
    const withdrawal = new Withdraw({
      user: withdrawUser,
      amount,
    })
    withdrawal.save()
    res.json(withdrawal)

  } catch (error) {
    console.error(error)
  }
}


module.exports = {
  allTransactions,
  transfer,
  deposit,
  withdraw,
}