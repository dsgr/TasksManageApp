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
import {RegistrationComponent} from "./registration/registration.component";
import {UserManageComponent} from "./user-manage/user-manage.component";
import {TaskAddComponent} from "./task-add/task-add.component";
import {TaskService} from "./service/task.service";
import {TaskManageComponent} from "./task-manage/task-manage.component";

@NgModule({
    imports: [BrowserModule, FormsModule,
        HttpModule, AppRoutingModule, CommonModule,
        ReactiveFormsModule, RouterModule],
    declarations: [
      AppComponent, LoginComponent, HomeComponent,
      UserAddComponent, UserManageComponent, RegistrationComponent,
      TaskAddComponent, TaskManageComponent
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }, LoginService, AuthorizationGuard, UserService, TaskService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
