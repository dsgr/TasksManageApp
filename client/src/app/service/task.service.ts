import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {User} from '../model/user';
import {LoginService} from "../auth/login.service";
import {Task} from "../model/task";
import {TaskStatus} from "../model/taskStatus";
import {environment} from "../constants/environment";


@Injectable()
export class TaskService {

  private taskAddUrl: string = 'api/task/add';

  constructor(private http: Http) {
  }


  add(task: Task) {
    const body = task;
    return this.http.post(this.taskAddUrl, body).map(() => {
      return true;
    });
  }

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
        } else {
          return response.json();
        }
      })
  }


  delete(taskId) {
    let url = "api/task/delete/" + taskId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => response.status === 200);
  }


  changeUser(taskId, userId){
    let url = "api/task/changeuser/" + taskId +'/'+ userId ;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => response.status === 200);
  }

  changeStatus(taskId, statusId){
    let url = "api/task/changestatus/" + taskId +'/'+ statusId ;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => response.status === 200);
  }

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
