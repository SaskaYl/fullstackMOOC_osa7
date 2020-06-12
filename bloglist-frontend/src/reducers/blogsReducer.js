import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { updateUserAction, removeUsersBlogAction } from './usersReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}
const createAction = (newBlog, user) => {
  return async dispatch => {
    try {
      const response = await blogService.create(newBlog)
      response.user={ name:user.name, username:user.username, id:user.id }
      dispatch({
        type: 'CREATE',
        data: response,
      })
      dispatch(updateUserAction(response))
      dispatch(setNotification(`A new blog '${response.title}' by '${response.author}' added`, 5))
    }
    catch (error) {
      console.log(error.response.data.error)
      dispatch(setNotification(`${error.response.data.error}` , 7, true))
    }
  }
}

const updateListAction=(updatedBlog) => {
  return {
    type: 'UPDATELIST',
    data: updatedBlog

  }
}
const removeAction=(blog) => {
  return async dispatch =>
  { try
  {
    const response=await blogService.remove(blog.id)
    console.log(response)
    dispatch({
      type: 'REMOVE',
      data: blog.id,
    })
    dispatch(removeUsersBlogAction(blog))
    dispatch(setNotification(`'${blog.title}' permanently deleted`,5))

  }
  catch (error) {
    console.log(error.response)

  }
  }
}
const commentAction=(blog, c) => {
  const comment={ comment:c }
  return async dispatch => {
    const response=await blogService.postComment(blog.id, comment)
    console.log(response.data)
    const commented={ ...response.data, user: blog.user }
    dispatch({ type:'UPDATELIST', data:commented })
  }
}
const likeAction = (blog) => {
  console.log(blog)
  const voted={ ...blog, likes: blog.likes + 1, user:blog.user.id }
  return async dispatch => {

    const response = await blogService.update(voted.id, voted)
    console.log(response)
    if (response.status === 200) {
      const updatedBlog={
        user:{
          name:blog.user.name,
          username:blog.user.username,
          id:blog.user.id
        },
        title:response.data.title,
        author:response.data.author,
        url:response.data.url,
        likes:response.data.likes,
        id:response.data.id,
        comments:response.data.comments
      }
      dispatch(updateListAction(updatedBlog))
    }
    else {
      dispatch(setNotification(`'${response.error}'`, 5, true))
    }
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  // eslint-disable-next-line default-case
  switch (action.type) {
  case 'UPDATELIST':
    var id = action.data.id
    return state.map(a => a.id !== id ? a : action.data).sort((b, a) => a.likes - b.likes)
  case 'CREATE':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data.sort((b, a) => a.likes - b.likes)
  case 'REMOVE':
    return state.filter(b => b.id!==action.data).sort((b, a) => a.likes - b.likes)
  }
  return state
}
export default reducer
export { createAction, updateListAction, likeAction, removeAction, commentAction }