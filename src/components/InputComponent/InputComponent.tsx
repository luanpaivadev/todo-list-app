import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Task } from "../../App";

interface InputComponentProps {
    task: Task
    setTask: (task: Task) => void
    save: (task: Task) => void
}

const InputComponent: React.FC<InputComponentProps> = (props) => {

    return (
        <div className='row mb-3'>
                <div className='col align-self-center'>
                    <Box>
                        <div className="mb-3">
                            <TextField sx={{
                                width: '100%'
                            }}
                                id="outlined-basic"
                                label="Descrição da tarefa"
                                variant="outlined"
                                value={props.task.description}
                                onChange={event => props.setTask({ description: event.target.value, completed: false })}
                                onKeyDown={event => event.key === 'Enter' ? props.save(props.task) : ''} />
                            <div id="emailHelp" className="form-text">Precione ENTER para adicionar uma tarefa na lista.</div>
                        </div>
                    </Box>
                </div>
            </div>
    );
}

export default InputComponent;