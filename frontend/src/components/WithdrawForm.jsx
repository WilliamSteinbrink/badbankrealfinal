import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { makeWithdraw } from '../features/transaction/transactionSlice'


function WithdrawForm() {
  const {user} = useSelector((state) => state.auth)
  const [amount, setAmount] = useState(0)

  const dispatch = useDispatch()
  

  const onSubmit = e =>{
    e.preventDefault()
    dispatch(makeWithdraw(amount))
    setAmount(0)
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="number">Withdraw Amount</label>
          <input type="number" name="amount" id="amount" placeholder="Enter an amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">Withdraw Funds</button>
        </div>
      </form>
    </section>
  )
}

export default WithdrawForm