import { AccessTokenGuard } from "src/auth/guard/access-token/access-token.guard";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { User } from "src/users/entities/user.entity";
import { ActiveUserData } from "../interfaces/active-user.interface";

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signInToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        userId,
        ...payload,
      },
      {
        expiresIn,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
      },
    );
  }

  public async generateToken(user: User) {
    // Return both tokens as an array or object
    const [accessToken, refreshToken] = await Promise.all([
      // generate access token
      this.signInToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
        },
      ),

      // generate refresh token
      this.signInToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
