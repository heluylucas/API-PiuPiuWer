import ICreatePiuLikeDTO from '../dtos/ICreatePiuLikeDTO';
import PiuLike from '../infra/typeorm/entities/PiuLike';

interface IPiusLikesRepository {
  delete(user_id: string, piu_id: string): Promise<void>;
  findByPiuAndUserId(user_id: string, piu_id: string): Promise<PiuLike | undefined>;
  create(data: ICreatePiuLikeDTO): PiuLike;
  save(data: PiuLike): Promise<PiuLike>;
}

export default IPiusLikesRepository;