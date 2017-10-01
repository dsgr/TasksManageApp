import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Task} from "../model/task";
import {Router} from "@angular/router";
import {Access} from "../constants/access";
import {UserService} from "../service/user.service";
import {TaskService} from "../service/task.service";
import {TaskStatus} from "../model/taskStatus";
import {Comment} from "../model/comment";
import {CommentService} from "../service/comment.service";
import {LoginService} from "../auth/login.service";


@Component({
  selector: 'task-detail-component',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent extends Access implements OnChanges {
  @Input() currentTask: Task;
  loading: boolean = false;
  error: string = '';
  taskStatusesArr: TaskStatus[] = this.taskService.getTaskStatusesArr();
  usersArr: User[] = [];
  commentsArr: Comment[];
  taskDetailForm: FormGroup;
  newComment: string = "";

  constructor(private router: Router, private userService: UserService, private taskService: TaskService,
              private commentService: CommentService) {
    super();
    this.updateUsersArr();
  }

  ngOnChanges(): void {
    console.log("task-detail ngOnChanges")
    this.updateCommentsArr();
    this.taskDetailForm = new FormGroup({
      name: new FormControl(this.currentTask.name, Validators.required),
      description: new FormControl(this.currentTask.description, Validators.required),
      userId: new FormControl(''),
      dateStart: new FormControl(this.currentTask.dateStart)
    });
  }


  onSubmit() {
    this.loading = true;
    this.currentTask.name = this.taskDetailForm.value.name;
    this.currentTask.description = this.taskDetailForm.value.description;
    this.currentTask.userId = this.taskDetailForm.value.userId;
    this.currentTask.dateStart = this.taskDetailForm.value.dateStart;

    this.taskService.save(this.currentTask)
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

  addComment(){
    console.log(this.newComment);
    const comment = new Comment();
    comment.message = this.newComment;
    comment.userId = LoginService.getCurrentUser().id;
    comment.taskId = this.currentTask.id;
    comment.date = new Date(Date.now());
    this.commentService.add(comment)
      .subscribe(
        result => {
          this.newComment="";
          this.updateCommentsArr();
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }

  onUserChange(taskId, userId) {
    this.loading = true;
    this.error = '';
    this.taskService.changeUser(taskId, userId)
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

  onStatusChange(taskId, statusId) {
    this.loading = true;
    this.error = '';
    this.taskService.changeStatus(taskId, statusId)
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

  updateUsersArr() {
    this.userService.getAll()
      .subscribe((usersFromService) => this.usersArr = usersFromService);
  }

  updateCommentsArr() {
    this.commentService.getAllByTaskId(this.currentTask.id)
      .subscribe((commentsFromService) => this.commentsArr = commentsFromService);
  }


}
