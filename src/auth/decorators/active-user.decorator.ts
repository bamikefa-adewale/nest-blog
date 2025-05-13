import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ActiveUserData } from "../interfaces/active-user.interface";
import { REQUEST_USER_KEY } from "../constants/auth.constsnts";

export const ActivetUser = createParamDecorator(
  (data: keyof ActiveUserData | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    return data ? user?.[data] : user;
  },
);

// The ActivetUser decorator is a custom NestJS decorator that extracts the authenticated user from the request object in the context of an HTTP request. It uses the createParamDecorator function to create a new decorator that can be applied to route handler parameters. When used, it retrieves the user information from the request and makes it available to the route handler, allowing easy access to the authenticated user's data.
// This is particularly useful in scenarios where you need to access user details, such as user ID or roles, within your route handlers without having to manually extract it from the request object each time. By using this decorator, you can simplify your code and improve readability when working with authenticated routes in a NestJS application.
