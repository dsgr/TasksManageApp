import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {User} from '../model/user';
import {LoginService} from "../auth/login.service";
import {Comment} from "../model/comment";
import {TaskStatus} from "../model/taskStatus";
import {environment} from "../constants/environment";


@Injectable()
export class CommentService {

  constructor(private http: Http) {
  }

  add(comment: Comment) {
    const currentUser = localStorage.getItem(environment.USER_KEY)
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.post('api/comment/add/', comment, options)
      .map((response: Response) => {
        if (response.status != 201) {
          throw new Error('Error while adding new comment! code status: ' + response.status);
        } else {
          return response.json();
        }
      })
  }

  getAllByTaskId(taskId) {
    const currentUser = localStorage.getItem(environment.USER_KEY)
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get('api/comment/getallfortask/' + taskId, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while loading comments for tasks! code status: ' + response.status);
        } else {
          return response.json();
        }
      })
  }


}
