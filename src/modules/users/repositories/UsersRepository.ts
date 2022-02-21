import { EntityRepository, Repository } from 'typeorm'

import User from "@modules/users/infra/typeorm/entities/User"

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByUsername(username: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { username },
    });

    return findUser || null;
  }
}

export default UsersRepository;