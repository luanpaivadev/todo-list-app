import { User } from "./components/Authentication/LoginForm";
import { Task } from "./components/views/HomeView";
import { http } from "./utils/Axios";

export async function findAll(): Promise<Task[]> {
    const response = await http
        .get<Task[]>('/v1/tasks');
    return response.data;
}

export async function saveTask(task: Task): Promise<Task> {
    const response = await http.post<Task>('/v1/tasks', {
        description: task.description,
        completed: task.completed,
        alarm: task.alarm
    });
    return response.data;
}

export async function updateTask(task: Task): Promise<Task> {
    const response = await http.put<Task>('/v1/tasks/' + task.id, {
        description: task.description,
        completed: task.completed,
        alarm: task.alarm
    });
    return response.data;
}

export function deleteSingleTask(task: Task) {
    return http.delete('/v1/tasks/' + task.id)
}

export async function loginApp(user: User) {

    return http({
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/v1/login',
        params: user
    });
    
}