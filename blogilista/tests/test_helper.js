const Blog=require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
  }
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  const createUser= async ()=>{
  const pw='sekret'
  const passwordHash = await bcrypt.hash(pw, 10)
  const user = new User({ username: 'root', name:'Soma', passwordHash })
  await user.save()
  return ({username:user.username, password:pw}) //käyttäjän lisääminen testikantaan
  }
  const createToken= async(user)=>{
    const logginUser = await User.findOne({ username: user.username })
    const userForToken = {
      username: logginUser.username,
      id: logginUser._id,
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET) //tokenin luominen käyttäjälle
    return token
  }
  module.exports={blogsInDb, usersInDb, createToken, createUser}