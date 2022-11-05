import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteSingleTask, findAll, saveTask, updateTask, validateTokenApi } from "../../App.service"
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

    async function validateToken() {

        try {

            const token: string | null = sessionStorage.getItem("access_token");

            if (token != null) {

                const response = await validateTokenApi(token);
                const active = response.data

                if (active) {
                    navigate('/home')
                    return
                }
                navigate('/login');
            }
            navigate('/login');
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro de comunicação com o banco de dados.'
            })
            navigate('/login');
        }

    }

    async function findAllTasks() {

        setOpen(!open);
        validateToken()

        try {
            const _tasks = await findAll()
            setTasks(_tasks)

            const taskList = _tasks.filter(task => task.alarm != null && task.alarm.length > 0)
            taskList.forEach(alarmIn)
            setOpen(false);
        } catch (error: any) {
            error.response.status != 401 &&
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de comunicação com o banco de dados.'
                })
            setOpen(false);
        }
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

        validateToken()

        if (task?.description && task.description.trim().length > 0) {

            try {
                setOpen(!open);
                await saveTask(task)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tarefa adicionada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })

                findAllTasks()
                setTask(useStateInit)
                setChecked(false)
                setAlarm(null)
                setOpen(false);

            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: error.message
                })
                setOpen(false);
            }
        }
    }

    async function handleTaskDone(task: Task) {

        validateToken()

        try {

            setOpen(!open);

            if (!task.completed) {
                task.completed = true
            } else {
                task.completed = false
            }

            await updateTask(task)
            setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
            setOpen(false);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            })
            setOpen(false);
        }

    }

    async function handleTaskUpdate(task: Task) {

        validateToken()

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

            try {
                setOpen(!open);
                await updateTask(task)
                setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
                setOpen(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tarefa atualizada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: error.message
                })
                setOpen(false);
            }

        }
    }

    const handleTaskDelete = (task: Task) => {

        validateToken()
        
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

        try {
            setOpen(!open);
            await deleteSingleTask(task)
            setOpen(false);
            Swal.fire(
                'Deletado!',
                'Tarefa deletada com sucesso!',
                'success'
            )
            findAllTasks()
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            })
            setOpen(false);
        }
    }

    return (

        <Container maxWidth="md">

            <Box sx={{
                backgroundColor: '#2A2A2B',
                padding: 3,
                mt: 2
            }}>

                <Title
                    text='LISTA DE TAREFAS'
                    marginTop="4"
                    marginBotton="4"
                />

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

    )
}

export default HomeView