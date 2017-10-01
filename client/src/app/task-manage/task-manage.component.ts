import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Task} from "../model/task";
import {Router} from "@angular/router";
import {Access} from "../constants/access";
import {UserService} from "../service/user.service";
import {TaskService} from "../service/task.service";
import {TaskStatus} from "../model/taskStatus";


@Component({
  selector: 'task-manage-component',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.css']
})
export class TaskManageComponent extends Access implements OnInit {
  loading: boolean = false;
  error: string = '';
  tasksArr: Task[] = [];
  taskStatusesArr: TaskStatus[] = this.taskService.getTaskStatusesArr();
  usersArr: User[] = [];
  selectedTask: Task;


  constructor(private router: Router, private userService: UserService, private taskService: TaskService) {
    super();
  }

  ngOnInit(): void {
    this.updateUsersArr();
    this.updateTasksArr();
  }

  onDelete(taskId) {
    this.loading = true;
    this.error = '';
    this.taskService.delete(taskId)
      .subscribe(
        result => {
          this.updateTasksArr();
          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );

  }

  onUserChange(taskId, userId){
    this.loading = true;
    this.error = '';
    this.taskService.changeUser(taskId,userId)
      .subscribe(
        result => {
          this.updateTasksArr();
          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }

  onStatusChange(taskId, statusId){
    this.loading = true;
    this.error = '';
    this.taskService.changeStatus(taskId, statusId)
      .subscribe(
        result => {
          this.updateTasksArr();
          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }




  updateTasksArr() {
    this.tasksArr = [];
    this.taskService.getAll()
      .subscribe((tasksFromService) => this.tasksArr = tasksFromService);
  }

  updateUsersArr() {
    this.userService.getAll()
      .subscribe((usersFromService) => this.usersArr = usersFromService);
  }



}
