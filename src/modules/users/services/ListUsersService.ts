import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';



@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute( username: string | undefined ): Promise<User[]> {
    const user = await this.usersRepository.findByUsername(username);

    if (user.length === 0){
      throw new AppError('User not found', 404);
    } else {
      return user;
    }
  }
}