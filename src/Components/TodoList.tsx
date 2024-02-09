import React, { ChangeEvent, useState } from 'react';
import { ButtonUniversal } from './Button';
import { SelecktTasksType } from '../App';
import { InputAddForm } from './InputAddForm';
import { EditableSpan } from './EditableSpan';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Button, Checkbox } from '@mui/material';

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
    const updateTaskHandler = (newTitle: string, id: string) => onChangeTask(todoid, id, newTitle)
    

    return (
        <div>
            <h4>
                {title}
                <ButtonUniversal titleSeleckt={titleSeleckt} collback={todoDeleteHendler} name='Delete'/>
            </h4>
            <div>
                <InputAddForm addTitleInput={addTitleInput}/>
            </div>
            <ul>
            {tasks.map(el=>
                <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                {/* <input 
                    type="checkbox" 
                    checked={el.isDone} 
                    onChange={event=>onChangeHendlerCheckbox(el.id)}
                /> */}
                <Checkbox 
                    color="secondary"  
                    checked={el.isDone} 
                    onChange={event=>onChangeHendlerCheckbox(el.id)}
                />
                <EditableSpan onChangeTask={(newTitle)=>updateTaskHandler(newTitle, el.id)} title = {el.title}/>
                <ButtonUniversal titleSeleckt={titleSeleckt} collback={()=>DeleteHendlerBatten(el.id)} name='Delete'/>
                {/* <Button onClick={()=>DeleteHendlerBatten(el.id)}>
                
                <DeleteOutlinedIcon />
                </Button> */}
                </li>
                )}
            </ul>
            <div>
                <ButtonUniversal titleSeleckt={titleSeleckt} collback={()=>{SelecktHendlerTasks('All')}} name='All'/>
                <ButtonUniversal titleSeleckt={titleSeleckt} collback={()=>{SelecktHendlerTasks('Active')}} name='Active'/>
                <ButtonUniversal titleSeleckt={titleSeleckt} collback={()=>{SelecktHendlerTasks('Completed')}} name='Completed'/>
            </div>
        </div>
    );
};
