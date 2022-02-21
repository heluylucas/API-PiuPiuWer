import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPiusRepository from '../Repositories/IPiusRepository';

import Piu from '../infra/typeorm/entities/Piu';

interface IRequest {
  text: string;
  user_id: string;
}

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute({ text, user_id }: IRequest): Promise<Piu> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (text === '' || text.length > 140) {
      throw new AppError('Piu text is either null or too long!');
    }

    const piu = await this.piusRepository.create({ text, user_id });

    await this.piusRepository.save(piu);

    return piu;
  }
}