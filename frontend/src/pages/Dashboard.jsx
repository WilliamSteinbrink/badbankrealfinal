import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import DepositForm from '../components/DepositForm'
import WithdrawForm from '../components/WithdrawForm'

function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => {
    return state.auth})

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

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