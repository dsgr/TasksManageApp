import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {User} from '../model/user';
import {LoginService} from "../auth/login.service";

@Injectable()
export class UserService {

  private usersAddUrl: string = 'api/user/add';

  constructor(private http: Http) {
  }

  /**
   * Get all users
   */
  getAll() {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get('api/user/all', options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while loading all users! code status: ' + response.status);
        }
        return response.json();
      });
  }

  /**
   * Add new user
   */
  add(user: User) {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.post("api/user/add", user, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while add new user! code status: ' + response.status);
        }
        return response.json();
      });
  }

  /**
   * Add manager role to user
   */
  setManager(userId) {
    let url = "api/user/setmanager/" + userId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.put(url, "", options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while add manager role! code status: ' + response.status);
        }
        return response.json();
      })
  }

  /**
   * Add admin role to user
   */
  setAdmin(userId) {
    let url = "api/user/setadmin/" + userId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.put(url, "", options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while loading all users! code status: ' + response.status);
        }
        return response.json();
      })
  }

  /**
   * Delete user by id
   */
  delete(userId) {
    let url = "api/user/delete/" + userId;
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': LoginService.getCurrentUser().token
    });
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(url, options)
      .map((response: Response) => {
        if (response.status != 200) {
          throw new Error('Error while delete user! code status: ' + response.status);
        }
        return response.json();
      })
  }

}
