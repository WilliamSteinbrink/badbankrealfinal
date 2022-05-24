const mongoose = require('mongoose')

const depositSchema = mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Deposit', depositSchema)