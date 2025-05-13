import { AccessTokenGuard } from "src/auth/guard/access-token/access-token.guard";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthTypes } from "src/auth/enums/auth-types.enums";
import { AUTH_TYPE_KEY } from "src/auth/constants/auth.constsnts";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthTypes = AuthTypes.Bearer;

  private readonly authTyoeGuardMap: Record<
    AuthTypes,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard, // Injecting the AccessTokenGuard
  ) {
    this.authTyoeGuardMap = {
      [AuthTypes.Bearer]: this.accessTokenGuard,
      [AuthTypes.None]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // authtype from reflector
    const AuthTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthTypes];

    //array of guards
    const guards = AuthTypes.map((type) => this.authTyoeGuardMap[type]).flat();

    //default error message
    const error = new UnauthorizedException();

    // loop guards canActivate
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error: err;
      });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
