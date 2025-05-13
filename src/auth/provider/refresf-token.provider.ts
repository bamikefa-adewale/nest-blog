import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./../dtos/refresh-token.dto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { GenerateTokenProvider } from "./generate-token.provider";
import { UsersService } from "src/users/providers/users.service";
import jwtConfig from "../config/jwt.config";

@Injectable()
export class RefreshTokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  public async RefreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
        
    //verify the refresh token using jwtService
    const { sub } = await this.jwtService.verifyAsync (
        refreshTokenDto.refreshToken,
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
        },
      );
      //fetch the user from the database
      const user = await this.usersService.findOneById(sub);
      //generate new access token
      return await this.generateTokenProvider.generateToken(user);
    } catch (error) {
      throw new Error("Failed to refresh tokens");
    }
    }

}
