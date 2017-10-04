import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {User} from '../model/user';
import {LoginService} from "../auth/login.service";
import {Task} from "../model/task";
import {TaskStatus} from "../model/taskStatus";
import {environment} from "../constants/environment";

@Injectable()
export class TaskService {

  constructor(private http: Http) {
  }

  /**
   * Add new task
   */
  add(task: Task) {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.post('api/task/add', task, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while add task! code status: ' + response.status);
        }
        return response.json();
      });
  }

  /**
   * Save task
   */
  save(task: Task) {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.post('api/task/save', task, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while saving task! code status: ' + response.status);
        }
        return response.json();
      })
  }

  /**
   * Get all tasks
   */
  getAll() {
    console.log("getall tasks started");
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get('api/task/all', options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while loading all tasks! code status: ' + response.status);
        } else {
          return response.json();
        }
      })
  }

  /**
   * Get all task assigned to current user
   */
  getMylist() {
    console.log("getall tasks started");
    const currentUser = localStorage.getItem(environment.USER_KEY)
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.post('api/task/mylist', currentUser, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while loading all tasks! code status: ' + response.status);
        }
        return response.json();
      })
  }

  /**
   * Delete task by id
   */
  delete(taskId) {
    let url = "api/task/delete/" + taskId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while delete task! code status: ' + response.status);
        }
        return true;
      })
  }

  /**
   * Change user for task
   */
  changeUser(taskId, userId) {
    let url = "api/task/changeuser/" + taskId + '/' + userId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while change user for task! code status: ' + response.status);
        }
        return response.json();
      })
  }

  /**
   * Change status for task
   */
  changeStatus(taskId, statusId) {
    let url = "api/task/changestatus/" + taskId + '/' + statusId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while change status for task! code status: ' + response.status);
        }
        return response.json();
      })
  }

  /**
   * Return task statuses
   */
  getTaskStatusesArr() {
    let taskStastusesArr: TaskStatus[] = [
      {"id": 1, "name": "Зарегистрирована"},
      {"id": 2, "name": "Передана в работу"},
      {"id": 3, "name": "Выполнена"},
      {"id": 4, "name": "Отменена"},
    ];
    return taskStastusesArr;
  }
}
