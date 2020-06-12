import React from 'react'
import Blogs from './Blogs'
import Users from './Users'
import { useSelector } from 'react-redux'
import User from './User'
import BlogDetails from './BlogDetails'
import Info from './Info'
import Login from './loginForm'
import LogOut from './LogOut'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from 'react-router-dom'
const Nav = () => {
  const padding = {
    paddingRight: 7
  }
  const user=useSelector(state => state.user)
  const users=useSelector(state => state.users)
  const blogs= useSelector(state => state.blogs)
  const notification=useSelector(state => state.notifications)
  console.log(user)
  return (
    <Router>
      <div>
        {user?<Link style={padding} to="/blogs">blogs </Link>:<></>}
        {user?<Link style={padding} to="/users">users </Link>:<></> }
        <Link style={padding} to="/info">info </Link>
        {user
          ? <b>{user.name} logged in</b>
          : <Link style={padding} to="/login">login</Link>
        }
        {user?<LogOut/>:<></>}
        <h1 style={{ marginBottom:'15px' }}>blog app</h1>
      </div>
      <Switch><Route path="/users/:id">
        <User users={users} />
      </Route>
      <Route path="/users">
        {user ? <Users /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/blogs/:id">
        {notification===''?<BlogDetails blogs={blogs} user={user}/>:<Redirect to="/"/>}
      </Route>
      <Route path="/blogs">
        {user?<Blogs blogs={blogs} user={user}/>:<Redirect to ="/login"/>}
      </Route>
      <Route path="/info"><Info/></Route>
      <Route path="/">
        {user!==null?<Blogs blogs={blogs} user={user}/>:<Redirect to ="/login"/>}

      </Route>
      </Switch>
    </Router>
  )}
export default Nav