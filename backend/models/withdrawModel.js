const mongoose = require('mongoose')

const withdrawSchema = mongoose.Schema({
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

module.exports = mongoose.model('Withdraw', withdrawSchema)