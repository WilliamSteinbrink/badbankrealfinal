import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import transactionService from './transactionService'


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  amount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Deposit
export const makeDeposit = createAsyncThunk('transaction/deposit', async (amount, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token
    return await transactionService.makeDeposit(amount)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Withdraw
export const makeWithdraw = createAsyncThunk('transaction/withdraw', async (amount, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token
    return await transactionService.makeWithdraw(amount)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeDeposit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(makeDeposit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.amount = action.payload
      })
      .addCase(makeDeposit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(makeWithdraw.pending, (state) => {
        state.isLoading = true
      })
      .addCase(makeWithdraw.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.amount = action.payload
      })
      .addCase(makeWithdraw.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = transactionSlice.actions
export default transactionSlice.reducer


