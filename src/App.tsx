import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import './App.css'
import { deleteSingleTask, findAll, saveTask } from "./App.service"
import { ContainerComponent } from "./components/ContainerComponent/ContainerComponent"
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent"
import InputComponent from "./components/InputComponent/InputComponent"
import { ListComponent } from "./components/ListComponent/ListComponent"

export interface Task {
  id?: number
  description: string
  completed: boolean
}

function App() {

  const useStateInit: Task = { description: '', completed: false }
  const [task, setTask] = useState(useStateInit)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    findAllTasks()
  }, [])

  async function findAllTasks() {
    const _tasks = await findAll()
    setTasks(_tasks)
  }

  async function handleTaskSave() {

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

  function setDone(task: Task): void {
    if (!task.completed) {
      task.completed = true
    } else {
      task.completed = false
    }
    setTasks(tasks.map(tarefa => task.id === tarefa.id ? task : tarefa))
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
    <div className="App">
      <ContainerComponent>

        <HeaderComponent title='LISTA DE TAREFAS' />

        <InputComponent
          task={task}
          setTask={setTask}
          save={handleTaskSave} />

        <ListComponent
          taskList={tasks}
          done={setDone}
          update={handleTaskUpdate}
          delete={handleTaskDelete} />

      </ContainerComponent>
    </div>
  );
}

export default App;
