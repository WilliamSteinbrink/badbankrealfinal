import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import DepositForm from '../components/DepositForm'
import WithdrawForm from '../components/WithdrawForm'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess, message, balance} = useSelector((state) => {
    return state.auth})

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate, isError, isSuccess, message, balance])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    {user ? (
      <>
        <section className="heading">
          <h1>Welcome {user && user.name}</h1>
          <p>Your current balance: ${user && user.balance}</p>
        </section>
        <DepositForm />
        <WithdrawForm/>
      </>
    ) : (
      navigate('/login')
    )}
      
    </>
  )
}

export default Dashboard