import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthorizationGuard} from "./guard/authorization.guard";
import {LoginComponent} from "./auth/login.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {UserManageComponent} from "./user-manage/user-manage.component";
import {TaskAddComponent} from "./task-add/task-add.component";
import {TaskManageComponent} from "./task-manage/task-manage.component";
import {TaskMylistComponent} from "./task-mylist/task-mylist.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'user-add',
    component: UserAddComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'user-manage',
    component: UserManageComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'task-add',
    component: TaskAddComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_MANAGER']}
  },
  {
    path: 'task-manage',
    component: TaskManageComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_MANAGER']}
  },
  {
    path: 'task-mylist',
    component: TaskMylistComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_USER','ROLE_MANAGER','ROLE_ADMIN']}
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
