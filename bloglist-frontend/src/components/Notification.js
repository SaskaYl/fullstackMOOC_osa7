import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message= useSelector(state => state.notifications)
  if (message === '') {
    return null
  }
  var className=''
  message.e?className='error':className='success'

  return (
    <div className={className}>
      {message.text}
    </div>
  )
}
export default Notification