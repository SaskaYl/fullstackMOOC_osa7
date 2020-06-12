import React from 'react'
import {
  Link
} from 'react-router-dom'
import { useSelector } from 'react-redux'
const Users=({ users }) => {
  const users1=useSelector(state => state.users)
  console.log('wtf?', users1)
  return (
    <table className='userTable'><tbody><tr><th>user</th><th>blogs</th></tr>
      { users1.map(u => <tr key={u.id}><td><Link to={`/users/${u.id}`}>{u.username}</Link></td><td>{u.blogs.length}</td></tr>)}
    </tbody>
    </table>
  )
}
export default Users