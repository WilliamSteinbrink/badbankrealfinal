import axios from 'axios'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))



const API_URL = '/api/transaction/';

// Make deposit
const makeDeposit = async (amount) => {
  const userId = user._id
  console.log(userId)
  const config = {
    _id: userId,
    amount: amount,
  }

  const response = await axios.post(API_URL + 'deposit', config)

  return response.data
}

// Make withdraw
const makeWithdraw = async (amount) => {
  const userId = user._id
  console.log(userId)
  const config = {
    _id: userId,
    amount: amount,
  }

  const response = await axios.post(API_URL + 'withdraw', config)

  return response.data
}

const transactionService = {
  makeDeposit,
  makeWithdraw,
}

export default transactionService