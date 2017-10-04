import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "./auth/login.service";
import {User} from "./model/user";
import {Access} from "./constants/access";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent extends Access {
    welcomeName: string;

    constructor(private router: Router, private loginService: LoginService) {
        super();
    }

    public isLoggedIn(): boolean {
        const user: User = LoginService.getCurrentUser();
        if (user) {
            this.welcomeName = user.firstName;
            return true;
        }
        return false;
    }

    logout(): void {
        this.welcomeName = null;
        this.loginService.logout();
        this.router.navigate(["/"]);
    }
}
