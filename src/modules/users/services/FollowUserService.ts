import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  user2_id: string;
}

interface Response {
  operation: string;
}

@injectable()
class FollowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, user2_id }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(user_id);
    const follower = await this.usersRepository.findById(user2_id);

    if (!user) throw new AppError('User not found', 404);
    if (!follower) throw new AppError('Follower not found', 404);

    const userAlreadyFollowed = follower.following.findIndex((USER) => USER.id === user.id);

    if (userAlreadyFollowed !== -1) throw new AppError('User already followed');

    follower.following.push(user);

    await this.usersRepository.save(follower);

    return { operation: 'followed' };
  }
}

export default FollowUserService;