import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateForm'
import AnecdoteById from './AnecdoteById'
import  UseField  from '../hooks'

const Menu = ({anecdotes, addNew, notification}) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>

    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/create">
        {notification===''?<CreateNew addNew={addNew}/>:<Redirect to="/"/>}
      </Route>
      <Route path="/:id">
        <AnecdoteById anecdotes={anecdotes} />
      </Route>
      <Route path="/">
        <AnecdoteList anecdotes={anecdotes}/>
      </Route>
    </Switch>
    </Router>
  )
}
export default Menu