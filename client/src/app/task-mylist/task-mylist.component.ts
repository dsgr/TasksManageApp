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
  selector: 'task-mylist-component',
  templateUrl: './task-mylist.component.html',
  styleUrls: ['./task-mylist.component.css']
})
export class TaskMylistComponent extends Access implements OnInit {
  loading: boolean = false;
  error: string = '';
  tasksArr: Task[] = [];
  taskStatusesArr: TaskStatus[] = this.taskService.getTaskStatusesArr();
  selectedTask: Task;

  constructor(private router: Router, private userService: UserService, private taskService: TaskService) {
    super();
  }

  ngOnInit(): void {
    this.updateTasksArr();
  }

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

  onDetailClick(task: Task) {
    this.selectedTask = null;
    console.log(task);
    this.selectedTask = task;
  }

  updateTasksArr() {
    this.tasksArr = [];
    this.taskService.getMylist()
      .subscribe((tasksFromService) => this.tasksArr = tasksFromService);
  }
}
