import {AuthorizationGuard} from "../guard/authorization.guard";
export class Access{

    public hasAuthority(): boolean {
        return AuthorizationGuard.hasAuthority("ROLE_USER") || AuthorizationGuard.hasAuthority("ROLE_MANAGER")
            || AuthorizationGuard.hasAuthority("ROLE_ADMIN");
    }

    public hasAdminAuthority(): boolean {
        return  AuthorizationGuard.hasAuthority("ROLE_ADMIN");
    }

    public hasManagerAuthority(): boolean {
        return AuthorizationGuard.hasAuthority("ROLE_MANAGER");
    }
}
