import React from 'react'
import { useSelector } from 'react-redux'

const NotificationEr = () => {
  const message= useSelector(state => state)
  if (message === '') {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
export default NotificationEr