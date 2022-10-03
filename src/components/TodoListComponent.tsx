import { Box, List } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './TodoListComponent.css'

interface TodoListComponentProps {
    title: string
    data?: Task[]
}

interface Task {
    id: number
    description: string
    completed?: boolean
}

const TodoListComponent: React.FC<TodoListComponentProps> = (props) => {

    const taskInit: Task = { id: 0, description: '' }

    const completed = 'list-group-item list-group-item-action list-group-item-success'
    const noCompleted = 'list-group-item list-group-item-action'

    const [tasks, setTasks] = useState<Task[]>([])
    const [task, setTask] = useState(taskInit)
    const [count, setCount] = useState(1)

    function setDone(task: Task): void {
        if (!task.completed) {
            task.completed = true
        } else {
            task.completed = false
        }
        setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
    }

    function addTask(): void {
        if (task && task.description && task.description.trim().length > 0) {
            setTasks([...tasks, task])
            setCount(count + 1)
            setTask(taskInit)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tarefa adicionada com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    function deleteTask(task: Task) {
        Swal.fire({
            title: 'Deseja excluir a tarefa selecionada?',
            text: "Não será possível reverter isto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                setTasks(tasks.filter(t => t.id != task.id))
                Swal.fire(
                    'Deletado!',
                    'Tarefa deletada com sucesso!',
                    'success'
                )
            }
        })
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
                                onChange={event => setTask({ id: count, description: event.target.value })}
                                onKeyDown={event => event.key === 'Enter' ? addTask() : ''} />
                            <div id="emailHelp" className="form-text">Precione ENTER para adicionar uma tarefa na lista.</div>
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
                            <li key={task.id} className={task.completed ? completed : noCompleted}>
                                <div className='row align-items-center'>
                                    <div className='col-10' onClick={() => setDone(task)}>
                                        <span className='align-middle'> <strong>#{task.id}</strong> - {task.description}</span>
                                    </div>
                                    <div className='col-1 text-center'>
                                        {
                                            task.completed &&
                                            <span className="material-symbols-outlined align-middle">
                                                check
                                            </span>
                                        }
                                    </div>
                                    {
                                        task.completed &&
                                        <div className='col-1'>
                                            <button id='btn-delete' onClick={() => deleteTask(task)}>
                                                <span className="material-symbols-outlined align-middle">
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    }
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