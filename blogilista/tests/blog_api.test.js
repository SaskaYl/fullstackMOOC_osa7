const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
const helper = require('./test_helper')

const testBlogs = [
  {
    title: 'hyvä elämä',
    author: 'Marko Paananen',
    url: 'www...',
    likes: 3
  },
  {
    title: 'paha elämä',
    author: 'Marko Paananen',
    url: 'www...',
    likes: 10
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  
  let blogObject = new Blog(testBlogs[0])
  await blogObject.save()

  blogObject = new Blog(testBlogs[1])//blogien lisääminen testikantaan
  await blogObject.save()
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})
test('property id is defined', async () => {
  console.log('haloo')
  const res = await api
    .get('/api/blogs')

  console.log(res.body[0].id)
  expect(res.body[0].id).toBeDefined()
})
test('it is possible to post a new blog', async()=>{
  const user= await helper.createUser()
  const token='bearer '+await helper.createToken(user)
  console.log(token)
  const blog={title:'suuri', author:'siira',url:'www',likes:4}
  await api
  .post('/api/blogs')
  .set('Authorization', token)
  .send(blog)
  expect(await helper.blogsInDb()).toHaveLength(testBlogs.length+1)

})
test('if likes has no value lets set it zero', async()=>{
  const user= await helper.createUser()
  const token='bearer '+await helper.createToken(user)
  const blog={title:'Koirat', author:'Tuire Kaimio',url:'www'}
  await api
  .post('/api/blogs')
  .set('Authorization', token)
  .send(blog)
  const blogsNow=await helper.blogsInDb()
  expect(blogsNow.find(b=>b.title==='Koirat').likes).toBe(0)
})
test('attempt to post blog without title or url will return status 400', async()=>{
  const user= await helper.createUser()
  const token='bearer '+await helper.createToken(user)
  const blog={ author:'Tuire Kaimio'}
  await api
  .post('/api/blogs')
  .set('Authorization', token)
  .send(blog)
  .expect(400)
})
test('attempt to post blog without token will return 401', async()=>{
  
  const blog={title:'Koirat', author:'Tuire Kaimio',url:'http://..'}

  await api
  .post('/api/blogs')
  .send(blog)
  .expect(401)
})
afterAll(() => {
  mongoose.connection.close()
})