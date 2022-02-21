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
class PiuUnfavoriteService {
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

    const piuNotYetFavorite = user.favorites.findIndex((v) => v.id === piu.id);

    if (piuNotYetFavorite === -1) throw new AppError('Piu Not Yet favorited');

    user.favorites.push(piu);

    await this.usersRepository.save(user);

    return { operation: 'unfavorited' };
  }
}

export default PiuUnfavoriteService;