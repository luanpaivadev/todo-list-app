import { Dayjs } from "dayjs"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { deleteSingleTask, findAll, saveTask, updateTask } from "../App.service"
import { ContainerComponent } from "../components/ContainerComponent/ContainerComponent"
import InputComponent from "../components/InputComponent/InputComponent"
import { ListComponent } from "../components/ListComponent/ListComponent"
import Title from "../components/shared/Title"

export interface Task {
    id?: number
    description: string
    alarm?: string
    completed: boolean
}

const HomeView = () => {

    const useStateInit: Task = { description: '', completed: false }
    const [task, setTask] = useState(useStateInit)
    const [tasks, setTasks] = useState<Task[]>([])
    const [checked, setChecked] = useState(false);
    const [alarm, setAlarm] = useState<Dayjs | null>(null);
    const sound = require('../static/alarm.mp3')

    useEffect(() => {
        findAllTasks()
    }, [])

    async function findAllTasks() {

        try {
            const _tasks = await findAll()
            setTasks(_tasks)

            const taskList = _tasks.filter(task => task.alarm != null && task.alarm.length > 0)
            taskList.forEach(alarmIn)
        } catch (error) {
            if (error instanceof Error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de comunicação com o banco de dados.'
                })
            }
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

        if (task?.description && task.description.trim().length > 0) {

            try {
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

            } catch (error) {
                if (error instanceof Error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message
                    })
                }
            }
        }
    }

    async function handleTaskDone(task: Task) {

        try {

            if (!task.completed) {
                task.completed = true
            } else {
                task.completed = false
            }

            await updateTask(task)
            setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
        } catch (error) {
            if (error instanceof Error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                })
            }
        }

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
            await updateTask(task)
            setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tarefa atualizada com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })
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

        try {
            await deleteSingleTask(task)
            Swal.fire(
                'Deletado!',
                'Tarefa deletada com sucesso!',
                'success'
            )
            findAllTasks()
        } catch (error) {
            if (error instanceof Error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                })
            }
        }
    }

    return (

        <React.Fragment>

            <div style={{
                width: '100%',
                height: 250,
                backgroundColor: '#2c2c2c'
            }} />

            <ContainerComponent>

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

            </ContainerComponent>
        </React.Fragment>

    )
}

export default HomeView