import AppBar from "@mui/material/AppBar"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteSingleTask, findAll, saveTask, updateTask } from "../../App.service"
import InputComponent from "../InputComponent/InputComponent"
import { ListComponent } from "../ListComponent/ListComponent"
import Title from "../shared/Title"

export interface Task {
    id?: number
    description: string
    alarm?: string
    completed: boolean
}

const HomeView = () => {

    const [open, setOpen] = useState(false);
    const useStateInit: Task = { description: '', completed: false }
    const [task, setTask] = useState(useStateInit)
    const [tasks, setTasks] = useState<Task[]>([])
    const [checked, setChecked] = useState(false);
    const [alarm, setAlarm] = useState<Dayjs | null>(null);
    const sound = require('../../static/alarm.mp3')
    const navigate = useNavigate()

    useEffect(() => {
        findAllTasks()
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    async function findAllTasks() {

        setOpen(!open);

        try {
            const _tasks = await findAll()
            setTasks(_tasks)
            const taskList = _tasks.filter(task => task.alarm != null && task.alarm.length > 0)
            taskList.forEach(alarmIn)
        } catch (error: any) {
            validateError(error)
        }
        setOpen(false);
    }

    function alarmIn(task: Task) {

        const alarmIn = task.alarm

        const interval = setInterval(() => {
            const date = new Date()
            const currentTime = `${date.getHours()}:${date.getMinutes()}`
            if (currentTime == alarmIn) {

                const audio = new Audio(sound)
                audio.play()
                audio.loop = true

                Swal.fire({
                    title: task.description,
                    icon: 'info',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        audio.loop = false
                        audio.pause()
                    }
                })
                clearInterval(interval)
            }
        }, 1000)

    }

    async function handleTaskSave(task: Task) {

        if (task?.description && task.description.trim().length > 0) {

            setOpen(!open);

            try {
                const response = await saveTask(task)
                showMessageSuccess('Tarefa adicionada com sucesso!')
                setTasks([...tasks, {
                    id: response.id,
                    description: response.description,
                    completed: response.completed,
                    alarm: response.alarm
                }])
                setTask(useStateInit)
                setChecked(false)
                setAlarm(null)

            } catch (error: any) {
                validateError(error)
            }
            setOpen(false);
        }
    }

    async function handleTaskDone(task: Task) {

        setOpen(!open);

        try {

            if (!task.completed) {
                task.completed = true
            } else {
                task.completed = false
            }

            await updateTask(task)
            setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
        } catch (error: any) {
            validateError(error)
        }
        setOpen(false);

    }

    async function handleTaskUpdate(task: Task) {

        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Descrição da tarefa',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
                'aria-label': 'Type your message here',
                'required': 'true'
            },
            inputValue: task.description,
            showCancelButton: true
        })

        if (text) {

            task.description = text
            setOpen(!open);

            try {
                await updateTask(task)
                setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
                showMessageSuccess('Tarefa atualizada com sucesso!')
            } catch (error: any) {
                validateError(error)
            }
            setOpen(false);
        }
    }

    const handleTaskDelete = (task: Task) => {

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
                deleteTask(task)
            }
        })
    }

    async function deleteTask(task: Task) {

        setOpen(!open);

        try {
            await deleteSingleTask(task)
            showMessageSuccess('Tarefa deletada com sucesso!')
            setTasks(tasks.filter(tarefa => tarefa.id != task.id))
        } catch (error: any) {
            validateError(error)
        }
        setOpen(false);
    }

    function validateError(error: any) {
        if (error.response.status == 401) {
            navigate('/login')
        } else {
            Swal.fire({
                icon: 'error',
                title: error.message
            })
        }
    }

    function showMessageSuccess(title: string) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        })
    }

    function logout() {
        navigate('/login')
    }

    return (

        <Container>

            <Box sx={{ flexGrow: 1, mb: 11 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={logout}>
                                Logout
                            </Button>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container maxWidth="md">

                <Box sx={{
                    backgroundColor: '#2A2A2B',
                    padding: 2
                }}>

                    <Title
                        text='LISTA DE TAREFAS'
                        marginTop="4"
                        marginBotton="4"/>

                    <InputComponent
                        task={task}
                        setTask={setTask}
                        save={handleTaskSave}
                        checked={checked}
                        setChecked={setChecked}
                        alarm={alarm}
                        setAlarm={setAlarm} />

                    <ListComponent
                        taskList={tasks}
                        done={handleTaskDone}
                        update={handleTaskUpdate}
                        delete={handleTaskDelete} />

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                </Box>

            </Container>

        </Container>

    )
}

export default HomeView