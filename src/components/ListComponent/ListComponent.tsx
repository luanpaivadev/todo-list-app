import List from "@mui/material/List";
import { Task } from "../../App";

declare interface ListComponentProps {
    taskList: Task[],
    done: (task: Task) => void,
    update: (task: Task) => void,
    delete: (task: Task) => void
}

const completed = 'list-group-item list-group-item-action list-group-item-success'
const noCompleted = 'list-group-item list-group-item-action'

export const ListComponent: React.FC<ListComponentProps> = (props) => {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 500,
                '& ul': { padding: 0 },
            }}>
            <ul className='list-group'>
                {
                    props.taskList.length > 0 ?
                        props.taskList.map(task => (
                            <li key={task.id} className={task.completed ? completed : noCompleted} id='task'>
                                <div className='row align-items-center p-2'>
                                    <div className='col-10' onClick={() => props.done(task)}>
                                        <span className='align-middle'> <strong>#{task.id}</strong> - {task.description}</span>
                                    </div>
                                    <div className='col-2 text-center'>
                                        {
                                            !task.completed ?
                                                <button id='btn-updateTask' onClick={() => props.update(task)}>
                                                    <span className="material-symbols-outlined align-middle">
                                                        edit
                                                    </span>
                                                </button>
                                                :
                                                <button id='btn-deleteTask' onClick={() => props.delete(task)}>
                                                    <span className="material-symbols-outlined align-middle">
                                                        delete
                                                    </span>
                                                </button>
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                        : <p className="form-text text-center">Lista sem tarefas.</p>
                }
            </ul>
        </List>
    );
}