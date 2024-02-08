import React, { ChangeEvent, useState } from 'react';
import { Button } from './Button';
import { SelecktTasksType } from '../App';
import { InputAddForm } from './InputAddForm';
import { EditableSpan } from './EditableSpan';

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
    onChangeTask:(todoid: string, id:string,newTitle: string)=> void
}

export type TaskOnliType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList:React.FC<PropsType> = (props) => {
    const {title, tasks, taskDelete, SelecktTasks, addTask, HendlerCheckbox,titleSeleckt, todoid,todoDelete, onChangeTask} = props
    
    const DeleteHendlerBatten = (id: string) => taskDelete(id, todoid)
    const SelecktHendlerTasks = (title: SelecktTasksType) => SelecktTasks(title,todoid)
    const onChangeHendlerCheckbox = (id: string) => HendlerCheckbox(id,todoid)
    const todoDeleteHendler = () => todoDelete(todoid)
    const addTitleInput =(titleInput: string)=> addTask(titleInput.trim(),todoid);
    

    return (
        <div>
            <h4>
                {title}
                <Button titleSeleckt={titleSeleckt} collback={todoDeleteHendler} name='Delete'/>
            </h4>
            <div>
                <InputAddForm addTitleInput={addTitleInput}/>
            </div>
            <ul>
            {tasks.map(el=>{
                    const updateTaskHandler = (newTitle: string) => {
                        onChangeTask(todoid, el.id, newTitle)
                    }
                    
                    return <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <input 
                    type="checkbox" 
                    checked={el.isDone} 
                    onChange={event=>onChangeHendlerCheckbox(el.id)}
                />
                
                <EditableSpan onChangeTask={updateTaskHandler} title = {el.title}/>
                {/* <span>{el.title}</span> */}
                <Button titleSeleckt={titleSeleckt} collback={()=>DeleteHendlerBatten(el.id)} name='X'/>
                </li>}
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
