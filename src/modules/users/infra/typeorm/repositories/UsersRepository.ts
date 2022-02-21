import { getRepository, Repository } from 'typeorm'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from "@modules/users/infra/typeorm/entities/User"

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor (){
    this.ormRepository = getRepository(User)
  }

  public async findByUsername(username: string | undefined): Promise<User[]> {
    let query = '';

    if (username) query = `user.username = '${username}'`;

    const users = await this.ormRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.likes', 'likes')
      .leftJoinAndSelect('user.pius', 'pius')
      .leftJoinAndSelect('pius.likes', 'userPiusLikes')
      .leftJoinAndSelect('user.following', 'followed')
      .leftJoinAndSelect('user.followers', 'follower')
      .leftJoinAndSelect('user.favorites', 'favorites')
      .where(query)
      .getMany();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: ['likes', 'pius', 'favorites', 'followers', 'following'],
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['favorites', 'followers', 'following'],
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    
    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: User): Promise<User> {
    return(this.ormRepository.save(data));
  }
}

export default UsersRepository;