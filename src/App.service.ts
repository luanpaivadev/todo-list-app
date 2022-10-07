import { Task } from "./App";
import { http } from "./utils/Axios";

export async function findAll(): Promise<Task[]> {
    const response = await http
        .get<Task[]>('/v1/tasks');
    return response.data;
}

export async function saveTask(task: Task): Promise<Task> {
    const response = await http.post<Task>('/v1/tasks', {
        description: task.description,
        completed: task.completed
    });
    return response.data;
}

export function deleteSingleTask(task: Task) {
    return http.delete('/v1/tasks/' + task.id)
}