import { injectable, inject } from 'tsyringe';

import IPiusRepository from '../Repositories/IPiusRepository';
import Piu from '../infra/typeorm/entities/Piu';


@injectable()
export default class ShowPiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(): Promise<Piu[]> {
    const pius = await this.piusRepository.findAll();
    return pius;
  }
}