import { Request, Response } from "express"
import { container  } from "tsyringe";
import CreateUserService from "@modules/users/services/CreateUserService";
import ListUserService from "@modules/users/services/ListUsersService";

export default class UserController {
  public async create (request: Request, response: Response): Promise<Response> {
    try{
      const { username, email, password, first_name, last_name, about, photo } = request.body
  
      const createUser = container.resolve(CreateUserService);
  
      const user = await createUser.execute({
        username,
        email,
        password,
        first_name,
        last_name,
        about,
        photo,
      })
  
      delete user.password;
  
      return response.json(user);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async list (request: Request, response: Response): Promise<Response> {
    const { username } = request.query;
    const parsedUsername = username as string | undefined;
    const listUsers = container.resolve(ListUserService);
    const users = await listUsers.execute(parsedUsername)
    users.forEach(user => {
      delete user.password;
    });
    return response.json(users);
  }
}