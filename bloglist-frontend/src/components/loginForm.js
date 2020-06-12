import React,{ useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { loggedUserAction } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const dispatch=useDispatch()
  const margin = {
    margin: 7
  }
  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    setUsername('')
    setPassword('')
    await dispatch(loggedUserAction(username,password))
    history.push('/')
  }
  return (
    <div>
      <h2 style={margin}>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
           username
          <input style={margin}
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
           password
          <input style={{ margin:9 }}
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant='dark' size='sm' style={{ color:'#66ff00' }} id='login-button' type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm