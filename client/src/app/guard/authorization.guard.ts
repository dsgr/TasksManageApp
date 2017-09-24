import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {User} from "../model/user";
import {Authority} from "../model/authority";
import {LoginService} from "../auth/login.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    canActivate(route: ActivatedRouteSnapshot) {
        const roles = route.data["roles"] as Array<string>;
        const user: User = LoginService.getCurrentUser();
        if (roles.length > 0 && user) {
            if (AuthorizationGuard.checkAuthorities(roles, user.authorities))
                return true;
        }
        alert('У Вас нет необходимых прав для доступа в данный раздел');
        this.router.navigate(['/home']);
        return false;
    }

  /**
   * Checks a
   * @param {string[]} avialableAuthorityList
   * @param {Authority[]} currentAuthorityList
   * @returns {boolean}
   */
    private static checkAuthorities(avialableAuthorityList: string[], currentAuthorityList: Authority[]): boolean {
        for (let avialableAuthority = 0; avialableAuthority < avialableAuthorityList.length; avialableAuthority++) {
            for (let userAuthority = 0; userAuthority < currentAuthorityList.length; userAuthority++)
                if (avialableAuthorityList[avialableAuthority] == currentAuthorityList[userAuthority].authority) {
                    return true;
                }
        }
        return false;
    }

    public static hasAuthority(authority: string): boolean {
        const user: User = LoginService.getCurrentUser();
        if (user != null)
            for (let currentAuthority of user.authorities) {
                if (currentAuthority.authority === authority)
                    return true;
            }
        return false;
    }
}
