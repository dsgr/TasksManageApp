import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {Access} from "../constants/access";
import {UserService} from "../service/user.service";
import {TaskService} from "../service/task.service";
import {Task} from "../model/task";


@Component({
  selector: 'task-add-component',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent extends Access implements OnInit {
  taskAddForm: FormGroup;
  loading: boolean = false;
  error: string = '';
  usersArr: User[] = [];

  constructor(private router: Router, private userService: UserService, private taskService: TaskService) {
    super();
  }

  ngOnInit(): void {
    this.updateUsersArr();
    this.taskAddForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.loading = true;
    let newTask = new Task();
    newTask.name = this.taskAddForm.value.name;
    newTask.description = this.taskAddForm.value.description;
    newTask.userId = this.taskAddForm.value.userId;
    newTask.dateStart = this.taskAddForm.value.dateStart;


    this.taskService.add(newTask)
      .subscribe(
        result => {
          result && this.router.navigate(['/task-manage']);
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
