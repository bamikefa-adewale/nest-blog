import { AuthTypes } from "./../enums/auth-types.enums";
import { SetMetadata } from "@nestjs/common";
import { AUTH_TYPE_KEY } from "../constants/auth.constsnts";

export const Auth = (...authTypes: AuthTypes[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
