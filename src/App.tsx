import React, { useState } from 'react';
import './App.css';
import { TaskOnliType, TodoList } from './Components/TodoList';
import { v1 } from 'uuid';
import { InputAddForm } from './Components/InputAddForm';
import { addSyntheticTrailingComment } from 'typescript';

export type SelecktTasksType =  'All' | 'Active' | 'Completed'
type TodoListType = {
    id: string
    title: string
    filter: SelecktTasksType
}
type TasksStateType = {
    [key:string] : TaskOnliType[]
}

function App() {
    let todoListId1 = v1()
    let todoListId2 = v1()
    const tasks1 = [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: v1(), title: "123", isDone: false },
        { id: v1(), title: "JSX", isDone: true },
        { id: v1(), title: "Redux", isDone: false }
    ]
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]:tasks1,
        [todoListId2]:tasks2,
    })
    const [todolistS, setTodolistS] = useState<TodoListType[]>(
        [
            {id: todoListId1, title: 'первый', filter: 'All'},
            {id: todoListId2, title: 'второй', filter: 'All'},
        ]
    )
    const SelecktTasks = (title: SelecktTasksType,id: string) => {
        let toto = todolistS.find(el => el.id === id)
        if(toto) toto.filter = title
        setTodolistS([...todolistS])
    }
    const todoDelete = (todoid: string) => {
        const todoFilter = todolistS.filter(el=>el.id!==todoid)
        if(todoFilter){
            delete tasks[todoid]
            setTodolistS([...todoFilter])
        }
        console.log(tasks,todolistS);
    }
    const taskDelete = (id: string,todoid: string) => {
        const tasksFilter = tasks[todoid].filter(el=>el.id!==id)
        tasks[todoid] = tasksFilter
        setTasks({...tasks})
    }

    const HendlerCheckbox = (id: string,todoid: string) => {
        const tasksFilter = tasks[todoid].find(el=>el.id===id)
        if(tasksFilter){tasksFilter.isDone = !tasksFilter.isDone}
        // перерисовываю
        setTasks({...tasks})
    }
    
    const addTask = (task: string, todoid: string) => {
        const newTask = { id: v1(), title: task, isDone: false }
        tasks[todoid] = [...tasks[todoid], newTask ]
        setTasks({...tasks})
    }
    const addNewTodo = (titleInput: string) => {
       if (titleInput) {
        const newId = v1()
       let newTodo: TodoListType = {id: newId, title: titleInput, filter: 'All'}
        setTodolistS([...todolistS,newTodo])
        tasks[newId] = []
        setTasks({...tasks})
       }
    }
    const onChangeTask = (todoid: string, id:string,newTitle: string) => {
        console.log(todoid, id,newTitle);
        let ubdateTask = tasks[todoid].find(el=>el.id===id)
        if (ubdateTask) ubdateTask.title = newTitle
        // перерисовываю
        setTasks({...tasks})
    }

    return (
        <div className="App">
            <div>
                <InputAddForm addTitleInput={addNewTodo} />
            </div>
            {
                todolistS.map( todo =>{
                    
                    let tasksToTodo = tasks[todo.id]
                
                    if(todo.filter==='Active') {
                            tasksToTodo = tasks[todo.id].filter(el=>el.isDone)
                    }
                
                    if(todo.filter==='Completed') {
                            tasksToTodo = tasks[todo.id].filter(el=>!el.isDone)
                    }

                    return <TodoList 
                            key = {todo.id}
                            todoid = {todo.id}
                            title={todo.title} 
                            tasks={tasksToTodo} 
                            taskDelete={taskDelete}
                            SelecktTasks={SelecktTasks}
                            addTask={addTask}
                            HendlerCheckbox={HendlerCheckbox}
                            titleSeleckt={todo.filter}
                            todoDelete={todoDelete}
                            onChangeTask={onChangeTask}
                        />

                })
            }
            
        </div>
    );
}

export default App;
