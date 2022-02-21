import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import Piu from '../infra/typeorm/entities/Piu';

interface IPiusRepository {
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Piu | undefined>;
  findAll(): Promise<Piu[]>;
  create(data: ICreatePiuDTO): Promise<Piu>;
  save(data: Piu): Promise<Piu>;
}

export default IPiusRepository;