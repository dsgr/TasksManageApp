import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Task} from "../model/task";
import {Router} from "@angular/router";
import {Access} from "../constants/access";
import {UserService} from "../service/user.service";
import {TaskService} from "../service/task.service";
import {TaskStatus} from "../model/taskStatus";
import {environment} from "../constants/environment";


@Component({
  selector: 'task-manage-component',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.css']
})
export class TaskManageComponent extends Access implements OnInit {
  loading: boolean = false;
  error: string = '';
  errorCommonMessage: String = environment.ERROR_COMMON_MESSAGR;
  tasksArr: Task[] = [];
  taskStatusesArr: TaskStatus[] = this.taskService.getTaskStatusesArr();
  usersArr: User[] = [];
  selectedTask: Task;

  constructor(private router: Router, private userService: UserService, private taskService: TaskService) {
    super();
  }

  /**
   * Init method invokes when component creates
   */
  ngOnInit(): void {
    this.updateUsersArr();
    this.updateTasksArr();
  }

  /**
   * Delete task id
   */
  onDelete(taskId) {
    this.loading = true;
    this.error = '';
    this.selectedTask = null;
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

  /**
   * Change user for task
   */
  onUserChange(taskId, userId) {
    this.loading = true;
    this.error = '';
    this.taskService.changeUser(taskId, userId)
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

  /**
   * Change status for task
   */
  onStatusChange(taskId, statusId) {
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
    this.loading = true;
    this.tasksArr = [];
    this.taskService.getAll()
      .subscribe((tasksFromService) => {
        this.tasksArr = tasksFromService;
        this.loading = false;
      });
  }

  updateUsersArr() {
    this.loading = true;
    this.userService.getAll()
      .subscribe((usersFromService) => {
        this.usersArr = usersFromService;
        this.loading = false;
      });
  }


}
