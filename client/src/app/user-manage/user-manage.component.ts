import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {Access} from "../constants/access";
import {UserService} from "../service/user.service";


@Component({
  selector: 'user-manage-component',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent extends Access implements OnInit {
  loading: boolean = false;
  error: string = '';
  usersArr: User[] = [];

  constructor(private router: Router, private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.updateUsersArr();
  }

  onSetManager(userId) {
    this.loading = true;
    this.error = '';
    this.userService.setManager(userId)
      .subscribe(
        result => {

          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }

  onSetAdmin(userId) {
    this.loading = true;
    this.error = '';
    this.userService.setAdmin(userId)
      .subscribe(
        result => {
          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }

  onDelete(userId) {
    this.loading = true;
    this.error = '';
    this.userService.delete(userId)
      .subscribe(
        result => {
          this.updateUsersArr();
          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );

  }

  updateUsersArr() {
    this.usersArr = [];
    this.userService.getAll()
      .subscribe((usersFromService) => this.usersArr = usersFromService);

  }

}
