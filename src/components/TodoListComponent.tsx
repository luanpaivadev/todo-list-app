import { Box, List } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import './TodoListComponent.css'

declare interface TodoListComponentProps {
    title: string
    data?: Task[]
}

interface Task {
    id: number
    description: string
    completed: boolean
}


const TodoListComponent: React.FC<TodoListComponentProps> = (props) => {

    const taskInit: Task = { id: 0, description: '', completed: false }

    const completed = 'list-group-item list-group-item-action list-group-item-success'
    const noCompleted = 'list-group-item list-group-item-action'

    const [tasks, setTasks] = useState<Task[]>([])
    const [task, setTask] = useState(taskInit)
    const [count, setCount] = useState(1)

    function setDone(task: Task) {
        if (!task.completed) {
            task.completed = true
        } else {
            task.completed = false
        }
        setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
    }

    function addTask() {
        if (task && task.description && task.description.trim().length > 0) {
            setTasks([...tasks, task])
            setCount(count + 1)
            setTask(taskInit)
        }
    }

    return (
        <div className='container shadow mb-5 bg-body rounded'>

            <div>
                <h2 className='text-center mb-4'><strong>{props.title}</strong></h2>
            </div>
            <div className='row mb-3'>
                <div className='col align-self-center'>
                    <Box>
                        <div className="mb-3">
                            <TextField sx={{
                                width: '100%'
                            }}
                                id="standard-basic"
                                label="Descrição da tarefa"
                                variant="standard"
                                value={task?.description}
                                onChange={event => setTask({ id: count, description: event.target.value, completed: false })}
                                onKeyDown={event => event.key === 'Enter' ? addTask() : ''} />
                            <div id="emailHelp" className="form-text">Precione ENTER para adicionar a tarefa na lista.</div>
                        </div>
                    </Box>
                </div>
            </div>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                }}>
                <ul className='list-group list-group-flush'>
                    {
                        tasks.map(task => (
                            <li key={task.id} className={task.completed ? completed : noCompleted}
                                onClick={() => setDone(task)}>
                                <div className='row align-items-center'>
                                    <div className='col-11'>
                                        <span className='align-middle'> <strong>#{task.id}</strong> - {task.description}</span>
                                    </div>
                                    <div className='col-1 text-center'>
                                        <span className="material-symbols-outlined align-middle">
                                            {task.completed ? 'check' : ''}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </List>
        </div>
    );
}

export default TodoListComponent;