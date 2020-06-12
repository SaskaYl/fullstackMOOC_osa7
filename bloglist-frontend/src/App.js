import React, { useEffect } from 'react'
import SuccessNote from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { checkUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

import Nav from './components/nav'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
    dispatch(initializeBlogs())
  },[dispatch])
  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  return (
    <div className="container">
      <SuccessNote/>
      <Nav/>
    </div>
  )
}

export default App