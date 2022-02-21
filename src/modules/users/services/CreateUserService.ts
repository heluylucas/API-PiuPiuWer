import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

export interface Request {
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  about: string,
  photo: string,
}

class CreateUserService{
  public async execute({ username, email, password, first_name, last_name, about, photo }: Request): Promise<User>{
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    })

    if (checkUserExists) {
      throw new AppError('Email addres already used!');
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      about,
      photo,
    });

    await userRepository.save(user);

    return user
  }
}

export default CreateUserService