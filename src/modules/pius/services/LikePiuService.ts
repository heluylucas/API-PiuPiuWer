import PiuLike from '../infra/typeorm/entities/PiuLike';
import IPiuLikesRepository from "@modules/pius/Repositories/IPiusLikesRepository";
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  piu_id: string;
}

interface Response {
  operation: string;
}

@injectable()
class CreatePiuLikeService {
  constructor(
    @inject('PiusLikesRepository')
    private piuLikesRepository: IPiuLikesRepository
  ) {}

  public async execute({ piu_id, user_id }: Request): Promise<Response> {

    const liked = await this.piuLikesRepository.findByPiuAndUserId(user_id, piu_id);
    if(liked){
      await this.piuLikesRepository.delete(user_id, piu_id);

      return { operation: 'unlike' };
    }

    const createdLike = await this.piuLikesRepository.create({ user_id: user_id, piu_id: piu_id });

    await this.piuLikesRepository.save(createdLike);

    return { operation: 'like' };
  };
}

export default CreatePiuLikeService