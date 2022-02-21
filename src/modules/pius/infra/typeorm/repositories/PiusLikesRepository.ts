import ICreatePiuLikeDTO from '@modules/pius/dtos/ICreatePiuLikeDTO';
import IPiusLikesRepository from '@modules/pius/Repositories/IPiusLikesRepository';
import { Repository, getRepository } from 'typeorm';
import PiuLike from '../entities/PiuLike';

export default class PiusLikesRepository implements IPiusLikesRepository {
  private ormRepository: Repository<PiuLike>;

  constructor() {
    this.ormRepository = getRepository(PiuLike);
  }
  public create(data: ICreatePiuLikeDTO): PiuLike {
    const piuLike = this.ormRepository.create(data);

    return piuLike;
  }

  public async save(data: PiuLike): Promise<PiuLike> {
    const piuLike = await this.ormRepository.save(data);

    return piuLike;
  }

  public async delete(user_id: string, piu_id: string): Promise<void> {
    await this.ormRepository.delete({ user_id, piu_id });
  }

  public async findByPiuAndUserId(user_id: string, piu_id: string): Promise<PiuLike | undefined> {
    const piuLike = await this.ormRepository.findOne({
      where: { user_id, piu_id },
    });

    return piuLike;
  }
}