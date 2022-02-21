import { Router, Request, Response } from "express";

import UsersRepository from "@modules/users/repositories/UsersRepository";
import User from "../../typeorm/entities/User";

import CreateUserService from "@modules/users/services/CreateUserService";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import { getCustomRepository } from "typeorm";
const usersRouter = Router();

usersRouter.post('/register', async (request, response) => {
  try{
    const { username, email, password, first_name, last_name, about, photo } = request.body

    const createUser = new CreateUserService();

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
});

usersRouter.get('/users',ensureAuthenticated, async (request, response) => {
  const { username } = request.query;
  let users: User[] = []
  const usersRepository = await getCustomRepository(UsersRepository)

  if (username){
    users = await usersRepository.find({ where: { username: username} });
  } else {
    users = await usersRepository.find();
  }

  return response.json(users);
});

export default usersRouter