import React, {useRef} from 'react'

import  {useField}  from '../hooks'
const CreateNew = (props) => {
    console.log(props)
    
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
   // const refContainer = useRef(null);
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(content)
      props.addNew({
       content: content.value,
       author: author.value,
       info: info.value,
        votes: 0
      })
    }
const handleReset=(e)=>{
e.preventDefault()
console.log('handlereset clicked', e)
    content.onChange('')
    author.onChange('')
    info.onChange('')
}
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type="submit">create</button>
        <input type="reset" value="reset" onClick={handleReset}/>
        </form>
        
      </div>
    )
  
  }
  export default CreateNew