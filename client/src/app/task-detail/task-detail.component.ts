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
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'task-detail-component',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent extends Access implements OnChanges {
  @Input() currentTask: Task;
  loading: boolean = false;
  error: string = '';
  usersArr: User[] = [];
  commentsArr: Comment[];
  taskDetailForm: FormGroup;
  newComment: string = "";

  constructor(private router: Router, private userService: UserService, private taskService: TaskService,
              private commentService: CommentService) {
    super();
    this.updateUsersArr();
  }

  /**
   * Method invokes when model changes
   */
  ngOnChanges(): void {
    this.updateCommentsArr();
    this.taskDetailForm = new FormGroup({
      name: new FormControl(this.currentTask.name, Validators.required),
      description: new FormControl(this.currentTask.description, Validators.required),
      userId: new FormControl(this.currentTask.userId),
      dateStart: new FormControl(this.currentTask.dateStart)
    });
  }

  /**
   * Save edited task
   */
  onSubmit() {
    this.loading = true;
    this.error = '';
    this.currentTask.name = this.taskDetailForm.value.name;
    this.currentTask.description = this.taskDetailForm.value.description;
    this.currentTask.userId = this.taskDetailForm.value.userId;
    this.currentTask.dateStart = this.taskDetailForm.value.dateStart;

    this.taskService.save(this.currentTask).subscribe(
        result => {
          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }

  /**
   * Adds new comment for task
   */
  addComment() {
    this.loading = true;
    this.error = '';
    const comment = new Comment();
    comment.message = this.newComment;
    comment.userId = LoginService.getCurrentUser().id;
    comment.taskId = this.currentTask.id;
    comment.date = new Date(Date.now());
    this.commentService.add(comment)
      .subscribe(
        result => {
          this.newComment = "";
          this.updateCommentsArr();
          this.loading = false;
        },
        error => {
          this.error = <any>error;
          this.loading = false;
        }
      );
  }

  /**
   * Change task`s user
   */
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

  /**
   * Changes task`s status
   */
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

  /**
   * Updates users array from server
   */
  updateUsersArr() {
    this.userService.getAll()
      .subscribe((usersFromService) => this.usersArr = usersFromService);
  }

  /**
   * Updates comments array for current task
   */
  updateCommentsArr() {
    this.commentService.getAllByTaskId(this.currentTask.id)
      .subscribe((commentsFromService) => {
      this.commentsArr = commentsFromService;
      for(let index=0;index < this.commentsArr.length; index++){
        for(let uIndex=0; uIndex < this.usersArr.length; uIndex++){
          if(this.commentsArr[index].userId == this.usersArr[uIndex].id){
            this.commentsArr[index].username = this.usersArr[uIndex].username;
          }
        }
      }
    });
  }

}
