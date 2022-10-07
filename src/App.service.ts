import { Task } from "./App";
import { http } from "./utils/Axios";

export function findAll(): Promise<Task[]> {
    return http
        .get<Task[]>('/v1/tasks')
        .then(response => response.data)
}

export function saveTask(task: Task): Promise<Task | null> | null {

    return http.post<Task>('/v1/tasks', {
        description: task.description,
        completed: task.completed
    })
        .then(function (response) {
            if (response.status === 201) {
                return response.data
            }
            return null;
        })
        .catch(function (error) {
            return null;
        });
}

export function deleteSingleTask(task: Task) {
    return http.delete('/v1/tasks/' + task.id)
}