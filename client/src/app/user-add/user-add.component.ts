import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {Access} from "../constants/access";
import {UserService} from "../service/user.service";


@Component({
  selector: 'user-add-component',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent extends Access implements OnInit {
  userAddForm: FormGroup;
  loading: boolean = false;
  error: string = '';


  constructor(private router: Router, private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.userAddForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.loading = true;
    let newUser = new User(this.userAddForm.value.username, this.userAddForm.value.password);
    newUser.username = this.userAddForm.value.username;
    newUser.password = this.userAddForm.value.password;
    newUser.firstName = this.userAddForm.value.firstName;
    newUser.lastName = this.userAddForm.value.lastName;
    newUser.phoneNumber = this.userAddForm.value.phoneNumber;
    newUser.mail = this.userAddForm.value.mail;

    this.userService.add(newUser)
      .subscribe(
        result => {
          result && this.router.navigate(['/']);
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }


}
