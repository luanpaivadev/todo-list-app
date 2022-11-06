import { AxiosRequestConfig } from "axios";
import { User } from "./components/Authentication/LoginForm";
import { Task } from "./components/views/HomeView";
import { http } from "./utils/Axios";

export async function findAll(): Promise<Task[]> {

    const config: AxiosRequestConfig<any> = {
        headers: { 
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
    }

    const response = await http
        .get<Task[]>('/v1/tasks', config);
    return response.data;
}

export async function saveTask(task: Task): Promise<Task> {

    const config: AxiosRequestConfig<any> = {
        headers: { 
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
    }

    const response = await http.post<Task>('/v1/tasks', {
        description: task.description,
        completed: task.completed,
        alarm: task.alarm
    }, config);
    return response.data;
}

export async function updateTask(task: Task): Promise<Task> {

    const config: AxiosRequestConfig<any> = {
        headers: { 
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
    }

    const response = await http.put<Task>('/v1/tasks/' + task.id, {
        description: task.description,
        completed: task.completed,
        alarm: task.alarm
    }, config);
    return response.data;
}

export function deleteSingleTask(task: Task) {

    const config: AxiosRequestConfig<any> = {
        headers: { 
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
    }

    return http.delete('/v1/tasks/' + task.id, config)
}

export async function loginApp(user: User) {
    return http({
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/v1/login',
        params: user
    });

}

export async function validateTokenApi(token: string) {
    return http({
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/v1/keycloak/validate/token',
        params: {
            'token' : token
        }
    });
}