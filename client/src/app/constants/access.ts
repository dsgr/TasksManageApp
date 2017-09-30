import {AuthorizationGuard} from "../guard/authorization.guard";

export class Access {

  public hasAuthority(): boolean {
    return AuthorizationGuard.hasAuthority("ROLE_USER",null)
        || AuthorizationGuard.hasAuthority("ROLE_MANAGER", null)
        || AuthorizationGuard.hasAuthority("ROLE_ADMIN", null);
  }

  public hasAdminAuthority(): boolean {
    return AuthorizationGuard.hasAuthority("ROLE_ADMIN", null);
  }

  public hasManagerAuthority(): boolean {
    return AuthorizationGuard.hasAuthority("ROLE_MANAGER", null);
  }

  public hasUserAuthority(): boolean {
    return AuthorizationGuard.hasAuthority("ROLE_USER", null);
  }
}
