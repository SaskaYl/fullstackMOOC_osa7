const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs= await Blog.find({}).populate('user', { username: 1, name: 1 })
      
        response.json(blogs.map(b => b.toJSON()))
      
  })

  blogsRouter.post('/', async (request, response, next) => {
    const body=request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url:body.url,
        likes:body.likes,
        user:user._id,
        comments:[]
    })
  
    const savedBlog=await blog.save()
    user.blogs=user.blogs.concat(savedBlog._id)
    await user.save()

  response.json(savedBlog.toJSON())
  })
  blogsRouter.put('/:id', async (request, response) => {
    const blog = request.body
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  })
  blogsRouter.post('/:id/comments', async (request, response) => {
    const blog=await Blog.findById(request.params.id)
    const comment = request.body
  blog.comments=blog.comments.concat(comment)
    const commentedBlog = await blog.save()
    response.json(commentedBlog.toJSON())
  })
  blogsRouter.delete('/:id', async(request,response)=>{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    logger.info(decodedToken.id)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog=await Blog.findById(request.params.id)
    logger.info(blog.user.toString())
    if(decodedToken.id===blog.user.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else{
        response.status(401).send('Unauthorized action')
    }
  })
  module.exports=blogsRouter