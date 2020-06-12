import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
const LogOut=() => {

  const dispatch=useDispatch()
  const history=useHistory()
  const logOut = async(event) => {
    dispatch(logout())
    history.push('/login')
  }
  return (
    <>
      <Button variant id='log-out' onClick={logOut}>logout</Button>
    </>
  )
}
export default LogOut