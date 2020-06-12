import usersService from '../services/users'
export const getUsers= () => {
  return async dispatch => {
    const users = await usersService.getAll()
    console.log(users)
    dispatch({
      type: 'GETALL',
      data: users,
    })
  }
}
export const updateUserAction=(blog) => {
  return {
    type:'UPDATE', data:blog
  }
}
export const removeUsersBlogAction=(blog) => {
  return {
    type:'REMOVEFROMUSER', data:blog
  }
}
const reducer=(state=[], action) => {
  // eslint-disable-next-line default-case
  switch(action.type){
  case 'GETALL':
    return action.data
  case 'UPDATE':
    var id =action.data.user.id
    console.log(action.data)
    var user=state.find(a => a.id === id)
    var newU={ ...user, blogs:user.blogs.concat({ ...action.data, user:id }) }
    console.log(newU)
    return state.map(u => u.id!==id?u:newU)
  case 'REMOVEFROMUSER':
    var us=state.find(a => a.id===action.data.user.id)
    console.log(us)
    var usersblogsreduced=us.blogs.filter(b => b.id!==action.data.id)
    console.log(usersblogsreduced)
    var updateduser={ ...us, blogs:usersblogsreduced }
    return state.map(u => u.id!==action.data.user.id?u:updateduser)
  }
  return state
}
export default reducer
