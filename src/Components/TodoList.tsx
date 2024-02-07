import React, { ChangeEvent, useState } from 'react';
import { Button } from './Button';
import { SelecktTasksType } from '../App';
import {InputAddForm} from './InputAddForm';

type PropsType = {
    todoid: string
    title: string
    tasks: TaskOnliType[]
    taskDelete: (id:string,todoid: string)=> void
    SelecktTasks: (title:SelecktTasksType, todoid: string)=> void
    addTask: (task: string,todoid: string) => void
    HendlerCheckbox: (id:string,todoid: string)=> void
    titleSeleckt: SelecktTasksType
    todoDelete:(todoid: string)=> void
}

export type TaskOnliType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList:React.FC<PropsType> = (props) => {
    const {title, tasks, taskDelete, SelecktTasks, addTask, HendlerCheckbox,titleSeleckt, todoid,todoDelete} = props
    // const [error, setError] = useState <string | null>(null)
    // const [inputValue, setInputValue] = useState ('')
    const DeleteHendlerBatten = (id: string) => {
        taskDelete(id, todoid)
    }
    const SelecktHendlerTasks = (title: SelecktTasksType) => {
        SelecktTasks(title,todoid)
    }
    // const onChangeHendler = (title: ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(title.currentTarget.value)
    // }
    // const addTaskHendler = () => {
    //     // trim - если строка пустая, хуй тебе таска
    //     if(inputValue.trim()){
    //         addTask(inputValue.trim(),todoid);
    //         setInputValue('')
    //     }else{
    //     // если всёже хуй то красный
    //         setError('надо что-то написать')
    //     }
    // }
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
   
    const onChangeHendlerCheckbox = (id: string) =>{
        HendlerCheckbox(id,todoid)
    }
    const todoDeleteHendler = () => {
        todoDelete(todoid)
    }
    const addTitleInput =(titleInput: string)=>{
        if(titleInput.trim()){
            addTask(titleInput.trim(),todoid);
            // setInputValue('')
        }
        // else{
        //     setError('надо что-то написать')
        // } 
    }
    return (
        <div>
            <h4>
                {title}
                <Button titleSeleckt={titleSeleckt} collback={todoDeleteHendler} name='Delete'/>
            </h4>
            <div>
                {/* <input 
                    value={inputValue} 
                    onChange={event=>onChangeHendler(event)}
                    onKeyDown={event=>onChangeHendlerKey(event)}
                    className={error ? 'error' : ''}
                /> */}
                {/* <Button titleSeleckt={titleSeleckt} collback={addTaskHendler} name='+'/>
                { error && <div className='error-message'>{error}</div>} */}
                <div>
                <InputAddForm addTitleInput={addTitleInput}/>
                </div>
            </div>
            <ul>
            {tasks.map(el=>
                <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <input 
                    type="checkbox" 
                    checked={el.isDone} 
                    onChange={event=>onChangeHendlerCheckbox(el.id)}
                />
                <span>{el.title}</span>
                <Button titleSeleckt={titleSeleckt} collback={()=>DeleteHendlerBatten(el.id)} name='X'/>
                </li>
                )}
            </ul>
            <div>
                <Button titleSeleckt={titleSeleckt} collback={()=>{SelecktHendlerTasks('All')}} name='All'/>
                <Button titleSeleckt={titleSeleckt} collback={()=>{SelecktHendlerTasks('Active')}} name='Active'/>
                <Button titleSeleckt={titleSeleckt} collback={()=>{SelecktHendlerTasks('Completed')}} name='Completed'/>
            </div>
        </div>
    );
};
