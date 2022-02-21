import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import Piu from './Piu';

@Entity('pius_likes')
class PiuLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.pius)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Piu, (piu) => piu.likes)
  @JoinColumn({ name: 'piu_id' })
  piu: Piu;

  @Column()
  @Exclude()
  user_id: string;

  @Column()
  @Exclude()
  piu_id: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @CreateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default PiuLike;