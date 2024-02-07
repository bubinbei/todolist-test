import React, { ChangeEvent, useState } from 'react'
import { Button } from './Button';
type InputType = {
    addTitleInput: (titleInput: string) => void
}
export const InputAddForm:React.FC<InputType> = (props) => {
    const {addTitleInput} = props
    const [error, setError] = useState <string | null>(null)
    const [inputValue, setInputValue] = useState ('')
    // const onChangeHendlerKey = (title: React.KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (title.key==='Enter'){
    //         if(inputValue.trim()){
    //             addTask(inputValue.trim(),todoid);
    //             setInputValue('')
    //         }else{
    //         // если всёже хуй то красный
    //             setError('надо что-то написать')
    //         }
    //     }
    // }
    const onChangeHendler = (title: ChangeEvent<HTMLInputElement>) => {
        setInputValue(title.currentTarget.value)
    }
    const addInputHendler = () => {
        addTitleInput(inputValue);
        setInputValue('')
    }
  return (
    <div>
        <input 
                    value={inputValue} 
                    onChange={event=>onChangeHendler(event)}
                    // onKeyDown={event=>onChangeHendlerKey(event)}
                    className={error ? 'error' : ''}
                />
                <Button titleSeleckt={'All'} collback={addInputHendler} name='+'/>
    </div>
  )
}
