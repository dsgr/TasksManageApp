import {Component, OnInit} from "@angular/core";
import {Task} from "../model/task";
import {Access} from "../constants/access";
import {TaskService} from "../service/task.service";
import {TaskStatus} from "../model/taskStatus";
import {environment} from "../constants/environment";

@Component({
  selector: 'task-mylist-component',
  templateUrl: './task-mylist.component.html',
  styleUrls: ['./task-mylist.component.css']
})
export class TaskMylistComponent extends Access implements OnInit {
  loading: boolean = false;
  errorCommonMessage: String = environment.ERROR_COMMON_MESSAGR;
  error: string = '';
  tasksArr: Task[] = [];
  taskStatusesArr: TaskStatus[] = this.taskService.getTaskStatusesArr();
  selectedTask: Task;

  constructor(private taskService: TaskService) {
    super();
  }

  /**
   * Init method. Invokes when component creates
   */
  ngOnInit(): void {
    this.updateTasksArr();
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

  /**
   * Set selected task. Next it used by detail component.
   */
  onDetailClick(task: Task) {
    this.selectedTask = null;
    this.selectedTask = task;
  }

  /**
   * Load tasksk from service to component
   */
  updateTasksArr() {
    this.loading = true;
    this.tasksArr = [];
    this.taskService.getMylist()
      .subscribe((tasksFromService) => {
          this.tasksArr = tasksFromService;
          this.loading = false;
        }, error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }
}
