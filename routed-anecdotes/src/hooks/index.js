import React, { useState, useRef, useImperativeHandle } from 'react'
import CreateNew from '../components/CreateForm'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        console.log(event)
        if (event == '') {
            setValue('')
        }
        else {
            setValue(event.target.value)
        }
    }
    return {
        type,
        value,
        onChange,
    }

}


