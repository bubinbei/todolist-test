import React, { ChangeEvent, useState } from 'react'
import { InputAddForm } from './InputAddForm'
type PropsType = {
    title: string
    onChangeTask: (newTitle: string) => void
}
export const EditableSpan:React.FC<PropsType> = (props) => {
    const {title, onChangeTask} = props
    const [inputValue, setInputValue] = useState(title)
    const [ activ, setActive ] = useState <boolean>(false)
    const activateEdit = () => {
        setActive(!activ)
        if(activ) onChangeTask(inputValue)
    }
     // котролируемый инпут
     const onChangeHendler = (title: ChangeEvent<HTMLInputElement>) => {
        setInputValue(title.currentTarget.value)
    }
    const onChangeHendlerKey = (title: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (title.key==='Enter'){
            onChangeTask(inputValue)
            setActive(!activ)
        }
    }
  return (
        activ
        ?
        <input 
            value= {inputValue} 
            autoFocus onBlur={activateEdit} 
            onKeyDown={event=>onChangeHendlerKey(event)}
            onChange={event=>onChangeHendler(event)}/>
        :
        <span onDoubleClick={activateEdit}>{title}</span>
  )
}
