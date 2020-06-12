import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
export const loggedUserAction=(username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({ type:'LOGGEDUSER', data:user })
    }
    catch (error) {
      dispatch(setNotification('wrong username or password', 7, true))
    }
  }
}
export const checkUser= () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type:'LOGGEDUSER', data:user })
      blogService.setToken(user.token)
    }

  }
}
export const logout= () => {
  window.localStorage.clear()
  return { type:'LOGOUT' }
}
const reducer=(state=null, action) => {
  // eslint-disable-next-line default-case
  switch(action.type){
  case 'LOGGEDUSER':
    return action.data
  case 'CHECKUSER':
    return action.data
  case'LOGOUT':
    return null
  }
  return state

}
export default reducer