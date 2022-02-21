import { container, inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

export interface Request {
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  about: string,
  photo: string,
}

@injectable()
class CreateUserService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ username, email, password, first_name, last_name, about, photo }: Request): Promise<User>{

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email addres already used!');
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      about,
      photo,
    });

    return user
  }
}

export default CreateUserService