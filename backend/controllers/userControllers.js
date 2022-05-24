const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// Single user homepage/landing page
const userHomePage = async(req, res) => {
  try {
    res.status(200).json({message: 'user Homepage'})
  } catch (error) {
    console.error(error)
  }
}

// Get info for all registered users (for transfers)
const allUsers = async(req, res) => {
  try {
    res.status(200).json({message: 'all users page'})
  } catch (error) {
    console.error(error)
  }
}

// Register new user
const registerUser = async(req, res) => {
  try {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all required fields')
    }

    // Checking if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      balance: 0,
    })

    if(user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    console.error(error)
  }
}

// Login existing user
const loginUser = async(req, res) => {
  try {
    const {email, password} = req.body

    // Find user by email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user credentials')
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
  userHomePage,
  allUsers
}