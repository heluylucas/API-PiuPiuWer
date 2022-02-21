import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPiusRepository from '../Repositories/IPiusRepository';
import Piu from '../infra/typeorm/entities/Piu';

interface Request{
  piu_id: string
}

@injectable()
export default class DeletePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ piu_id }: Request): Promise<void> {
    const piu = await this.piusRepository.findById(piu_id)

    if (!piu){
      throw new AppError('Piu not found', 404)
    } else {
      await this.piusRepository.delete(piu_id);
    }
  }
}