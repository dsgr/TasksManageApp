import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {User} from '../model/user';
import {LoginService} from "../auth/login.service";


@Injectable()
export class UserService {

  private usersAddUrl: string = 'api/user/add';

  constructor(private http: Http) {
  }

  getAll() {
    console.log("getall started");
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get('api/user/all', options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while loading all users! code status: ' + response.status);
        } else {
          return response.json();
        }
      })
  }


  add(user: User) {
    const body = user;
    return this.http.post(this.usersAddUrl, body).map(() => {
      return true;
    });
  }

  setManager(userId) {
    let url = "api/user/setmanager/" + userId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.put(url, "", options)
      .map((response: Response) => response.status === 200);
  }

  setAdmin(userId) {
    let url = "api/user/setadmin/" + userId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.put(url, "", options)
      .map((response: Response) => response.status === 200);
  }

  delete(userId) {
    let url = "api/user/delete/" + userId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => response.status === 200);
  }







}
