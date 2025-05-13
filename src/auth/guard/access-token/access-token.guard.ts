import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import jwtConfig from "src/auth/config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { REQUEST_USER_KEY } from "src/auth/constants/auth.constsnts";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractRequestFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token missing or malformed");
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
      return true;
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      throw new UnauthorizedException("Invalid token");
    }
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    if (type !== "Bearer") return undefined;
    return token;
  }
}
