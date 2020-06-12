const setNotification = (text, sec, e=false) => {
  return async dispatch => {

    var intervalID = await setTimeout(() => {
      dispatch(notificationHideAction(''))
      console.log('time is out1', intervalID)


    }, sec * 600)
    dispatch({
      type: 'CREATENOTIFICATION',
      text: text,
      intervalID,
      e
    })

  }
}
const notificationHideAction = () => {
  return {
    type: 'HIDE'

  }
}



const initialState = ''

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  // eslint-disable-next-line default-case
  switch (action.type) {
  case 'CREATENOTIFICATION':
    clearTimeout(state.id)
    // var err=false
    // action.e.type('undefined')?err=false:err=true
    return { text: action.text, id: action.intervalID,e:action.e }
  case 'HIDE':
    return ''
  }
  return state
}
export default reducer
export { setNotification }