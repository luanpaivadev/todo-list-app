import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from "react";
import { Task } from "../views/HomeView";

interface InputComponentProps {
    task: Task
    setTask: (task: Task) => void
    save: (task: Task) => void
    checked: boolean
    setChecked: (checked: boolean) => void
    alarm: Dayjs | null
    setAlarm: Dispatch<SetStateAction<Dayjs | null>>
}

const InputComponent: React.FC<InputComponentProps> = (props) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setChecked(event.target.checked);
    };

    return (
        <div className='row mb-3'>
            <div className='col align-self-center'>
                <Box>
                    <Stack spacing={2}>

                        <TextField sx={{
                            width: '100%'
                        }}
                            id="outlined-basic"
                            label="Descrição da tarefa"
                            variant="outlined"
                            value={props.task.description}
                            onChange={event => props.setTask({ description: event.target.value, completed: false })} />

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={props.checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />}
                                label="Ativar alarme?"
                            />
                        </FormGroup>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                                label="Alarme"
                                disabled={props.checked ? false : true}
                                value={props.alarm}
                                ampm={false}
                                onChange={(newValue) => {
                                    props.setAlarm(newValue)
                                    props.checked && props.setTask({ ...props.task, alarm: newValue?.hour() + ':' + newValue?.minute() })
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <Button
                            disabled={props.task.description === '' ? true : false}
                            variant="contained"
                            size="large"
                            onClick={() => props.save(props.task)}
                            sx={{
                                height: 50
                            }}>
                            Salvar tarefa
                        </Button>

                    </Stack>
                </Box>
            </div>

        </div>
    );
}

export default InputComponent;