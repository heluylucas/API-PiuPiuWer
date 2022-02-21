import AppError from '@shared/errors/AppError'
import IPiusRepository from '../Repositories/IPiusRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  piu_id: string;
}

interface Response {
  operation: string;
}

@injectable()
class PiuFavoriteService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ piu_id, user_id }: Request): Promise<Response> {

    const piu = await this.piusRepository.findById(piu_id);
    const user = await this.usersRepository.findById(user_id);

    if (!piu) throw new AppError('Piu not found', 404);
    if (!user) throw new AppError('User not found', 404);

    const piuAlreadyFavorite = user.favorites.findIndex((PIU) => PIU.id === piu.id);

    if (piuAlreadyFavorite !== -1) throw new AppError('Piu already favorited');

    user.favorites.push(piu);

    await this.usersRepository.save(user);

    return { operation: 'favorited' };
  }
}

export default PiuFavoriteService;