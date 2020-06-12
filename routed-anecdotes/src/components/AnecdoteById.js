import React from 'react'
import {useParams} from 'react-router-dom'

const AnecdoteById = ({anecdotes}) =>{
    const id = useParams().id
    console.log(id)
   const anecdote= anecdotes.find(a => a.id === id)
   return (
    <div>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  )
  }
  export default AnecdoteById