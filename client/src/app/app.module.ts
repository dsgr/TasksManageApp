import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule}  from './app-routing.module';
import {AppComponent}   from './app.component';
import {LoginComponent} from "./auth/login.component";
import {LoginService} from "./auth/login.service";
import {CommonModule, LocationStrategy, HashLocationStrategy} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthorizationGuard} from "./guard/authorization.guard";
import {UserService} from "./service/user.service";
import {HomeComponent} from "./home/home.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {UserManageComponent} from "./user-manage/user-manage.component";
import {TaskAddComponent} from "./task-add/task-add.component";
import {TaskService} from "./service/task.service";
import {TaskManageComponent} from "./task-manage/task-manage.component";
import {TaskMylistComponent} from "./task-mylist/task-mylist.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {CommentService} from "./service/comment.service";

@NgModule({
    imports: [BrowserModule, FormsModule,
        HttpModule, AppRoutingModule, CommonModule,
        ReactiveFormsModule, RouterModule],
    declarations: [
      AppComponent, LoginComponent, HomeComponent,
      UserAddComponent, UserManageComponent,
      TaskAddComponent, TaskManageComponent,
      TaskMylistComponent, TaskDetailComponent
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }, LoginService, AuthorizationGuard, UserService, TaskService, CommentService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
