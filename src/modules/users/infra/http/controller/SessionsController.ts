import { Request, Response } from "express"
import { container  } from "tsyringe";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

export default class SessionsController {
  static create(arg0: string, create: any) {
    throw new Error("Method not implemented.");
  }
  public async create (request: Request, response: Response): Promise<Response> {
    const{ email, password } = request.body;

    const autheticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await autheticateUser.execute({
      email,
      password
    })

    delete user.password;

    return response.json({ user, token });
  }
}
