import React, { ChangeEvent, useState } from 'react'
import { ButtonUniversal } from './Button';
import { TextField } from '@mui/material';
type InputType = {
    addTitleInput: (titleInput: string) => void
}
export const InputAddForm:React.FC<InputType> = (props) => {
    const {addTitleInput} = props
    const [error, setError] = useState < string | null >(null)
    const [inputValue, setInputValue] = useState ('')

        // повторяющийся код для обработчиков перед отправкой
    const inputValueHendlerForm = () => {
            // trim - если строка пустая, хуй тебе таска
            if(inputValue.trim()){
                addTitleInput(inputValue.trim());
                setInputValue('')
            }else{
            // если всёже хуй то красный
                setError('надо что-то написать')
            }
    }

        // обработчик нажетий, также отправка по Интер
    const onChangeHendlerKey = (title: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (title.key==='Enter'){
            inputValueHendlerForm()
        }
    }

       // котролируемый инпут
    const onChangeHendler = (title: ChangeEvent<HTMLInputElement>) => {
        setInputValue(title.currentTarget.value)
    }

        // обработчик отправки по кнопке, батон
    const addInputHendler = () => {
        inputValueHendlerForm()
    }
  return (
    <div>
        {/* <input 
            value={inputValue} 
            onChange={onChangeHendler}
            onKeyDown={onChangeHendlerKey}
            className={error ? 'error' : ''}
        /> */}
        <TextField 
            id="outlined-basic" 
            label="Title" 
            variant="outlined" 
            value={inputValue} 
            onChange={onChangeHendler}
            onKeyDown={onChangeHendlerKey}
            className={error ? 'error' : ''}
            size="small"
            // color={error ? 'error' : 'info'}
            error={!!error}
            helperText={error}
        />
            <ButtonUniversal titleSeleckt={'All'} collback={addInputHendler} name='Add'/>
            {/* { error && <div className='error-message'>{error}</div>} */}
    </div>
  )
}
